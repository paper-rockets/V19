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

try:
    print("Navigating to http://localhost:3000...")
    driver.get('http://localhost:3000')
    driver.execute_script('''
        localStorage.setItem("remix3d.uiMode", "pro");
        localStorage.setItem("remix3d.hasOnboarded", "true");
    ''')
    driver.refresh()
    time.sleep(2.5)

    # Open Studio Illumination modal
    print("Opening Studio Illumination modal...")
    js_click_by_aria_label('Studio Illumination')
    time.sleep(0.8)
    snap('06_studio_illumination_clean.png', "Clean Studio Illumination Modal (No overlap, small buttons)")

    # Open Draw panel to inspect BrushShapeGlyph 3D sculpt marks
    print("Opening Draw panel...")
    js_click_by_aria_label('Draw')
    time.sleep(0.8)
    snap('07_draw_panel_sculpt_marks.png', "Draw panel with 3D sculpt mark glyphs")

    # Switch to Dark Mode and capture Studio Illumination modal in Dark mode
    print("Capturing Dark mode Studio Illumination...")
    driver.execute_script('''
        localStorage.setItem("mody_theme", "dark");
        document.documentElement.classList.add("dark");
    ''')
    driver.refresh()
    time.sleep(2.0)
    js_click_by_aria_label('Studio Illumination')
    time.sleep(0.8)
    snap('08_studio_illumination_dark.png', "Studio Illumination Modal in Dark Mode")

    print("[SUCCESS] All screenshots captured successfully!")
except Exception as e:
    print(f"[ERROR] {e}")
    sys.exit(1)
finally:
    driver.quit()
