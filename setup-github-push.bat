@echo off
cd /d "%~dp0"
echo Running from: %cd%
echo.

git config --global user.name >nul 2>&1
if errorlevel 1 (
  echo Setting default git identity...
  git config --global user.name "Churchill"
  git config --global user.email "churchillrosinas@gmail.com"
)

echo.
echo Step 1: git init
git init

echo.
echo Step 2: git add .
git add .

echo.
echo Step 3: git commit
git commit -m "Initial storefront"

echo.
echo Step 4: connect to GitHub repo
git remote add origin https://github.com/rushgrafikz/rushgrafikz-store.git
git branch -M main

echo.
echo Step 5: push (a browser window may open asking you to log into GitHub - approve it)
git push -u origin main

echo.
echo Done. Check the messages above for any errors.
pause
