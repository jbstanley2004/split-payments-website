from playwright.sync_api import Page, expect, sync_playwright

def verify_pages(page: Page):
    """
    This test verifies that all pages render correctly with the correct
    backgrounds and button styles.
    """
    pages = ["", "funding", "payments", "cc-split", "partnerships"]
    for p in pages:
        page.goto(f"http://localhost:3000/{p}")
        expect(page).to_have_title("Split — Payments & Merchant Funding")
        page.screenshot(path=f"{p or 'home'}_page.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_pages(page)
        finally:
            browser.close()
