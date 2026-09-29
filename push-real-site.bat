@echo off
cd /d "%~dp0"
echo Running from: %cd%
echo.

echo Removing old scaffold files (now replaced by the self-contained index.html)...
if exist css rmdir /s /q css
if exist js rmdir /s /q js
if exist products.json del /q products.json

echo.
echo Staging changes...
git add -A

echo.
echo Committing...
git commit -m "Real storefront build with actual products and photos"

echo.
echo Pushing (a browser window may open asking you to log into GitHub - approve it)...
git push

echo.
echo Done. Check the messages above for any errors.
pause
