@echo off
cd /d "%~dp0"
echo Running from: %cd%
echo.

echo Pulling anything GitHub has that you don't...
git pull --no-edit origin main

echo.
echo Pushing your changes...
git push

echo.
echo Done. Check the messages above for errors.
pause
