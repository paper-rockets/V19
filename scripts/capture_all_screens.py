import os
import sys
import time
import tempfile
import traceback
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "http://localhost:3000"
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PLAY_DIR = os.path.join(ROOT_DIR, "screenshots", "play_mode")
PRO_DIR = os.path.join(ROOT_DIR, "screenshots", "pro_mode")

os.makedirs(PLAY_DIR, exist_ok=True)
os.makedirs(PRO_DIR, exist_ok=True)

def create_driver():
    opts = Options()
    opts.add_argument("--headless=new")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--enable-webgl")
    opts.add_argument(f"--user-data-dir={tempfile.mkdtemp()}")
    opts.add_argument("--window-size=1600,1000")
    driver = webdriver.Chrome(options=opts)
    driver.set_window_size(1600, 1000)
    return driver

def snap(driver, out_dir, filename, desc, delay=0.8):
    time.sleep(delay)
    filepath = os.path.join(out_dir, filename)
    driver.save_screenshot(filepath)
    size = os.path.getsize(filepath) if os.path.exists(filepath) else 0
    print(f"  [OK] {filename} ({size:,} bytes) - {desc}")
    sys.stdout.flush()

def click_aria(driver, label):
    driver.execute_script(f"""
        const el = document.querySelector('[aria-label="{label}"]');
        if (el) {{
            el.scrollIntoView({{ block: 'center', inline: 'center' }});
            el.click();
        }} else {{
            throw new Error('Element not found: aria-label="{label}"');
        }}
    """)

def click_text(driver, text):
    driver.execute_script(f"""
        const buttons = Array.from(document.querySelectorAll('button, div[role="button"], a'));
        const target = buttons.find(e => e.textContent && e.textContent.trim().toLowerCase().includes("{text.lower()}"));
        if (target) {{
            target.scrollIntoView({{ block: 'center', inline: 'center' }});
            target.click();
        }} else {{
            throw new Error('Button not found containing text: "{text}"');
        }}
    """)

def close_active_modal(driver):
    try:
        driver.execute_script("""
            const closeButtons = Array.from(document.querySelectorAll('button[aria-label="Close"], button[title="Close"], button[aria-label="Back to canvas"], button[aria-label="Close dialog"]'));
            const visible = closeButtons.find(b => b.offsetParent !== null);
            if (visible) {
                visible.click();
            } else {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
            }
        """)
    except Exception:
        driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
    time.sleep(0.5)

def ensure_settings_open(driver):
    try:
        # Check if settings sheet already open
        sheet = driver.execute_script("return document.querySelector('[aria-label=\"Preferences\"]') !== null;")
        if not sheet:
            click_aria(driver, "Settings")
            time.sleep(0.6)
    except Exception:
        click_aria(driver, "Settings")
        time.sleep(0.6)

