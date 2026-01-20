from playwright.sync_api import sync_playwright
import time

def verify_i18n(page):
    print("Navigating to index.html...")
    page.goto("http://localhost:8080/index.html")
    page.wait_for_load_state("networkidle")
    time.sleep(1)

    page.screenshot(path="verification_index_initial.png")

    # Try forcing TR
    page.evaluate("window.changeLanguage('tr')")
    time.sleep(1)
    page.screenshot(path="verification_index_tr.png")

    # Try forcing EN
    page.evaluate("window.changeLanguage('en')")
    time.sleep(1)
    page.screenshot(path="verification_index_en.png")

    print("Navigating to lab.html...")
    page.goto("http://localhost:8080/lab.html")
    page.wait_for_load_state("networkidle")
    time.sleep(1)
    page.screenshot(path="verification_lab.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_i18n(page)
        browser.close()
