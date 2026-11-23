"""Favicon üretici: images/yda-logo.png -> images/favicon.png + images/favicon.ico

Çalışma dizininden bağımsızdır; yollar bu dosyanın konumuna göre (repo kökü) çözülür.
Kullanım: python tools/wss.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "images"

logo = Image.open(IMAGES / "yda-logo.png").convert("RGBA")
size = 512
bg = Image.new("RGBA", (size, size), (10, 10, 10, 255))
logo.thumbnail((int(size * 0.85), int(size * 0.85)))
bg.paste(logo, ((size - logo.width) // 2, (size - logo.height) // 2), logo)
bg.save(IMAGES / "favicon.png")
bg.resize((32, 32)).save(IMAGES / "favicon.ico")
