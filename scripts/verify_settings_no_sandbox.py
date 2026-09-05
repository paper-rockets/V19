from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import tempfile, time

opts = Options()
opts.add_argument("--headless=new")
opts.add_argument("--no-sandbox")
opts.add_argument("--disable-dev-shm-usage")
opts.add_argument("--enable-webgl")
opts.add_argument(f"--user-data-dir={tempfile.mkdtemp()}")
opts.add_argument("--window-size=1600,1000")

driver = webdriver.Chrome(options=opts)
try:
    # 1. Play Mode Settings bottom
    driver.get("http://localhost:3000")
    driver.execute_script("""
        localStorage.setItem("remix3d.uiMode", "play");
        localStorage.setItem("remix3d.hasOnboarded", "true");
    """)
    driver.refresh()
    time.sleep(2.5)

    driver.execute_script("document.querySelector('button[aria-label=\"Settings\"]').click();")
    time.sleep(1.0)
    driver.execute_script("""
        const sheet = document.querySelector('[aria-label=\"Preferences\"] .overflow-y-auto');
        if (sheet) sheet.scrollTop = sheet.scrollHeight;
    """)
    time.sleep(0.8)
    driver.save_screenshot("screenshots/play_mode/13_settings_sheet_bottom.png")
    print("Play Mode settings bottom saved!")

    # 2. Pro Mode Settings bottom
    driver.execute_script("""
        localStorage.setItem("remix3d.uiMode", "pro");
    """)
    driver.refresh()
    time.sleep(2.5)

    driver.execute_script("document.querySelector('button[aria-label=\"Settings\"]').click();")
    time.sleep(1.0)
    driver.execute_script("""
        const sheet = document.querySelector('[aria-label=\"Preferences\"] .overflow-y-auto');
        if (sheet) sheet.scrollTop = sheet.scrollHeight;
    """)
    time.sleep(0.8)
    driver.save_screenshot("screenshots/pro_mode/18_settings_sheet_bottom.png")
    print("Pro Mode settings bottom saved!")

finally:
    driver.quit()
