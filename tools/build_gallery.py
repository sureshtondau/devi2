import json
import re
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "images"
MANIFEST = IMAGES / "gallery-manifest.js"
SITE = ROOT / "_site"
SUPPORTED_FORMATS = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"}
SITE_FILES = ("index.html", "styles.css", "script.js", "CNAME")
KNOWN_ARTWORK = {
    "festival-rangoli.svg": (
        "Original Navarathri festival illustration: colourful lotus rangoli and a festive lamp",
        "Made beautiful together",
        "2026 FESTIVAL ARTWORK",
    ),
    "garba-evening.svg": (
        "Original Navarathri festival illustration: neighbours dancing together at a colourful celebration",
        "In rhythm, together",
        "2026 FESTIVAL ARTWORK",
    ),
    "navarathri-lights.svg": (
        "Original Navarathri festival illustration: glowing diya beneath an evening sky",
        "A light for every prayer",
        "2026 FESTIVAL ARTWORK",
    ),
}


def humanize(filename):
    name = Path(filename).stem
    name = re.sub(r"[_-]+", " ", name)
    name = re.sub(r"\s+", " ", name).strip()
    return name[:1].upper() + name[1:]


def build_gallery():
    albums = {}
    for folder in sorted(IMAGES.iterdir()):
        if not folder.is_dir() or not re.fullmatch(r"\d{4}", folder.name):
            continue

        photos = []
        for image in sorted(folder.iterdir(), key=lambda path: path.name.casefold()):
            if not image.is_file() or image.suffix.casefold() not in SUPPORTED_FORMATS:
                continue

            title = humanize(image.name)
            alt = f"Navarathri community photo: {title}"
            label = f"{folder.name} COMMUNITY PHOTO"
            if image.name.casefold() in KNOWN_ARTWORK:
                alt, title, label = KNOWN_ARTWORK[image.name.casefold()]

            photos.append({
                "file": image.name,
                "alt": alt,
                "caption": title,
                "label": label,
            })

        albums[folder.name] = photos

    if not albums:
        raise SystemExit(f"No four-digit year folders found in {IMAGES}")

    MANIFEST.write_text(
        "window.NAVARATRI_GALLERY = "
        + json.dumps(albums, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )

    SITE.mkdir(exist_ok=True)
    for filename in SITE_FILES:
        source = ROOT / filename
        if source.is_file():
            shutil.copy2(source, SITE / filename)
    shutil.copytree(IMAGES, SITE / "images", dirs_exist_ok=True)
    print(f"Generated gallery for {len(albums)} year folder(s) in {MANIFEST.relative_to(ROOT)}.")
    print(f"Prepared static website in {SITE.relative_to(ROOT)}.")


if __name__ == "__main__":
    build_gallery()
