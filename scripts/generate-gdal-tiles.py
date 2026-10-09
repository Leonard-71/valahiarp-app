#!/usr/bin/env python3
"""
Script pentru generarea tile-urilor compatibile cu Leaflet folosind gdal2tiles
Alternativă la libvips pentru compatibilitate perfectă cu CRS.Simple
"""

import math
import os
import subprocess


def calculate_zoom_levels(width, height, tile_size=512):
    """Calculează nivelurile de zoom necesare bazat pe dimensiunile imaginii"""
    max_dimension = max(width, height)
    max_zoom = math.ceil(math.log2(max_dimension / tile_size))
    return max_zoom


def generate_tiles(input_image, output_dir, width, height):
    """Generează tile-uri folosind gdal2tiles"""

    # Calculează zoom levels
    max_zoom = calculate_zoom_levels(width, height)
    zoom_range = f"0-{max_zoom}"

    print(f"Generez tile-uri pentru imaginea {input_image}")
    print(f"Dimensiuni: {width}x{height}")
    print(f"Zoom levels: {zoom_range}")

    # Comandă gdal2tiles cu creation options pentru PNG
    cmd = [
        "gdal2tiles.py",
        "-p",
        "raster",  # Raster profile pentru imagini non-geografice
        "-z",
        f"0-{max_zoom}",  # Zoom levels
        "-w",
        "none",  # Fără web viewer
        "--tilesize=512",  # Mărimea tile-urilor
        input_image,
        output_dir,
    ]

    try:
        print(f"Executez: {' '.join(cmd)}")
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        print("Tile-urile au fost generate cu succes!")
        print(f"Output: {result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Eroare la generarea tile-urilor: {e}")
        print(f"Stderr: {e.stderr}")
        return False
    except FileNotFoundError:
        print("Eroare: gdal2tiles.py nu a fost găsit!")
        print("Instalează GDAL: pip install gdal sau apt install python3-gdal")
        return False


def main():
    # Configurație pentru imaginea RDR2
    input_image = "../public/map-tiles/rdr2-map.jpg"  # Ajustează calea
    output_dir = "../public/map-tiles"
    width = 21617
    height = 16785

    if not os.path.exists(input_image):
        print(f"Eroare: Imaginea {input_image} nu există!")
        print("Ajustează calea în script sau copiază imaginea în directorul curent")
        return False

    # Creează directorul de output
    os.makedirs(output_dir, exist_ok=True)

    # Generează tile-urile
    success = generate_tiles(input_image, output_dir, width, height)

    if success:
        print(f"\n✅ Tile-urile au fost generate în {output_dir}")

    return success


if __name__ == "__main__":
    main()
