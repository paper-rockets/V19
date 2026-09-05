import os
import sys
import time
import tempfile
import traceback
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

BASE_URL = "http://localhost:3000"
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PRO_DIR = os.path.join(ROOT_DIR, "screenshots", "pro_mode")
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

def snap(driver, filename, desc, delay=0.8):
    time.sleep(delay)
    filepath = os.path.join(PRO_DIR, filename)
    driver.save_screenshot(filepath)
    size = os.path.getsize(filepath) if os.path.exists(filepath) else 0
    print(f"  [OK] {filename} ({size:,} bytes) - {desc}")
    sys.stdout.flush()

def ensure_rail_panel(driver, label):
    driver.execute_script(f"""
        const panel = document.querySelector('aside[aria-label="{label} Panel"]');
        if (!panel) {{
            const btn = document.querySelector('button[aria-label="{label}"]');
            if (btn) btn.click();
        }}
    """)
    time.sleep(0.5)

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
        const buttons = Array.from(document.querySelectorAll('button, div[role="button"], a, span'));
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
            // 1. Check for visible button containing Lucide X
            const xSvgs = Array.from(document.querySelectorAll('svg.lucide-x, svg.lucide-close'));
            for (const svg of xSvgs) {
                const btn = svg.closest('button');
                if (btn && btn.offsetParent !== null) {
                    btn.click();
                    return;
                }
            }
            // 2. Check for button aria-label Close
            const closeButtons = Array.from(document.querySelectorAll('button[aria-label="Close"], button[title="Close"], button[aria-label="Back to canvas"], button[aria-label="Close dialog"], #close-model-library-btn'));
            const visible = closeButtons.find(b => b.offsetParent !== null);
            if (visible) {
                visible.click();
                return;
            }
            // 3. Fallback to Escape
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
        """)
    except Exception:
        driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
    time.sleep(0.6)

def ensure_settings_open(driver):
    try:
        sheet = driver.execute_script("return document.querySelector('[aria-label=\"Preferences\"]') !== null;")
        if not sheet:
            click_aria(driver, "Settings")
            time.sleep(0.6)
    except Exception:
        click_aria(driver, "Settings")
        time.sleep(0.6)

def run_pro_mode_audit(driver):
    print("\n==========================================")
    print("         RUNNING PRO MODE AUDIT")
    print("==========================================")
    sys.stdout.flush()

    print("Switching to Pro Mode...")
    driver.get(BASE_URL)
    driver.execute_script("""
        localStorage.setItem("remix3d.uiMode", "pro");
        localStorage.setItem("remix3d.hasOnboarded", "true");
    """)
    driver.refresh()
    time.sleep(2.5)

    # 01. Pro default canvas
    snap(driver, "01_pro_canvas_default.png", "Pro mode default view with five-mode rail & FPS counter")

    # 02. Rail Mode 1: Select Panel
    print("Testing Pro Rail Mode 1: Select...")
    ensure_rail_panel(driver, "Select")
    snap(driver, "02_rail_select_panel.png", "Pro Rail Mode 1: Select Panel")

    # 03. Select Scope: Model
    click_text(driver, "Model")
    snap(driver, "03_select_scope_model.png", "Select scope switched to Model")

    # 04. Rail Mode 2: Draw Panel Presets
    print("Testing Pro Rail Mode 2: Draw...")
    ensure_rail_panel(driver, "Draw")
    driver.execute_script("""
        const panel = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
        if (panel) panel.scrollTop = 0;
    """)
    snap(driver, "04_rail_draw_panel_presets.png", "Pro Rail Mode 2: Draw Panel Brush Presets")

    # 05. Draw Panel Sliders & Smoothing
    driver.execute_script("""
        const panel = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
        if (panel) panel.scrollTop = 220;
    """)
    snap(driver, "05_draw_panel_sliders_and_smoothing.png", "Draw Panel Sliders and Smoothing Algorithms")

    # 06. Draw Panel Materials & Stroke Profiles
    driver.execute_script("""
        const panel = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
        if (panel) panel.scrollTop = 480;
    """)
    snap(driver, "06_draw_panel_materials_and_profiles.png", "Draw Panel Material Types and Stroke Profiles")

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
    snap(driver, "07_draw_panel_eraser_modes.png", "Draw Panel Eraser active with Eraser Modes (Object, Slice, Vacuum, Alpha)")

    # 08. Color Studio modal from Draw Panel
    try:
        driver.execute_script("""
            const paletteBtn = document.querySelector('aside[aria-label="Draw Panel"] button[aria-label*="Color"], aside[aria-label="Draw Panel"] button[title*="Color"]');
            if (paletteBtn) paletteBtn.click();
        """)
        snap(driver, "08_color_studio_modal.png", "Advanced Color Studio modal opened from Draw Panel", delay=1.2)
        close_active_modal(driver)
    except Exception as e:
        print("Color Studio note:", e)

    # 09. Rail Mode 3: Create Panel Primitives
    print("Testing Pro Rail Mode 3: Create...")
    ensure_rail_panel(driver, "Create")
    snap(driver, "09_rail_create_panel_primitives.png", "Pro Rail Mode 3: Create Panel with 3D Primitives")

    # 10. Model Library Modal
    print("Opening Model Library...")
    click_text(driver, "Browse Model Library")
    snap(driver, "10_model_library_modal.png", "Model Library modal (37+ Models with Draco compression)", delay=1.2)

    # 11. Model Converter Modal
    print("Opening Model Converter Suite from Library...")
    click_text(driver, "3D Converter & Storage")
    snap(driver, "11_model_converter_modal.png", "Model Converter & Ingestion suite", delay=1.2)
    close_active_modal(driver)
    time.sleep(0.5)

    # 12. Rail Mode 4: Deform Panel
    print("Testing Pro Rail Mode 4: Deform...")
    ensure_rail_panel(driver, "Deform")
    snap(driver, "12_rail_deform_panel.png", "Pro Rail Mode 4: Deform Panel with Push/Pull Liquify")

    # 13. Scaffolding Studio Modal
    print("Opening Scaffolding (Armatures & Forms)...")
    click_text(driver, "Armatures & Forms")
    snap(driver, "13_scaffolding_modal.png", "3D Collision Scaffolding & Procedural Armatures modal", delay=1.2)
    close_active_modal(driver)

    # 14. Bent Guide Modal
    print("Opening Bent Guide (Bend Along a Path)...")
    ensure_rail_panel(driver, "Deform")
    click_text(driver, "Bend Along a Path")
    snap(driver, "14_bent_guide_modal.png", "Bent 3D Manifold Guide & Lofting modal", delay=1.2)
    close_active_modal(driver)

    # 15. Curve Decimate Modal
    print("Opening Curve Decimate (Simplify Settings)...")
    ensure_rail_panel(driver, "Deform")
    click_text(driver, "Simplify Settings")
    snap(driver, "15_curve_decimate_modal.png", "RDP Curve Decimation modal", delay=1.2)
    close_active_modal(driver)

    # 16. Custom Mirror Modal
    print("Opening Custom Mirror (Mirror Settings)...")
    ensure_rail_panel(driver, "Deform")
    click_text(driver, "Mirror Settings")
    snap(driver, "16_custom_mirror_modal.png", "Arbitrary 3D Mirror Plane modal", delay=1.2)
    close_active_modal(driver)

    # 17. Rail Mode 5: Layers Panel
    print("Testing Pro Rail Mode 5: Layers...")
    ensure_rail_panel(driver, "Layers")
    snap(driver, "17_rail_layers_panel.png", "Pro Rail Mode 5: Layer Panel with blend modes and opacity")

    # 18. Settings Sheet in Pro mode
    print("Testing Pro Preferences & Modals...")
    ensure_settings_open(driver)
    snap(driver, "18_settings_sheet.png", "Preferences / Settings sheet in Pro mode")

    # 19. Skybox Studio in Pro mode
    click_text(driver, "Configure Skybox")
    snap(driver, "19_sky_environment_modal.png", "Skybox & Atmosphere Environment studio in Pro mode", delay=1.2)
    close_active_modal(driver)

    # 20. Render Settings in Pro mode
    ensure_settings_open(driver)
    click_text(driver, "Picture Quality")
    snap(driver, "20_render_settings_modal.png", "Render Settings & Picture Quality studio in Pro mode", delay=1.2)
    close_active_modal(driver)

    # 21. Export Modal in Pro mode
    ensure_settings_open(driver)
    click_text(driver, "Export")
    snap(driver, "21_export_modal.png", "Export 3D Artwork modal in Pro mode", delay=1.2)
    close_active_modal(driver)

    # 22. AR Viewer in Pro mode
    ensure_settings_open(driver)
    click_text(driver, "View in AR")
    snap(driver, "22_ar_viewer_modal.png", "WebXR Augmented Reality Viewer modal in Pro mode", delay=1.2)
    close_active_modal(driver)

    # 23. Clipboard Modal in Pro mode
    ensure_settings_open(driver)
    click_text(driver, "Reference Images")
    snap(driver, "23_clipboard_modal.png", "Floating Reference Blueprint Clipboard modal in Pro mode", delay=1.2)
    close_active_modal(driver)

    # 24. Numeric Keypad (Numpad) Modal
    print("Opening Numpad modal from Select Panel...")
    try:
        ensure_rail_panel(driver, "Select")
        time.sleep(0.4)
        driver.execute_script("""
            const posBtns = Array.from(document.querySelectorAll('aside[aria-label="Select Panel"] button')).filter(b => b.textContent && (b.textContent.includes("Position") || b.textContent.includes("0.00")));
            if (posBtns.length > 0) posBtns[0].click();
        """)
        snap(driver, "24_numpad_modal.png", "On-screen Numeric Keypad Modal for precise coordinate input", delay=1.0)
        close_active_modal(driver)
    except Exception as e:
        print("Numpad note:", e)

    # 25. Navigator Sandbox
    print("Opening Navigator Sandbox in Pro mode...")
    ensure_settings_open(driver)
    try:
        driver.execute_script("""
            const sheet = document.querySelector('[aria-label="Preferences"] .overflow-y-auto');
            if (sheet) sheet.scrollTop = sheet.scrollHeight;
        """)
        time.sleep(0.3)
        click_text(driver, "Open Sandbox")
        snap(driver, "25_navigator_sandbox.png", "Navigator Sandbox developer testbench in Pro mode", delay=1.5)
        try:
            click_text(driver, "Exit Sandbox")
        except Exception:
            close_active_modal(driver)
    except Exception as e:
        print("Sandbox note:", e)

    print("\nPro Mode audit completed successfully!")
    sys.stdout.flush()

def main():
    driver = create_driver()
    try:
        run_pro_mode_audit(driver)
        print("\n==========================================")
        print("PRO MODE SCREENSHOTS COMPLETE!")
        print("==========================================")
    except Exception as e:
        print(f"\nAudit failed with exception: {e}")
        traceback.print_exc()
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
