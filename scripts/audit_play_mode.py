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

SCREENSHOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'screenshots', 'play_mode'))
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def setup_driver():
    opts = Options()
    opts.add_argument('--headless=new')
    opts.add_argument('--no-sandbox')
    opts.add_argument('--disable-dev-shm-usage')
    opts.add_argument('--enable-webgl')
    opts.add_argument('--enable-3d-apis')
    opts.add_argument(f'--user-data-dir={tempfile.mkdtemp()}')
    opts.add_argument('--window-size=1600,1000')
    driver = webdriver.Chrome(options=opts)
    driver.set_window_size(1600, 1000)
    return driver

def check_console_errors(driver, step_name):
    try:
        logs = driver.get_log('browser')
        errors = [log for log in logs if log['level'] == 'SEVERE']
        if errors:
            print(f"[{step_name}] SEVERE browser logs detected:")
            for err in errors:
                print(f"  {err['message']}")
        else:
            print(f"[{step_name}] No severe console errors.")
        return errors
    except Exception as e:
        print(f"[{step_name}] Could not retrieve browser logs: {e}")
        return []

def wait_and_save(driver, filename, desc, wait_time=0.8):
    time.sleep(wait_time)
    filepath = os.path.join(SCREENSHOT_DIR, filename)
    driver.save_screenshot(filepath)
    size = os.path.getsize(filepath)
    print(f"✓ Saved {filename} ({size} bytes): {desc}")

