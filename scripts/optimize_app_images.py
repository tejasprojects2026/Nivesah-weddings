from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
APP_FILE = ROOT / "src" / "App.tsx"
ASSETS_DIR = ROOT / "src" / "assets"
OUTPUT_DIR = ASSETS_DIR / "optimized"
MAX_EDGE = 1600
JPEG_QUALITY = 76


def iter_asset_imports() -> list[str]:
    source = APP_FILE.read_text(encoding="utf-8")
    matches = re.findall(r'import\s+\w+\s+from\s+"@/assets/([^"]+)"', source)
    cleaned = [path.removeprefix("optimized/") for path in matches]
    return sorted(set(cleaned))


def optimize_image(relative_path: str) -> None:
    source_path = ASSETS_DIR / relative_path
    output_path = OUTPUT_DIR / relative_path
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source_path) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)

        suffix = source_path.suffix.lower()
        save_kwargs: dict[str, object] = {"optimize": True}

        if suffix in {".jpg", ".jpeg"}:
            image = image.convert("RGB")
            save_kwargs.update(
                {"quality": JPEG_QUALITY, "progressive": True, "subsampling": "4:2:0"}
            )
        elif suffix == ".png":
            if image.mode not in {"RGB", "RGBA"}:
                image = image.convert("RGBA")

        image.save(output_path, **save_kwargs)
        print(f"optimized {relative_path} -> {output_path.relative_to(ROOT)}")


def main() -> None:
    for relative_path in iter_asset_imports():
        optimize_image(relative_path)


if __name__ == "__main__":
    main()
