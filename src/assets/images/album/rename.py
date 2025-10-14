import os

# Thư mục hiện tại (nơi file .py đang nằm)
folder = os.getcwd()

old_ext = ".JPG"
new_ext = ".jpg"

for filename in os.listdir(folder):
    if filename.endswith(old_ext):
        base = os.path.splitext(filename)[0]
        new_name = base + new_ext
        os.rename(filename, new_name)
        print(f"✅ {filename} → {new_name}")

print("🎉 Hoàn tất đổi đuôi file!")
