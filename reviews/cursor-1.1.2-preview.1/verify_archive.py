"""Verify frozen Cursor candidate before mock execution; not Cursor host acceptance."""
from pathlib import Path
import hashlib, json, zipfile
root = Path(__file__).resolve().parent
archive = root / 'sendar-cursor-review-1.1.2-preview.1.zip'
assert hashlib.sha256(archive.read_bytes()).hexdigest() == 'f5991b69d789ab10a02683f9a494689c57c8911eb70547eba432d2c351348e6a', 'archive digest changed'
package = root / 'package'
with zipfile.ZipFile(archive) as z:
    names = z.namelist()
    assert len(names) == len(set(names)), 'duplicate archive entries'
    assert set(names) == {p.relative_to(package).as_posix() for p in package.rglob('*') if p.is_file()}, 'inventory changed'
    for name in names:
        assert z.read(name) == (package / name).read_bytes(), f'byte mismatch: {name}'
manifest = json.loads((package / '.cursor-plugin/plugin.json').read_text())
assert manifest['version'] == '1.1.2-preview.1'
for field in ['skills', 'mcpServers', 'logo']:
    value = manifest[field]
    assert not Path(value).is_absolute() and '..' not in Path(value).parts
    assert (package / value).exists(), field
assert json.loads((package / 'mcp.json').read_text())['mcpServers']['sendar']['url'] == 'https://sendar.app/api/mcp'
print(f'PASS: frozen archive and {len(names)} package files match; manifest paths valid. Not host acceptance.')
