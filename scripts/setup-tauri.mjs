import fs from 'fs';
import path from 'path';

const tauriDir = path.resolve('src-tauri');
const srcDir = path.resolve('src-tauri', 'src');
const capDir = path.resolve('src-tauri', 'capabilities');

fs.mkdirSync(srcDir, { recursive: true });
fs.mkdirSync(capDir, { recursive: true });

// 1. Cargo.toml
const cargoToml = `[package]
name = "remix-studio"
version = "0.1.0"
description = "Remix 3D Model Painting Studio - Native Standalone App"
authors = ["Paper Rocket"]
edition = "2021"

[lib]
name = "remix_studio_lib"
crate-type = ["staticlib", "cdylib", "rlib"]

[build-dependencies]
tauri-build = { version = "2", features = [] }

[dependencies]
tauri = { version = "2", features = ["tray-icon", "image-ico"] }
tauri-plugin-dialog = "2"
tauri-plugin-fs = "2"
tauri-plugin-haptics = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tokio = { version = "1", features = ["full"] }
base64 = "0.22"
`;
fs.writeFileSync(path.join(tauriDir, 'Cargo.toml'), cargoToml, 'utf-8');

// 2. build.rs
const buildRs = `fn main() {
    tauri_build::build()
}
`;
fs.writeFileSync(path.join(tauriDir, 'build.rs'), buildRs, 'utf-8');

// 3. tauri.conf.json
const tauriConf = {
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "Remix 3D Studio",
  "version": "0.1.0",
  "identifier": "com.paperrocket.remix3d",
  "build": {
    "beforeDevCommand": "npm run dev",
    "devUrl": "http://localhost:3000",
    "beforeBuildCommand": "npm run build",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "title": "Remix 3D Studio",
        "width": 1280,
        "height": 800,
        "minWidth": 800,
        "minHeight": 600,
        "resizable": true,
        "fullscreen": false,
        "decorations": true,
        "transparent": false,
        "dragDropEnabled": true
      }
    ],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ],
    "android": {
      "minSdkVersion": 24
    }
  },
  "plugins": {
    "fs": {
      "requireLiteralLeadingDot": false
    },
    "dialog": {}
  }
};
fs.writeFileSync(path.join(tauriDir, 'tauri.conf.json'), JSON.stringify(tauriConf, null, 2), 'utf-8');

// 4. capabilities/default.json
const defaultCap = {
  "$schema": "https://schema.tauri.app/config/2/capability",
  "identifier": "default",
  "description": "Default capability set for Remix 3D Studio native features",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "fs:default",
    "fs:allow-read-file",
    "fs:allow-write-file",
    "fs:allow-exists",
    "fs:allow-mkdir",
    "dialog:default",
    "dialog:allow-open",
    "dialog:allow-save",
    "dialog:allow-message",
    "dialog:allow-ask",
    "dialog:allow-confirm"
  ]
};
fs.writeFileSync(path.join(capDir, 'default.json'), JSON.stringify(defaultCap, null, 2), 'utf-8');

// 5. src/lib.rs
const libRs = `use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize)]
pub struct DeviceHardwareReport {
    pub platform: String,
    pub arch: String,
    pub os_version: String,
    pub is_mobile: bool,
    pub hardware_concurrency: usize,
    pub has_s_pen_support: bool,
}

/// Native 3D model / project archive export
#[tauri::command]
pub async fn save_3d_file(file_path: String, data_base64: String) -> Result<String, String> {
    use base64::Engine;
    let decoded = base64::engine::general_purpose::STANDARD
        .decode(&data_base64)
        .map_err(|e| format!("Failed to decode base64 file data: {}", e))?;

    let path = PathBuf::from(&file_path);
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).map_err(|e| format!("Failed to create parent dir: {}", e))?;
    }

    fs::write(&path, &decoded).map_err(|e| format!("Failed to write file {}: {}", file_path, e))?;
    Ok(format!("Successfully saved {} bytes to {}", decoded.len(), file_path))
}

/// Native 3D model loader with direct binary stream
#[tauri::command]
pub async fn load_3d_file(file_path: String) -> Result<String, String> {
    use base64::Engine;
    let bytes = fs::read(&file_path).map_err(|e| format!("Failed to read file {}: {}", file_path, e))?;
    let encoded = base64::engine::general_purpose::STANDARD.encode(&bytes);
    Ok(encoded)
}

/// Device hardware telemetry report
#[tauri::command]
pub fn get_device_hardware_info() -> DeviceHardwareReport {
    let platform = std::env::consts::OS.to_string();
    let arch = std::env::consts::ARCH.to_string();
    let is_mobile = platform == "android" || platform == "ios";

    DeviceHardwareReport {
        platform: platform.clone(),
        arch,
        os_version: std::env::var("OS").unwrap_or_else(|_| "Unknown".to_string()),
        is_mobile,
        hardware_concurrency: std::thread::available_parallelism()
            .map(|p| p.get())
            .unwrap_or(4),
        has_s_pen_support: is_mobile && platform == "android",
    }
}

/// Native Tactile Haptics for stylus clicks & dials
#[tauri::command]
pub fn trigger_native_haptic(app_handle: tauri::AppHandle, pattern: String) -> Result<(), String> {
    #[cfg(target_os = "android")]
    {
        let _ = app_handle;
        let _ = pattern;
    }
    #[cfg(not(target_os = "android"))]
    {
        let _ = app_handle;
        let _ = pattern;
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            save_3d_file,
            load_3d_file,
            get_device_hardware_info,
            trigger_native_haptic,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
`;
fs.writeFileSync(path.join(srcDir, 'lib.rs'), libRs, 'utf-8');

// 6. src/main.rs
const mainRs = `// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    remix_studio_lib::run();
}
`;
fs.writeFileSync(path.join(srcDir, 'main.rs'), mainRs, 'utf-8');

console.log('Tauri 2.0 scaffold files written successfully.');
