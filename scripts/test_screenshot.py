from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import tempfile, time

opts = Options()
opts.add_argument('--headless=new')
opts.add_argument('--no-sandbox')
opts.add_argument('--enable-webgl')
opts.add_argument(f'--user-data-dir={tempfile.mkdtemp()}')
opts.add_argument('--window-size=1600,1000')

driver = webdriver.Chrome(options=opts)
try:
    driver.get('http://localhost:3000')
    driver.execute_script('localStorage.setItem("remix3d.uiMode", "play"); localStorage.setItem("remix3d.hasOnboarded", "true");')
    driver.refresh()
    time.sleep(2)
    driver.save_screenshot('screenshots/play_mode/00_initial_canvas.png')
    print('Screenshot saved successfully!')
finally:
    driver.quit()
