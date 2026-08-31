param(
    [string]$SdkRoot = $env:LEMON_ANDROID_SDK,
    [string]$OutputPath = (Join-Path $PSScriptRoot '..\assets\downloads\LemonTracking-Android.apk')
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($SdkRoot)) {
    $SdkRoot = Join-Path $PSScriptRoot '..\..\android\sdk'
}
$SdkRoot = [IO.Path]::GetFullPath($SdkRoot)
$platformJar = Join-Path $SdkRoot 'platforms\android-35\android.jar'
$buildTools = Join-Path $SdkRoot 'build-tools\35.0.1'
$aapt2 = Join-Path $buildTools 'aapt2.exe'
$d8 = Join-Path $buildTools 'd8.bat'
$zipalign = Join-Path $buildTools 'zipalign.exe'
$apksigner = Join-Path $buildTools 'apksigner.bat'
$manifest = Join-Path $PSScriptRoot 'AndroidManifest.xml'
$sourceRoot = Join-Path $PSScriptRoot 'src\main\java'
$buildRoot = Join-Path $PSScriptRoot 'build'
$classes = Join-Path $buildRoot 'classes'
$dex = Join-Path $buildRoot 'dex'
$compilePlatformJar = Join-Path $buildRoot 'android.jar'
$unsigned = Join-Path $buildRoot 'LemonTracking-Android-unsigned.apk'
$aligned = Join-Path $buildRoot 'LemonTracking-Android-aligned.apk'
$keystore = Join-Path $PSScriptRoot 'debug.keystore'
$OutputPath = [IO.Path]::GetFullPath($OutputPath)

foreach ($required in @($platformJar, $aapt2, $d8, $zipalign, $apksigner)) {
    if (!(Test-Path -LiteralPath $required)) {
        throw "Missing Android build tool: $required"
    }
}

if (Test-Path -LiteralPath $buildRoot) {
    Remove-Item -LiteralPath $buildRoot -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $classes, $dex, (Split-Path -Parent $OutputPath) | Out-Null
Copy-Item -LiteralPath $platformJar -Destination $compilePlatformJar -Force

$javac = (Get-Command javac -ErrorAction Stop).Source
$jar = (Get-Command jar -ErrorAction Stop).Source
$keytool = (Get-Command keytool -ErrorAction Stop).Source
$sources = Get-ChildItem -LiteralPath $sourceRoot -Filter '*.java' -Recurse | Select-Object -ExpandProperty FullName
& $javac -encoding UTF-8 -source 8 -target 8 -Xlint:-options -proc:none -classpath $compilePlatformJar -d $classes $sources
if ($LASTEXITCODE -ne 0) { throw 'javac failed' }

& $aapt2 link -o $unsigned --manifest $manifest -I $platformJar --min-sdk-version 26 --target-sdk-version 35 --version-code 1 --version-name 0.1.0
if ($LASTEXITCODE -ne 0) { throw 'aapt2 link failed' }

$classFiles = Get-ChildItem -LiteralPath $classes -Filter '*.class' -Recurse | Select-Object -ExpandProperty FullName
& $d8 --lib $platformJar --min-api 26 --output $dex $classFiles
if ($LASTEXITCODE -ne 0) { throw 'd8 failed' }

Push-Location $dex
try {
    & $jar uf $unsigned 'classes.dex'
    if ($LASTEXITCODE -ne 0) { throw 'jar update failed' }
} finally {
    Pop-Location
}

& $zipalign -p -f 4 $unsigned $aligned
if ($LASTEXITCODE -ne 0) { throw 'zipalign failed' }

if (!(Test-Path -LiteralPath $keystore)) {
    & $keytool -genkeypair -keystore $keystore -storepass android -keypass android -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000 -dname 'CN=Lemon Tracking, O=Lemon Tracking, C=AU'
    if ($LASTEXITCODE -ne 0) { throw 'keytool failed' }
}

& $apksigner sign --ks $keystore --ks-pass pass:android --key-pass pass:android --out $OutputPath $aligned
if ($LASTEXITCODE -ne 0) { throw 'apksigner failed' }
& $apksigner verify --verbose $OutputPath
if ($LASTEXITCODE -ne 0) { throw 'apksigner verification failed' }

$apk = Get-Item -LiteralPath $OutputPath
$hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $OutputPath).Hash
Write-Output "APK=$($apk.FullName)"
Write-Output "SIZE=$($apk.Length)"
Write-Output "SHA256=$hash"
