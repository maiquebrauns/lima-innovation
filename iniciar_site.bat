@echo off
title Lima Innovations - Next.js (Local & Celular)
chcp 65001 >nul
cls

echo =============================================================
echo   INICIANDO O SITE LIMA INNOVATIONS (NEXT.JS MODERNO)
echo =============================================================
echo.

:: Garantir o caminho do Node.js no PATH
set "PATH=C:\Program Files\nodejs;%PATH%"

cd /d "%~dp0"

echo [1/2] Verificando instalacao do Node.js...
node -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao foi encontrado em "C:\Program Files\nodejs".
    pause
    exit /b 1
)

echo [2/2] Servidor iniciando...
echo.
echo =============================================================
echo   * NO SEU COMPUTADOR (PC):
echo     -> http://localhost:3001
echo.
echo   * NO SEU CELULAR / TELEFONE (MESMO WI-FI):
echo     -> http://192.168.0.94:3001
echo =============================================================
echo.
echo Mantenha esta janela aberta enquanto estiver navegando.
echo Pressione Ctrl+C para encerrar quando terminar.
echo.

:: Abrir o navegador no PC automaticamente apos 3 segundos
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3001"

:: Executa diretamente o binario do Next.js via node
node .\node_modules\next\dist\bin\next dev -H 0.0.0.0 -p 3001
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Ocorreu um erro ao iniciar o servidor.
    pause
)
