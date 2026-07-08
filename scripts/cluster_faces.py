from __future__ import annotations

import argparse
import json
import shutil
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Iterable

import cv2
import imagehash
import numpy as np
from PIL import Image
from sklearn.cluster import DBSCAN


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}
DETECTOR_MODEL_PATH = Path(__file__).with_name("models") / "face_detection_yunet_2023mar.onnx"
RECOGNIZER_MODEL_PATH = Path(__file__).with_name("models") / "face_recognition_sface_2021dec.onnx"


@dataclass
class FaceEntry:
    source_image: str
    face_index: int
    bbox: tuple[int, int, int, int]
    detector_row: list[float]
    crop_path: str
    p_hash: str
    d_hash: str
    w_hash: str
    histogram: list[float]
    embedding: list[float]


class UnionFind:
    def __init__(self, size: int) -> None:
        self.parent = list(range(size))

    def find(self, value: int) -> int:
        while self.parent[value] != value:
            self.parent[value] = self.parent[self.parent[value]]
            value = self.parent[value]
        return value

    def union(self, left: int, right: int) -> None:
        left_root = self.find(left)
        right_root = self.find(right)
        if left_root != right_root:
            self.parent[right_root] = left_root


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Detect faces in a folder and group visually similar faces."
    )
    parser.add_argument("input_dir", type=Path, help="Folder containing images to scan")
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("face_groups"),
        help="Folder where grouped crops and manifests will be written",
    )
    parser.add_argument(
        "--min-group-size",
        type=int,
        default=2,
        help="Only keep groups with at least this many face crops",
    )
    parser.add_argument(
        "--min-face-size",
        type=int,
        default=72,
        help="Ignore detected faces smaller than this many pixels on either side",
    )
    parser.add_argument(
        "--dbscan-eps",
        type=float,
        default=0.38,
        help="DBSCAN epsilon for cosine distance between face embeddings",
    )
    parser.add_argument(
        "--dbscan-min-samples",
        type=int,
        default=2,
        help="Minimum samples required to form a face cluster",
    )
    return parser.parse_args()


def iter_images(root: Path) -> Iterable[Path]:
    for path in root.rglob("*"):
        if path.suffix.lower() in IMAGE_EXTENSIONS and path.is_file():
            yield path


def ensure_clean_dir(path: Path) -> None:
    if path.exists():
        shutil.rmtree(path)
    path.mkdir(parents=True, exist_ok=True)


def build_detector() -> cv2.FaceDetectorYN:
    if not DETECTOR_MODEL_PATH.exists():
        raise SystemExit(f"YuNet model not found: {DETECTOR_MODEL_PATH}")

    return cv2.FaceDetectorYN_create(
        str(DETECTOR_MODEL_PATH),
        "",
        (320, 320),
        0.88,
        0.3,
        5000,
    )


def build_recognizer() -> cv2.FaceRecognizerSF:
    if not RECOGNIZER_MODEL_PATH.exists():
        raise SystemExit(f"SFace model not found: {RECOGNIZER_MODEL_PATH}")
    return cv2.FaceRecognizerSF_create(str(RECOGNIZER_MODEL_PATH), "")


def detect_faces(
    image_path: Path, detector: cv2.FaceDetectorYN, min_face_size: int
) -> list[np.ndarray]:
    image = cv2.imread(str(image_path))
    if image is None:
        return []

    height, width = image.shape[:2]
    detector.setInputSize((width, height))
    _, faces = detector.detect(image)
    if faces is None:
        return []

    entries: list[np.ndarray] = []
    for face in faces:
        x, y, face_width, face_height = face[:4]
        bbox = (int(x), int(y), int(face_width), int(face_height))
        if bbox[2] < min_face_size or bbox[3] < min_face_size:
            continue
        entries.append(face)

    return sorted(entries, key=lambda face: float(face[2] * face[3]), reverse=True)


def crop_face(image_path: Path, bbox: tuple[int, int, int, int]) -> Image.Image:
    image = Image.open(image_path).convert("RGB")
    x, y, width, height = bbox
    pad_x = int(width * 0.2)
    pad_y = int(height * 0.2)
    left = max(0, x - pad_x)
    top = max(0, y - pad_y)
    right = min(image.width, x + width + pad_x)
    bottom = min(image.height, y + height + pad_y)
    return image.crop((left, top, right, bottom))


def normalized_histogram(face: Image.Image) -> list[float]:
    resized = face.resize((96, 96))
    array = np.array(resized)
    histogram = cv2.calcHist([array], [0, 1, 2], None, [6, 6, 6], [0, 256, 0, 256, 0, 256])
    cv2.normalize(histogram, histogram)
    return histogram.flatten().astype(float).tolist()


