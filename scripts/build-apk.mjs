import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.resolve('.');
const TAURI_DIR = path.join(ROOT_DIR, 'src-tauri');
const ANDROID_DIR = path.join(TAURI_DIR, 'gen', 'android');
const OUT_APK_DIR = path.join(ROOT_DIR, 'dist-apk');

// Standard Android & Java paths
const ANDROID_SDK = process.env.ANDROID_HOME || 'C:\\Users\\macie\\AppData\\Local\\Android\\Sdk';
const ANDROID_NDK = process.env.NDK_HOME || path.join(ANDROID_SDK, 'ndk', '27.2.12479018');
const JAVA_HOME = process.env.JAVA_HOME || 'C:\\Program Files\\Microsoft\\jdk-21.0.12.101-hotspot';
const CARGO_BIN = 'C:\\Users\\macie\\.cargo\\bin';

const llvmBin = path.join(ANDROID_NDK, 'toolchains', 'llvm', 'prebuilt', 'windows-x86_64', 'bin');
const clangCmd = path.join(llvmBin, 'aarch64-linux-android24-clang.cmd');
const clangppCmd = path.join(llvmBin, 'aarch64-linux-android24-clang++.cmd');

const env = {
  ...process.env,
  ANDROID_HOME: ANDROID_SDK,
  ANDROID_SDK_ROOT: ANDROID_SDK,
  NDK_HOME: ANDROID_NDK,
  JAVA_HOME: JAVA_HOME,
  CARGO_TARGET_AARCH64_LINUX_ANDROID_LINKER: clangCmd,
  CARGO_TARGET_AARCH64_LINUX_ANDROID_RUSTFLAGS: "-C link-arg=-Wl,-z,max-page-size=16384 -C link-arg=-Wl,-z,common-page-size=16384",
  RUSTFLAGS: "-C link-arg=-Wl,-z,max-page-size=16384 -C link-arg=-Wl,-z,common-page-size=16384",
  CC_aarch64_linux_android: clangCmd,
  CXX_aarch64_linux_android: clangppCmd,
  PATH: `${CARGO_BIN};${JAVA_HOME}\\bin;${ANDROID_SDK}\\platform-tools;${ANDROID_SDK}\\cmdline-tools\\latest\\bin;${llvmBin};${process.env.PATH}`,
};

function run(cmd, cwd = ROOT_DIR) {
  console.log(`\n===> Running: ${cmd}`);
  execSync(cmd, { cwd, env, stdio: 'inherit' });
}

console.log('====================================================');
console.log('🚀 Compiling Remix 3D Studio WebGPU Android APK');
console.log('====================================================');
console.log(`Android SDK : ${ANDROID_SDK}`);
console.log(`Android NDK : ${ANDROID_NDK}`);
console.log(`Java Home   : ${JAVA_HOME}`);

// 1. Build Vite frontend
console.log('\n[1/4] Bundling WebGL / WebGPU 3D Frontend...');
run('npm run build', ROOT_DIR);

// 2. Build Rust native library for ARM64
console.log('\n[2/4] Compiling Native Rust Library (aarch64-linux-android)...');
run('cargo build --manifest-path src-tauri/Cargo.toml --target aarch64-linux-android --features "tauri/custom-protocol" --lib', ROOT_DIR);

// 3. Stage .so into jniLibs
console.log('\n[3/4] Staging native shared library into jniLibs/arm64-v8a...');
const srcSo = path.join(TAURI_DIR, 'target', 'aarch64-linux-android', 'debug', 'libremix_studio_lib.so');
const destDir = path.join(ANDROID_DIR, 'app', 'src', 'main', 'jniLibs', 'arm64-v8a');
fs.mkdirSync(destDir, { recursive: true });
const destSo = path.join(destDir, 'libremix_studio_lib.so');
fs.copyFileSync(srcSo, destSo);
console.log(`Copied ${srcSo} -> ${destSo}`);

// 4. Gradle assemble APK
console.log('\n[4/4] Assembling APK with Gradle...');
const gradlew = process.platform === 'win32' ? '.\\gradlew.bat' : './gradlew';
run(`${gradlew} assembleArm64Debug -x rustBuildArm64Debug -x rustBuildUniversalDebug`, ANDROID_DIR);

// Copy APK to root dist-apk folder
const sourceApk = path.join(ANDROID_DIR, 'app', 'build', 'outputs', 'apk', 'arm64', 'debug', 'app-arm64-debug.apk');
fs.mkdirSync(OUT_APK_DIR, { recursive: true });
const targetApk = path.join(OUT_APK_DIR, 'Remix3DStudio-arm64-debug.apk');
fs.copyFileSync(sourceApk, targetApk);

const stats = fs.statSync(targetApk);
const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

console.log('\n====================================================');
console.log('🎉 APK COMPILED SUCCESSFULLY!');
console.log(`Output APK : ${targetApk}`);
console.log(`Size       : ${sizeMb} MB`);
console.log('====================================================');
console.log('\nTo install on a connected Android phone/tablet:');
console.log(`  adb install -r "${targetApk}"`);
console.log('====================================================\n');
