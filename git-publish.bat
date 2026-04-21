@echo off
title Element Craft - GitHub'a Yayinla
echo.
echo  =============================================
echo    🚀 Element Craft - GitHub'a Yayinlaniyor...
echo  =============================================
echo.

cd /d "%~dp0"

git add -A
git commit -m "Element Craft guncelleme - %date% %time%"
git push origin master

echo.
echo  =============================================
echo    ✅ Yayinlandi!
echo    🌐 https://onderaktas54.github.io/element-craft/
echo  =============================================
echo.
echo  (Sayfa 1-2 dakika icinde guncellenecektir)
echo.
pause
