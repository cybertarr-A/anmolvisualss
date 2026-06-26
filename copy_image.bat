@echo off
copy "C:\Users\USER\.gemini\antigravity-ide\brain\444e1eac-0621-47dd-b518-b3f1c06eaecd\media__1782428253575.png" "d:\Jash\ANMOL PORTFOLIO\assets\golden_reverie.png"
if errorlevel 1 (
    echo.
    echo ERROR: Failed to copy the image automatically.
    echo Please copy the file manually from:
    echo C:\Users\USER\.gemini\antigravity-ide\brain\444e1eac-0621-47dd-b518-b3f1c06eaecd\media__1782428253575.png
    echo to:
    echo d:\Jash\ANMOL PORTFOLIO\assets\golden_reverie.png
) else (
    echo SUCCESS: Copied image to assets\golden_reverie.png
)
pause
