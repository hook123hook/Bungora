@echo off
REM Bungora Monero yigini: monerod + wallet-rpc + bridge (ayri pencereler)
REM Once README'deki Adim 1-6'yi yapin (config.json + Bungora-watch cuzdani, make-watch.cmd).
REM Asagidaki PAROLA/SIFRE yer tutucusudur; gercek sifreler icin start.local.bat kullanin.
setlocal
set BASE=%~dp0
cd /d %BASE%

REM 1) Node (pruned). Kendi node'unuzu kullanmazsaniz bu satiri kapatin (#) ve
REM    2. satirda --daemon-address http://node.moneroworld.com:18081 kullanin.
start "Bungora-monerod" bin\monerod.exe --prune-blockchain --data-dir "%BASE%data\monerod" --rpc-bind-ip 127.0.0.1 --rpc-bind-port 18081

REM 2) Wallet RPC (view-only). Sifre config.json'daki wallet.password ile AYNI OLMALIDIR.
REM    Stagenet testi icin her iki yere de --stagenet, daemon 38081 olur.
start "Bungora-wallet-rpc" bin\monero-wallet-rpc.exe --wallet-file "%BASE%Bungora-watch" --wallet-password PAROLA --rpc-login Bungora:SIFRE --rpc-bind-port 18283 --daemon-address http://127.0.0.1:18081

REM 3) Bridge (Supabase'e yazar; havuzu her tiklama da 50 bos adrese tamamlar)
start "bungora-bridge" node xmr-bridge.js

echo Bungora Monero yigini baslatildi. Her pencereyi kapatmak o sureci durdurur.
echo Ilk kez calistiriyorsaniz once cuzdan hazirlayin (make-watch.cmd) ve: npm run seed