def histogram_similarity(left: list[float], right: list[float]) -> float:
    left_array = np.array(left, dtype=np.float32)
    right_array = np.array(right, dtype=np.float32)
    return float(cv2.compareHist(left_array, right_array, cv2.HISTCMP_CORREL))


def build_face_entries(
    image_paths: list[Path], output_dir: Path, min_face_size: int
) -> list[FaceEntry]:
    crops_dir = output_dir / "crops"
    crops_dir.mkdir(parents=True, exist_ok=True)

    detector = build_detector()
    recognizer = build_recognizer()
    entries: list[FaceEntry] = []

    for image_path in image_paths:
        faces = detect_faces(image_path, detector, min_face_size)
        image = cv2.imread(str(image_path))
        if image is None:
            continue

        for face_index, detector_row in enumerate(faces):
            bbox = tuple(int(value) for value in detector_row[:4])
            face = crop_face(image_path, bbox)
            crop_name = f"{image_path.stem}_face_{face_index:02d}.jpg"
            crop_path = crops_dir / crop_name
            face.save(crop_path, quality=95)
            aligned_face = recognizer.alignCrop(image, detector_row)
            embedding = recognizer.feature(aligned_face).flatten().astype(float).tolist()

            entries.append(
                FaceEntry(
                    source_image=str(image_path),
                    face_index=face_index,
                    bbox=bbox,
                    detector_row=[float(value) for value in detector_row.tolist()],
                    crop_path=str(crop_path),
                    p_hash=str(imagehash.phash(face)),
                    d_hash=str(imagehash.dhash(face)),
                    w_hash=str(imagehash.whash(face)),
                    histogram=normalized_histogram(face),
                    embedding=embedding,
                )
            )

    return entries


def cluster_faces(
    entries: list[FaceEntry],
    dbscan_eps: float,
    dbscan_min_samples: int,
) -> list[list[FaceEntry]]:
    if not entries:
        return []

    embeddings = np.array([entry.embedding for entry in entries], dtype=np.float32)
    norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    normalized = embeddings / norms

    clustering = DBSCAN(
        eps=dbscan_eps,
        min_samples=dbscan_min_samples,
        metric="cosine",
    ).fit(normalized)

    grouped: dict[int, list[FaceEntry]] = {}
    for index, label in enumerate(clustering.labels_):
        if label == -1:
            continue
        grouped.setdefault(int(label), []).append(entries[index])

    return sorted(grouped.values(), key=len, reverse=True)


def write_groups(groups: list[list[FaceEntry]], output_dir: Path, min_group_size: int) -> list[dict[str, object]]:
    groups_dir = output_dir / "groups"
    groups_dir.mkdir(parents=True, exist_ok=True)

    manifest: list[dict[str, object]] = []
    kept_index = 0

    for group in groups:
        if len(group) < min_group_size:
            continue

        kept_index += 1
        group_dir = groups_dir / f"group_{kept_index:03d}"
        group_dir.mkdir(parents=True, exist_ok=True)

        items: list[dict[str, object]] = []
        for item_index, entry in enumerate(group, start=1):
            destination = group_dir / f"{item_index:03d}_{Path(entry.crop_path).name}"
            shutil.copy2(entry.crop_path, destination)
            item = asdict(entry)
            item["group_crop_path"] = str(destination)
            items.append(item)

        (group_dir / "manifest.json").write_text(json.dumps(items, indent=2), encoding="utf-8")
        manifest.append({"group": group_dir.name, "size": len(items), "items": items})

    return manifest


def main() -> None:
    args = parse_args()
    if not args.input_dir.exists():
        raise SystemExit(f"Input directory does not exist: {args.input_dir}")

    ensure_clean_dir(args.output_dir)
    image_paths = sorted(iter_images(args.input_dir))
    if not image_paths:
        raise SystemExit(f"No supported images found in: {args.input_dir}")

    entries = build_face_entries(image_paths, args.output_dir, args.min_face_size)
    if not entries:
        raise SystemExit("No faces were detected. Try lowering --min-face-size or using closer portraits.")

    groups = cluster_faces(entries, args.dbscan_eps, args.dbscan_min_samples)
    manifest = write_groups(groups, args.output_dir, args.min_group_size)

    summary = {
        "input_dir": str(args.input_dir),
        "images_scanned": len(image_paths),
        "faces_detected": len(entries),
        "groups_written": len(manifest),
        "output_dir": str(args.output_dir),
    }
    (args.output_dir / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    (args.output_dir / "groups.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
