import shutil
import os

src = r"C:\Users\USER\.gemini\antigravity-ide\brain\444e1eac-0621-47dd-b518-b3f1c06eaecd\media__1782428253575.png"
dst = r"d:\Jash\ANMOL PORTFOLIO\assets\golden_reverie.png"

try:
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)
    print("SUCCESS: Copied image to assets/golden_reverie.png")
except Exception as e:
    print(f"ERROR: {e}")
