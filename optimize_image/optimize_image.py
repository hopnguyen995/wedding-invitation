import os
from PIL import Image

def optimize_folder_for_web(input_dir, output_dir, max_width=1200, quality=70):
    os.makedirs(output_dir, exist_ok=True)
    for file_name in os.listdir(input_dir):
        if file_name.lower().endswith((".jpg", ".jpeg", ".png")):
            input_path = os.path.join(input_dir, file_name)
            output_name = os.path.splitext(file_name)[0] + ".webp"
            output_path = os.path.join(output_dir, output_name)

            img = Image.open(input_path).convert("RGB")
            w, h = img.size
            if w > max_width:
                new_height = int(h * (max_width / w))
                img = img.resize((max_width, new_height), Image.LANCZOS)

            img.save(output_path, format="WEBP", quality=quality, optimize=True, method=6)
            print(f"✅ {file_name} → {output_name} ({w}x{h} → {img.size})")

optimize_folder_for_web("images", "optimized")
