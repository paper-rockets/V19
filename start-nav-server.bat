@echo off
title Navigator Tools Sandbox Server
cls
set "PATH=%LOCALAPPDATA%\nvm\v24.16.0;%APPDATA%\npm;%PATH%"
echo =============================================================
echo        LAUNCHING NAVIGATOR TOOLS SANDBOX SERVER
echo =============================================================
echo.
cd /d "%~dp0Navigator"
node server.js 8003
pause
