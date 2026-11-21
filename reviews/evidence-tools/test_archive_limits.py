import io, json, unittest, zipfile
from pathlib import Path
from verify_report import verify
ARCHIVE = Path(__file__).resolve().parents[1] / 'sendar-replit-review-0.1.7.zip'
with zipfile.ZipFile(ARCHIVE) as z:
    REPORT = json.loads(z.read('review-result.json'))
class IntegrityTests(unittest.TestCase):
    def test_frozen_archive(self):
        result = verify(ARCHIVE, REPORT)
        self.assertEqual(result['integrity'], 'pass')
        self.assertFalse(result['host_execution_proven'])

    def test_unsafe_archive_entries_rejected_before_read(self):
        with zipfile.ZipFile(ARCHIVE) as original:
            contents = {n: original.read(n) for n in original.namelist()}
        for mode in ('oversized', 'symlink'):
            with self.subTest(mode=mode):
                buf = io.BytesIO()
                with zipfile.ZipFile(buf, 'w', compression=zipfile.ZIP_DEFLATED) as z:
                    for name, data in contents.items():
                        if name == 'package.json':
                            entry = zipfile.ZipInfo(name)
                            if mode == 'symlink':
                                entry.create_system = 3
                                entry.external_attr = 0o120777 << 16
                            z.writestr(entry, b'x' * 2_000_001 if mode == 'oversized' else data)
                        else:
                            z.writestr(name, data)
                buf.seek(0)
                result = verify(buf, REPORT)
                self.assertEqual(result['integrity'], 'fail')
                self.assertIn('unsafe or oversized archive entry', result['errors'])
                self.assertFalse(result['host_execution_proven'])

if __name__ == '__main__': unittest.main()