def run_play_mode_audit(driver):
    print("\n==========================================")
    print("      RUNNING PLAY / REGULAR MODE AUDIT")
    print("==========================================")
    sys.stdout.flush()

    # 1. First-Run Overlay
    print("Navigating to initial onboarding state...")
    driver.get(BASE_URL)
    driver.execute_script("""
        localStorage.setItem("remix3d.uiMode", "play");
        localStorage.setItem("remix3d.hasOnboarded", "false");
    """)
    driver.refresh()
    time.sleep(2.0)
    snap(driver, PLAY_DIR, "01_first_run_overlay.png", "First-Run tutorial overlay with card guide")

    # 2. Clean default canvas view
    print("Dismissing onboarding to reach clean Play canvas...")
    driver.execute_script("""
        localStorage.setItem("remix3d.uiMode", "play");
        localStorage.setItem("remix3d.hasOnboarded", "true");
    """)
    driver.refresh()
    time.sleep(2.5)
    snap(driver, PLAY_DIR, "02_canvas_default.png", "Clean Play canvas default view")

    # 3. Draw tool selected
    print("Testing Play Dock tools...")
    click_aria(driver, "Draw")
    snap(driver, PLAY_DIR, "03_tool_draw_selected.png", "Play Dock with Draw tool active")

    # 4. Shape tool selected with ShapesSheet
    click_aria(driver, "Shape")
    snap(driver, PLAY_DIR, "04_tool_shape_selected.png", "Shape tool active with ShapesSheet bottom sheet")

    # 5. ShapesSheet options (strictness & straight lines)
    try:
        click_text(driver, "Eager")
    except Exception:
        pass
    try:
        driver.execute_script("""
            const sw = document.querySelector('button[role="switch"][aria-label="Straight lines only"]');
            if (sw) sw.click();
        """)
    except Exception:
        pass
    snap(driver, PLAY_DIR, "05_tool_shape_options.png", "ShapesSheet strictness and straight line options toggled")
    driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
    time.sleep(0.4)

    # 6. Erase tool selected
    click_aria(driver, "Erase")
    snap(driver, PLAY_DIR, "06_tool_erase_selected.png", "Play Dock with Erase tool active")
    click_aria(driver, "Draw")
    time.sleep(0.3)

    # 7. Color popup
    print("Testing Play floating bottom controls...")
    click_aria(driver, "Color")
    snap(driver, PLAY_DIR, "07_color_palette_popup.png", "Color popup with swatches and More Colors button")

    # 8. Stroke size popup
    click_aria(driver, "Stroke size")
    snap(driver, PLAY_DIR, "08_stroke_size_popup.png", "Stroke size popup with 4 preset dimensions")

    # 9. Brush profile cycling toast
    click_aria(driver, "Brush profile")
    snap(driver, PLAY_DIR, "09_brush_profile_toast.png", "Brush profile cycled with confirmation notice")

    # 10. Color Studio Modal
    click_aria(driver, "Color")
    time.sleep(0.3)
    click_aria(driver, "More colors")
    snap(driver, PLAY_DIR, "10_color_studio_modal.png", "Advanced Color Studio modal", delay=1.2)
    close_active_modal(driver)

    # 11. Toybox Modal
    print("Testing Model Library & Importer...")
    click_aria(driver, "Open model library")
    snap(driver, PLAY_DIR, "11_toybox_modal.png", "Toybox 3D model library modal", delay=1.2)

    # 12. Play Importer Modal
    click_text(driver, "Import 3D Asset")
    snap(driver, PLAY_DIR, "12_play_importer_modal.png", "Play Importer modal", delay=1.2)
    close_active_modal(driver)
    time.sleep(0.3)
    close_active_modal(driver)

    # 13. Settings Sheet General
    print("Testing Play Settings Sheet & Studio hubs...")
    ensure_settings_open(driver)
    snap(driver, PLAY_DIR, "13_settings_sheet_general.png", "Play Settings sheet (Preferences)")

    # 14. White Clay appearance
    click_text(driver, "White Clay")
    snap(driver, PLAY_DIR, "14_settings_display_mode_clay.png", "Model appearance White Clay selected")

    # 15. Skybox Studio
    ensure_settings_open(driver)
    click_text(driver, "Configure Skybox")
    snap(driver, PLAY_DIR, "15_sky_environment_modal.png", "Skybox & Atmosphere Environment studio", delay=1.2)
    close_active_modal(driver)

    # 16. Render Settings
    ensure_settings_open(driver)
    click_text(driver, "Picture Quality")
    snap(driver, PLAY_DIR, "16_render_settings_modal.png", "Render Settings & Picture Quality studio", delay=1.2)
    close_active_modal(driver)

    # 17. Export 3D modal
    ensure_settings_open(driver)
    click_text(driver, "Export")
    snap(driver, PLAY_DIR, "17_export_modal.png", "Export 3D Artwork modal", delay=1.2)
    close_active_modal(driver)

    # 18. AR Viewer modal
    ensure_settings_open(driver)
    click_text(driver, "View in AR")
    snap(driver, PLAY_DIR, "18_ar_viewer_modal.png", "WebXR Augmented Reality Viewer modal", delay=1.2)
    close_active_modal(driver)

    # 19. Blueprint Reference Clipboard
    ensure_settings_open(driver)
    click_text(driver, "Reference Images")
    snap(driver, PLAY_DIR, "19_clipboard_modal.png", "Floating Reference Blueprint Clipboard modal", delay=1.2)
    close_active_modal(driver)

    # 20. Navigator Sandbox
    ensure_settings_open(driver)
    try:
        driver.execute_script("""
            const sheet = document.querySelector('[aria-label="Preferences"] .overflow-y-auto');
            if (sheet) sheet.scrollTop = sheet.scrollHeight;
        """)
        time.sleep(0.3)
        click_text(driver, "Open Sandbox")
        snap(driver, PLAY_DIR, "20_navigator_sandbox.png", "Navigator Sandbox developer testbench", delay=1.5)
        try:
            click_text(driver, "Exit Sandbox")
        except Exception:
            close_active_modal(driver)
    except Exception as e:
        print("Sandbox note:", e)

    print("Play Mode audit completed successfully!")
    sys.stdout.flush()

