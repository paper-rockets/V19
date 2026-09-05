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
    # 1. Capture in Play Mode
    driver.get("http://localhost:3000")
    driver.execute_script("""
        localStorage.setItem("remix3d.uiMode", "play");
        localStorage.setItem("remix3d.hasOnboarded", "true");
    """)
    driver.refresh()
    time.sleep(2.5)

    # Click color button on bottom dock
    driver.execute_script("document.querySelector('button[aria-label=\"Color\"]').click();")
    time.sleep(0.5)
    # Click More Colors button
    driver.execute_script("document.querySelector('button[aria-label=\"More colors\"]').click();")

    # Wait for #mody-color-studio-modal
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "mody-color-studio-modal"))
    )
    time.sleep(1.5)
    driver.save_screenshot("screenshots/play_mode/10_color_studio_modal.png")
    print("Play Mode Color Studio saved successfully!")

    # 2. Capture in Pro Mode
    driver.execute_script("""
        localStorage.setItem("remix3d.uiMode", "pro");
    """)
    driver.refresh()
    time.sleep(2.5)

    # Open Draw
    driver.execute_script("document.querySelector('button[aria-label=\"Draw\"]').click();")
    time.sleep(0.8)
    # Click Color Studio & Shaders button
    driver.execute_script("""
        const btn = Array.from(document.querySelectorAll('aside[aria-label=\"Draw Panel\"] button')).find(b => b.textContent && b.textContent.includes("Color Studio"));
        if (btn) btn.click();
    """)
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "mody-color-studio-modal"))
    )
    time.sleep(1.5)
    driver.save_screenshot("screenshots/pro_mode/08_color_studio_modal.png")
    print("Pro Mode Color Studio saved successfully!")

finally:
    driver.quit()
