import os
import sys
import time
import tempfile
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

OUTPUT_DIR = os.path.abspath('screenshots/pro_mode')
os.makedirs(OUTPUT_DIR, exist_ok=True)

opts = Options()
opts.add_argument('--headless=new')
opts.add_argument('--no-sandbox')
opts.add_argument('--enable-webgl')
opts.add_argument(f'--user-data-dir={tempfile.mkdtemp()}')
opts.add_argument('--window-size=1600,1000')

driver = webdriver.Chrome(options=opts)
wait = WebDriverWait(driver, 10)

def snap(name, desc=""):
    path = os.path.join(OUTPUT_DIR, name)
    time.sleep(0.6)
    driver.save_screenshot(path)
    size = os.path.getsize(path) if os.path.exists(path) else 0
    print(f"[OK] Saved {name} ({size:,} bytes) - {desc}")
    return path

def js_click_by_aria_label(label):
    driver.execute_script(f'''
        const el = document.querySelector('[aria-label="{label}"]');
        if (el) {{
            el.scrollIntoView({{ block: "center", inline: "center" }});
            el.click();
        }} else {{
            throw new Error('Element not found with aria-label: {label}');
        }}
    ''')

def js_click_button_by_text(text):
    driver.execute_script(f'''
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent && b.textContent.includes("{text}"));
        if (btn) {{
            btn.scrollIntoView({{ block: "center", inline: "center" }});
            btn.click();
        }} else {{
            throw new Error('Button not found with text: {text}');
        }}
    ''')

try:
    print("Navigating to http://localhost:3000...")
    driver.get('http://localhost:3000')
    driver.execute_script('''
        localStorage.setItem("remix3d.uiMode", "pro");
        localStorage.setItem("remix3d.hasOnboarded", "true");
    ''')
    driver.refresh()
    time.sleep(2.5)

    # 01_pro_canvas_default
    snap('01_pro_canvas_default.png', "Default Pro canvas")

    # 02_rail_select_panel
    print("Opening Select panel...")
    js_click_by_aria_label('Select')
    time.sleep(0.5)
    snap('02_rail_select_panel.png', "Select panel opened")

    # 03_select_scope_model
    print("Switching scope to Model...")
    js_click_button_by_text('Model')
    time.sleep(0.4)
    snap('03_select_scope_model.png', "Scope switched to Model")

    # 04_rail_draw_panel_presets
    print("Opening Draw panel...")
    js_click_by_aria_label('Draw')
    time.sleep(0.5)
    driver.execute_script('''
        const scrollable = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
        if (scrollable) scrollable.scrollTop = 0;
    ''')
    time.sleep(0.4)
    snap('04_rail_draw_panel_presets.png', "Draw panel presets")

    # 05_draw_panel_sliders_and_smoothing
    print("Scrolling Draw panel for sliders and smoothing...")
    driver.execute_script('''
        const scrollable = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
        if (scrollable) scrollable.scrollTop = 220;
    ''')
    time.sleep(0.4)
    snap('05_draw_panel_sliders_and_smoothing.png', "Draw panel sliders & smoothing")

    print("Step 1-5 test succeeded!")
except Exception as e:
    print(f"[ERROR] {e}")
    sys.exit(1)
finally:
    driver.quit()