def run_pro_mode_audit(driver):
    print("\n==========================================")
    print("         RUNNING PRO MODE AUDIT")
    print("==========================================")
    sys.stdout.flush()

    print("Switching to Pro Mode...")
    driver.execute_script("""
        localStorage.setItem("remix3d.uiMode", "pro");
        localStorage.setItem("remix3d.hasOnboarded", "true");
    """)
    driver.refresh()
    time.sleep(2.5)

    # 01. Pro default canvas
    snap(driver, PRO_DIR, "01_pro_canvas_default.png", "Pro mode default view with five-mode rail & FPS counter")

    # 02. Rail Mode 1: Select Panel
    print("Testing Pro Rail Mode 1: Select...")
    click_aria(driver, "Select")
    snap(driver, PRO_DIR, "02_rail_select_panel.png", "Pro Rail Mode 1: Select Panel")

    # 03. Select Scope: Model
    click_text(driver, "Model")
    snap(driver, PRO_DIR, "03_select_scope_model.png", "Select scope switched to Model")

    # 04. Rail Mode 2: Draw Panel Presets
    print("Testing Pro Rail Mode 2: Draw...")
    click_aria(driver, "Draw")
    driver.execute_script("""
        const panel = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
        if (panel) panel.scrollTop = 0;
    """)
    snap(driver, PRO_DIR, "04_rail_draw_panel_presets.png", "Pro Rail Mode 2: Draw Panel Brush Presets")

    # 05. Draw Panel Sliders & Smoothing
    driver.execute_script("""
        const panel = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
        if (panel) panel.scrollTop = 220;
    """)
    snap(driver, PRO_DIR, "05_draw_panel_sliders_and_smoothing.png", "Draw Panel Sliders and Smoothing Algorithms")

    # 06. Draw Panel Materials & Stroke Profiles
    driver.execute_script("""
        const panel = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
        if (panel) panel.scrollTop = 480;
    """)
    snap(driver, PRO_DIR, "06_draw_panel_materials_and_profiles.png", "Draw Panel Material Types and Stroke Profiles")

    # 07. Draw Panel Eraser Modes
    driver.execute_script("""
        const panel = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
        if (panel) panel.scrollTop = 0;
    """)
    time.sleep(0.2)
    driver.execute_script("""
        const eraseBtn = document.querySelector('aside[aria-label="Draw Panel"] button[aria-label*="Eraser"], aside[aria-label="Draw Panel"] button[title*="Eraser"]');
        if (eraseBtn) eraseBtn.click();
    """)
    snap(driver, PRO_DIR, "07_draw_panel_eraser_modes.png", "Draw Panel Eraser active with Eraser Modes (Object, Slice, Vacuum, Alpha)")

    # 08. Color Studio modal from Draw Panel
    try:
        driver.execute_script("""
            const paletteBtn = document.querySelector('aside[aria-label="Draw Panel"] button[aria-label*="Color"], aside[aria-label="Draw Panel"] button[title*="Color"]');
            if (paletteBtn) paletteBtn.click();
        """)
        snap(driver, PRO_DIR, "08_color_studio_modal.png", "Advanced Color Studio modal opened from Draw Panel", delay=1.2)
        close_active_modal(driver)
    except Exception as e:
        print("Color Studio note:", e)

    # 09. Rail Mode 3: Create Panel Primitives
    print("Testing Pro Rail Mode 3: Create...")
    click_aria(driver, "Create")
    snap(driver, PRO_DIR, "09_rail_create_panel_primitives.png", "Pro Rail Mode 3: Create Panel with 3D Primitives")

    # 10. Model Library Modal
    print("Opening Model Library...")
    try:
        click_text(driver, "Model Library")
    except Exception:
        click_aria(driver, "Open model library")
    snap(driver, PRO_DIR, "10_model_library_modal.png", "Model Library modal (37+ Models with Draco compression)", delay=1.2)

    # 11. Model Converter Modal
    try:
        click_text(driver, "Convert")
    except Exception:
        close_active_modal(driver)
        click_aria(driver, "Create")
        time.sleep(0.3)
        click_text(driver, "Import")
    snap(driver, PRO_DIR, "11_model_converter_modal.png", "Model Converter & Ingestion suite", delay=1.2)
    close_active_modal(driver)
    time.sleep(0.3)
    close_active_modal(driver)

    # 12. Rail Mode 4: Deform Panel
    print("Testing Pro Rail Mode 4: Deform...")
    click_aria(driver, "Deform")
    snap(driver, PRO_DIR, "12_rail_deform_panel.png", "Pro Rail Mode 4: Deform Panel with Push/Pull Liquify")

    # 13. Scaffolding Studio Modal
    click_text(driver, "Collision Scaffolding")
    snap(driver, PRO_DIR, "13_scaffolding_modal.png", "3D Collision Scaffolding & Procedural Armatures modal", delay=1.2)
    close_active_modal(driver)

    # 14. Bent Guide Modal
    click_aria(driver, "Deform")
    time.sleep(0.3)
    click_text(driver, "Bent 3D Guide")
    snap(driver, PRO_DIR, "14_bent_guide_modal.png", "Bent 3D Manifold Guide & Lofting modal", delay=1.2)
    close_active_modal(driver)

    # 15. Curve Decimate Modal
    click_aria(driver, "Deform")
    time.sleep(0.3)
    click_text(driver, "Decimate Curves")
    snap(driver, PRO_DIR, "15_curve_decimate_modal.png", "RDP Curve Decimation modal", delay=1.2)
    close_active_modal(driver)

    # 16. Custom Mirror Modal
    click_aria(driver, "Deform")
    time.sleep(0.3)
    click_text(driver, "Mirror Plane")
    snap(driver, PRO_DIR, "16_custom_mirror_modal.png", "Arbitrary 3D Mirror Plane modal", delay=1.2)
    close_active_modal(driver)

    # 17. Rail Mode 5: Layers Panel
    print("Testing Pro Rail Mode 5: Layers...")
    click_aria(driver, "Layers")
    snap(driver, PRO_DIR, "17_rail_layers_panel.png", "Pro Rail Mode 5: Layer Panel with blend modes and opacity")

    # 18. Settings Sheet in Pro mode
    print("Testing Pro Preferences & Modals...")
    ensure_settings_open(driver)
    snap(driver, PRO_DIR, "18_settings_sheet.png", "Preferences / Settings sheet in Pro mode")

    # 19. Skybox Studio in Pro mode
    click_text(driver, "Configure Skybox")
    snap(driver, PRO_DIR, "19_sky_environment_modal.png", "Skybox & Atmosphere Environment studio in Pro mode", delay=1.2)
    close_active_modal(driver)

    # 20. Render Settings in Pro mode
    ensure_settings_open(driver)
    click_text(driver, "Picture Quality")
    snap(driver, PRO_DIR, "20_render_settings_modal.png", "Render Settings & Picture Quality studio in Pro mode", delay=1.2)
    close_active_modal(driver)

    # 21. Export Modal in Pro mode
    ensure_settings_open(driver)
    click_text(driver, "Export")
    snap(driver, PRO_DIR, "21_export_modal.png", "Export 3D Artwork modal in Pro mode", delay=1.2)
    close_active_modal(driver)

    # 22. AR Viewer in Pro mode
    ensure_settings_open(driver)
    click_text(driver, "View in AR")
    snap(driver, PRO_DIR, "22_ar_viewer_modal.png", "WebXR Augmented Reality Viewer modal in Pro mode", delay=1.2)
    close_active_modal(driver)

    # 23. Clipboard Modal in Pro mode
    ensure_settings_open(driver)
    click_text(driver, "Reference Images")
    snap(driver, PRO_DIR, "23_clipboard_modal.png", "Floating Reference Blueprint Clipboard modal in Pro mode", delay=1.2)
    close_active_modal(driver)

    # 24. Numeric Keypad (Numpad) Modal
    print("Opening Numpad modal...")
    try:
        click_aria(driver, "Select")
        time.sleep(0.3)
        driver.execute_script("""
            const numpadTriggers = Array.from(document.querySelectorAll('button[aria-label*="Numpad"], button[title*="Numpad"], input[type="number"]'));
            if (numpadTriggers.length > 0) numpadTriggers[0].click();
        """)
        snap(driver, PRO_DIR, "24_numpad_modal.png", "On-screen Numeric Keypad Modal for precise coordinate input", delay=1.0)
        close_active_modal(driver)
    except Exception as e:
        print("Numpad note:", e)

    # 25. Navigator Sandbox
    ensure_settings_open(driver)
    try:
        driver.execute_script("""
            const sheet = document.querySelector('[aria-label="Preferences"] .overflow-y-auto');
            if (sheet) sheet.scrollTop = sheet.scrollHeight;
        """)
        time.sleep(0.3)
        click_text(driver, "Open Sandbox")
        snap(driver, PRO_DIR, "25_navigator_sandbox.png", "Navigator Sandbox developer testbench in Pro mode", delay=1.5)
        try:
            click_text(driver, "Exit Sandbox")
        except Exception:
            close_active_modal(driver)
    except Exception as e:
        print("Sandbox note:", e)

    print("Pro Mode audit completed successfully!")
    sys.stdout.flush()

def main():
    driver = create_driver()
    try:
        run_play_mode_audit(driver)
        run_pro_mode_audit(driver)
        print("\n==========================================")
        print("ALL AUDITS AND SCREENSHOTS COMPLETE!")
        print("==========================================")
    except Exception as e:
        print(f"\nAudit failed with exception: {e}")
        traceback.print_exc()
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
