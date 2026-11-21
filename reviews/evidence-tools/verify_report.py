"""Offline review report integrity verifier 0.1.7; NOT host attestation."""
import argparse, hashlib, json, stat, zipfile
from pathlib import Path
FILES = ('package.json', '.replit', 'recipes.mjs', 'verify.mjs', 'review.mjs', 'README.txt', 'REVIEW.md')
SKILL_FILES = ('.agents/skills/sendar-email-review/SKILL.md', '.agents/skills/sendar-email-review/scripts/recipes.mjs', '.agents/skills/sendar-email-review/scripts/verify.mjs')
INVENTORIES = {'0.1.3': FILES, '0.1.4': FILES + SKILL_FILES, '0.1.5': FILES + SKILL_FILES, '0.1.6': FILES + SKILL_FILES, '0.1.7': FILES + SKILL_FILES + ('preview.mjs', 'preview.test.mjs')}
def verify(archive, report):
    errors = []
    if not isinstance(report, dict):
        return dict(integrity='fail', errors=['report must be a JSON object'], host_execution_proven=False)
    with zipfile.ZipFile(archive) as z:
        # Exact root paths prevent nested skill scripts matching root shims.
        names = z.namelist()
        if len(names) != len(set(names)) or 'package.json' not in names:
            return dict(integrity='fail', errors=['duplicate entries or missing root package.json'], host_execution_proven=False)
        # Bound decompression before reading metadata or any source bytes.
        if any(i.file_size > 2_000_000 or i.flag_bits & 1 or stat.S_ISLNK(i.external_attr >> 16) for i in z.infolist()) or sum(i.file_size for i in z.infolist()) > 4_000_000:
            return dict(integrity='fail', errors=['unsafe or oversized archive entry'], host_execution_proven=False)
        package = json.loads(z.read('package.json'))
        if not isinstance(package, dict) or not isinstance(package.get('name'), str) or not isinstance(package.get('version'), str):
            return dict(integrity='fail', errors=['invalid package metadata'], host_execution_proven=False)
        files = INVENTORIES.get(package.get('version'))
        if files is None:
            return dict(integrity='fail', errors=['unsupported package version'], host_execution_proven=False)
        # Historical generated report is data, not part of the executable source inventory.
        if set(names) - set(files) - {'review-result.json'}:
            return dict(integrity='fail', errors=['unexpected archive entries'], host_execution_proven=False)
        sources = {}
        for name in files:
            if name not in names:
                errors.append(f'{name}: missing archive entry')
            else:
                sources[name] = z.read(name)
        if errors:
            return dict(integrity='fail', errors=errors, host_execution_proven=False)
        for key, value in [('package', package['name']), ('version', package['version']), ('result', 'pass')]:
            if report.get(key) != value:
                errors.append(f'{key}: mismatch')
        hashes = report.get('sha256', {})
        if not isinstance(hashes, dict):
            hashes = {}
        if set(hashes) != set(files):
            errors.append('source inventory mismatch')
        for name, data in sources.items():
            if hashes.get(name) != hashlib.sha256(data).hexdigest():
                errors.append(f'{name}: hash mismatch')
        output = report.get('test_output', '')
        if not isinstance(output, str) or not output.startswith('PASS:') or 'PASS: timeout,' not in output:
            errors.append('expected test output absent')
        if package['version'] in ('0.1.5', '0.1.6', '0.1.7') and (not isinstance(output, str) or 'PASS: all five CLI previews ignore inherited live flags, credentials and recipient/link overrides; forbidden fetch never invoked.' not in output):
            errors.append('mock-only CLI regression evidence absent')
        if package['version'] in ('0.1.6', '0.1.7') and (not isinstance(output, str) or 'PASS: seven non-boolean live flags rejected before transport;' not in output):
            errors.append('explicit boolean regression evidence absent')
    return dict(verifier_version='0.1.7', integrity='fail' if errors else 'pass', errors=errors,
                package_version=package['version'], archive_sha256=hashlib.sha256(Path(archive).read_bytes()).hexdigest(),
                host_execution_proven=False,
                scope='Integrity only. Independently inspect dated Replit console capture, project URL and run provenance. Matching reports can be local or forged; not host attestation, submission, approval or listing.')
if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('archive'); p.add_argument('report'); args = p.parse_args()
    try:
        result = verify(args.archive, json.loads(Path(args.report).read_text()))
    except (OSError, ValueError, KeyError, zipfile.BadZipFile) as exc:
        result = dict(integrity='fail', errors=[type(exc).__name__], host_execution_proven=False)
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result['integrity'] == 'pass' else 1)
