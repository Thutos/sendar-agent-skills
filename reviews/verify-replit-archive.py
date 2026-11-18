"""Verify the frozen handoff ZIP against its pinned digest and reviewed tree; no extraction/execution."""
from hashlib import sha256
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parent
ARCHIVE = ROOT / "sendar-replit-review-0.1.7.zip"
EXPECTED = "c36d26903e58d308209b57565edefd916f7dfdabd277288ea60a1e5d6aa31275"

def verify(archive=ARCHIVE, packet=ROOT / "replit"):
    if sha256(archive.read_bytes()).hexdigest() != EXPECTED:
        raise ValueError("Archive SHA256 mismatch")
    with ZipFile(archive) as z:
        names = z.namelist()
        source = {p.relative_to(packet).as_posix(): p for p in packet.rglob("*") if p.is_file()}
        if len(names) != len(set(names)) or set(names) != set(source):
            raise ValueError("Archive/source inventory mismatch")
        for name in names:
            if z.read(name) != source[name].read_bytes():
                raise ValueError("Archive/source bytes mismatch: " + name)
    return len(names)

if __name__ == "__main__":
    print(f"PASS frozen 0.1.7 ZIP SHA256 and {verify()} exact packet files; no host acceptance claimed")