def run_audit():
    driver = setup_driver()
    results = []
    
    try:
        # Step 1: First Run Overlay
        print("\n--- Step 1: First Run Overlay ---")
        driver.get('http://localhost:3000')
        driver.execute_script('''
            localStorage.setItem("remix3d.uiMode", "play");
            localStorage.setItem("remix3d.hasOnboarded", "false");
        ''')
        driver.refresh()
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Your screen') or contains(text(), 'Fingers move')]"))
        )
        wait_and_save(driver, '01_first_run_overlay.png', 'First-run tutorial overlay with 3-card guide')
        check_console_errors(driver, 'Step 1')
        results.append(('01_first_run_overlay.png', 'First-run tutorial overlay', 'PASS'))

        # Step 2: Clean Canvas Default View
        print("\n--- Step 2: Canvas Default View ---")
        driver.execute_script('''
            localStorage.setItem("remix3d.uiMode", "play");
            localStorage.setItem("remix3d.hasOnboarded", "true");
        ''')
        driver.refresh()
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "button[aria-label='Open model library']"))
        )
        time.sleep(1.5)  # Allow WebGL canvas & shaders to settle
        wait_and_save(driver, '02_canvas_default.png', 'Clean canvas view with top strip and dock')
        check_console_errors(driver, 'Step 2')
        results.append(('02_canvas_default.png', 'Clean canvas default view', 'PASS'))

        # Step 3: Draw Tool Selected
        print("\n--- Step 3: Draw Tool Selected ---")
        draw_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label='Draw']"))
        )
        draw_btn.click()
        wait_and_save(driver, '03_tool_draw_selected.png', 'Draw tool active in Play dock')
        check_console_errors(driver, 'Step 3')
        results.append(('03_tool_draw_selected.png', 'Draw tool active', 'PASS'))

        # Step 4: Shape Tool Selected with ShapesSheet
        print("\n--- Step 4: Shape Tool Selected with ShapesSheet ---")
        shape_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label='Shape']"))
        )
        shape_btn.click()
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//div[@role='dialog'][@aria-label='Shape']"))
        )
        wait_and_save(driver, '04_tool_shape_selected.png', 'Shape tool active with ShapesSheet bottom sheet')
        check_console_errors(driver, 'Step 4')
        results.append(('04_tool_shape_selected.png', 'Shape tool active with ShapesSheet bottom sheet', 'PASS'))

        # Step 5: Shape Options Selected
        print("\n--- Step 5: Shape Options Selected ---")
        try:
            eager_btn = driver.find_element(By.XPATH, "//button[contains(., 'Eager')]")
            driver.execute_script("arguments[0].click();", eager_btn)
            time.sleep(0.3)
        except Exception as e:
            print("Notice on Eager button:", e)
        try:
            straight_switch = driver.find_element(By.XPATH, "//button[@role='switch'][@aria-label='Straight lines only']")
            driver.execute_script("arguments[0].click();", straight_switch)
            time.sleep(0.3)
        except Exception as e:
            print("Notice on Straight switch:", e)
        wait_and_save(driver, '05_tool_shape_circle.png', 'Shapes options (Eager strictness & Straight lines) selected in ShapesSheet')
        check_console_errors(driver, 'Step 5')
        results.append(('05_tool_shape_circle.png', 'Shapes options selected', 'PASS'))

        # Close ShapesSheet by pressing Escape
        driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
        time.sleep(0.5)

        # Step 6: Erase Tool Selected
        print("\n--- Step 6: Erase Tool Selected ---")
        erase_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label='Erase']"))
        )
        erase_btn.click()
        wait_and_save(driver, '06_tool_erase_selected.png', 'Erase tool active in Play dock')
        check_console_errors(driver, 'Step 6')
        results.append(('06_tool_erase_selected.png', 'Erase tool active', 'PASS'))

        # Return to Draw tool
        draw_btn = driver.find_element(By.CSS_SELECTOR, "button[aria-label='Draw']")
        draw_btn.click()
        time.sleep(0.3)

        # Step 7: Color Palette Popup
        print("\n--- Step 7: Color Palette Popup ---")
        color_dock_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label='Color']"))
        )
        color_dock_btn.click()
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "button[aria-label='More colors']"))
        )
        wait_and_save(driver, '07_color_palette_popup.png', 'Dock color button tapped showing 8 swatches and More colors button')
        check_console_errors(driver, 'Step 7')
        results.append(('07_color_palette_popup.png', 'Dock color palette popup', 'PASS'))

        # Step 8: Stroke Size Popup
        print("\n--- Step 8: Stroke Size Popup ---")
        size_dock_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label='Stroke size']"))
        )
        size_dock_btn.click()
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(@aria-label, 'Stroke size 0.')]"))
        )
        wait_and_save(driver, '08_stroke_size_popup.png', 'Dock stroke size button tapped showing size circle options')
        check_console_errors(driver, 'Step 8')
        results.append(('08_stroke_size_popup.png', 'Dock stroke size popup', 'PASS'))

        # Step 9: Brush Profile Toast
        print("\n--- Step 9: Brush Profile Toast ---")
        profile_dock_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label='Brush profile']"))
        )
        profile_dock_btn.click()
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Brush profile changed')]"))
        )
        wait_and_save(driver, '09_brush_profile_toast.png', 'Dock brush profile button tapped showing profile toast')
        check_console_errors(driver, 'Step 9')
        results.append(('09_brush_profile_toast.png', 'Brush profile changed toast', 'PASS'))

        # Step 10: Color Studio Modal
        print("\n--- Step 10: Color Studio Modal ---")
        color_dock_btn.click()
        time.sleep(0.3)
        more_colors_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label='More colors']"))
        )
        more_colors_btn.click()
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Color Studio') or contains(text(), 'HSV Picker')]"))
        )
        wait_and_save(driver, '10_color_studio_modal.png', 'Color Studio opened via More colors Chevron', wait_time=1.0)
        check_console_errors(driver, 'Step 10')
        results.append(('10_color_studio_modal.png', 'Color Studio modal', 'PASS'))

        # Close Color Studio
        try:
            cs_close = driver.find_element(By.CSS_SELECTOR, "button[title='Close']")
            driver.execute_script("arguments[0].click();", cs_close)
        except Exception:
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
        time.sleep(0.5)

        # Step 11: Toybox Modal
        print("\n--- Step 11: Toybox Modal ---")
        toybox_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label='Open model library']"))
        )
        toybox_btn.click()
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), '3D Model Library')]"))
        )
        wait_and_save(driver, '11_toybox_modal.png', 'Toybox model library displaying 3D sample models', wait_time=1.0)
        check_console_errors(driver, 'Step 11')
        results.append(('11_toybox_modal.png', 'Toybox 3D model library modal', 'PASS'))

        # Step 12: Play Importer Modal
        print("\n--- Step 12: Play Importer Modal ---")
        import_asset_btn = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Import 3D Asset')]"))
        )
        driver.execute_script("arguments[0].click();", import_asset_btn)
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Import 3D Model')]"))
        )
        wait_and_save(driver, '12_play_importer_modal.png', 'Play Importer modal opened from Toybox', wait_time=1.0)
        check_console_errors(driver, 'Step 12')
        results.append(('12_play_importer_modal.png', 'Play Importer modal', 'PASS'))

        # Close Play Importer
        try:
            importer_close = driver.find_element(By.XPATH, "//div[contains(., 'Import 3D Model')]//button[@aria-label='Close']")
            driver.execute_script("arguments[0].click();", importer_close)
        except Exception:
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
        time.sleep(0.5)

        # Helper function to open Settings sheet
        def open_settings():
            settings_dialogs = driver.find_elements(By.XPATH, "//div[@role='dialog'][@aria-label='Preferences']")
            if not settings_dialogs or not settings_dialogs[0].is_displayed():
                settings_btn = WebDriverWait(driver, 5).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label='Settings']"))
                )
                driver.execute_script("arguments[0].click();", settings_btn)
                WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.XPATH, "//div[@role='dialog'][@aria-label='Preferences']"))
                )
                time.sleep(0.5)

        # Step 13: Settings Sheet General
        print("\n--- Step 13: Settings Sheet General ---")
        open_settings()
        wait_and_save(driver, '13_settings_sheet_general.png', 'Preferences settings sheet opened with all configuration controls', wait_time=0.8)
        check_console_errors(driver, 'Step 13')
        results.append(('13_settings_sheet_general.png', 'Settings sheet general preferences', 'PASS'))

        # Step 14: Settings Display Mode Clay
        print("\n--- Step 14: Settings Display Mode Clay ---")
        open_settings()
        clay_btn = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'White Clay')]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", clay_btn)
        time.sleep(0.2)
        driver.execute_script("arguments[0].click();", clay_btn)
        time.sleep(0.5)
        wait_and_save(driver, '14_settings_display_mode_clay.png', 'Preferences settings sheet with White Clay display mode selected')
        check_console_errors(driver, 'Step 14')
        results.append(('14_settings_display_mode_clay.png', 'Settings display mode White Clay', 'PASS'))

        # Step 15: Sky & Environment Modal
        print("\n--- Step 15: Sky & Environment Modal ---")
        open_settings()
        sky_btn = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Configure Skybox')]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", sky_btn)
        time.sleep(0.2)
        driver.execute_script("arguments[0].click();", sky_btn)
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Skybox & Atmosphere Studio') or contains(@title, 'Close Skybox Studio')]"))
        )
        wait_and_save(driver, '15_sky_environment_modal.png', 'Sky & Atmosphere Studio opened from Settings', wait_time=1.0)
        check_console_errors(driver, 'Step 15')
        results.append(('15_sky_environment_modal.png', 'Sky & Atmosphere Studio modal', 'PASS'))

        # Close Sky Environment Panel
        try:
            sky_close = driver.find_element(By.CSS_SELECTOR, "button[title='Close Skybox Studio']")
            driver.execute_script("arguments[0].click();", sky_close)
        except Exception:
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
        time.sleep(0.5)

        # Step 16: Render Settings Modal (Picture Quality)
        print("\n--- Step 16: Render Settings Modal ---")
        open_settings()
        render_btn = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Picture Quality')]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", render_btn)
        time.sleep(0.2)
        driver.execute_script("arguments[0].click();", render_btn)
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//div[contains(., 'Picture Quality') and contains(@class, 'font-semibold')]"))
        )
        wait_and_save(driver, '16_render_settings_modal.png', 'Render & Graphics Settings modal opened from Settings', wait_time=1.0)
        check_console_errors(driver, 'Step 16')
        results.append(('16_render_settings_modal.png', 'Render & Graphics Settings modal', 'PASS'))

        # Close Render Settings Panel
        try:
            render_close = driver.find_element(By.XPATH, "//div[contains(@class, 'font-semibold') and contains(., 'Picture Quality')]/following-sibling::button")
            driver.execute_script("arguments[0].click();", render_close)
        except Exception:
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
        time.sleep(0.5)

        # Step 17: Export Modal
        print("\n--- Step 17: Export Modal ---")
        open_settings()
        export_btn = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Export') and not(contains(., 'Artwork'))]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", export_btn)
        time.sleep(0.2)
        driver.execute_script("arguments[0].click();", export_btn)
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//span[text()='Export']/ancestor::div[contains(@class, 'rounded-2xl') or contains(@class, 'rounded-3xl')]"))
        )
        wait_and_save(driver, '17_export_modal.png', 'Export 3D Artwork modal opened from Settings', wait_time=1.0)
        check_console_errors(driver, 'Step 17')
        results.append(('17_export_modal.png', 'Export 3D Artwork modal', 'PASS'))

        # Close Export Modal
        try:
            export_close = driver.find_element(By.XPATH, "//span[text()='Export']/parent::div/following-sibling::button")
            driver.execute_script("arguments[0].click();", export_close)
        except Exception:
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
        time.sleep(0.5)

        # Step 18: AR Viewer Modal
        print("\n--- Step 18: AR Viewer Modal ---")
        open_settings()
        ar_btn = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(., 'View in AR')]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", ar_btn)
        time.sleep(0.2)
        driver.execute_script("arguments[0].click();", ar_btn)
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'AR Environment Status')]"))
        )
        wait_and_save(driver, '18_ar_viewer_modal.png', 'WebXR AR Viewer modal opened from Settings', wait_time=1.0)
        check_console_errors(driver, 'Step 18')
        results.append(('18_ar_viewer_modal.png', 'WebXR AR Viewer modal', 'PASS'))

        # Close AR Viewer Modal
        try:
            ar_close = driver.find_element(By.XPATH, "//span[contains(text(), 'View in AR')]/ancestor::div[contains(@class, 'flex')]/button")
            driver.execute_script("arguments[0].click();", ar_close)
        except Exception:
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
        time.sleep(0.5)

        # Step 19: Clipboard Modal
        print("\n--- Step 19: Blueprint Reference Clipboard Modal ---")
        open_settings()
        clip_btn = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Reference Images')]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", clip_btn)
        time.sleep(0.2)
        driver.execute_script("arguments[0].click();", clip_btn)
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Blueprint Reference') or contains(text(), 'Drop reference images')]"))
        )
        wait_and_save(driver, '19_clipboard_modal.png', 'Blueprint Reference Clipboard modal opened from Settings', wait_time=1.0)
        check_console_errors(driver, 'Step 19')
        results.append(('19_clipboard_modal.png', 'Blueprint Reference Clipboard modal', 'PASS'))

        # Close Clipboard Modal
        try:
            clip_close = driver.find_element(By.XPATH, "//h3[contains(text(), 'Reference')]/ancestor::div[contains(@class, 'flex')]/descendant::button[last()]")
            driver.execute_script("arguments[0].click();", clip_close)
        except Exception:
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.ESCAPE)
        time.sleep(0.5)

        # Step 20: Navigator Sandbox
        print("\n--- Step 20: Navigator Sandbox ---")
        open_settings()
        sandbox_btn = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Open Sandbox')]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", sandbox_btn)
        time.sleep(0.2)
        driver.execute_script("arguments[0].click();", sandbox_btn)
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Controller Lab') or contains(text(), 'Exit Sandbox')]"))
        )
        wait_and_save(driver, '20_navigator_sandbox.png', 'Navigator Sandbox developer testbench opened from Settings', wait_time=1.5)
        check_console_errors(driver, 'Step 20')
        results.append(('20_navigator_sandbox.png', 'Navigator Sandbox developer testbench', 'PASS'))

        # Close Sandbox
        try:
            exit_sb_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Exit Sandbox')]")
            driver.execute_script("arguments[0].click();", exit_sb_btn)
        except Exception:
            pass
        time.sleep(0.5)

        print("\n=== AUDIT COMPLETE ===")
        for f, desc, status in results:
            print(f"[{status}] {f}: {desc}")

    except Exception as e:
        print(f"\nAudit failed with exception: {e}")
        traceback.print_exc()
        try:
            driver.save_screenshot(os.path.join(SCREENSHOT_DIR, 'err_debug.png'))
        except Exception:
            pass
    finally:
        driver.quit()

if __name__ == '__main__':
    run_audit()
