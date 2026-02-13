from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import json
import os
import time

def parse_subsections(driver, link):
    """Парсит div.h2 внутри страницы — заголовки и ссылки."""
    print(f"  🔗 {link}")
    try:
        driver.get(link)
        time.sleep(2)

        main_elem = driver.find_element(By.CSS_SELECTOR, "main#cnt")

        # Удаляем div'ы с лишней инфой
        driver.execute_script("""
            const rm = id => { const el = document.getElementById(id); if (el) el.remove(); };
            rm("add_info");
            rm("add_info_toggle");
        """)

        subsections = {}
        h2_divs = main_elem.find_elements(By.CSS_SELECTOR, "div.h2")
        for div in h2_divs:
            raw_title = div.text.strip().replace("\n", " ")
            a_tags = div.find_elements(By.TAG_NAME, "a")
            href = a_tags[0].get_attribute("href") if a_tags else ""
            subsections[raw_title] = {"link": href}

        return subsections

    except Exception as e:
        print(f"    ❌ Ошибка при {link}: {e}")
        return {}

def main():
    input_path = r"D:\mkb\data.json"
    output_path = r"D:\mkb\data_fully_nested.json"

    with open(input_path, "r", encoding="utf-8") as f:
        base_data = json.load(f)

    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        final_result = {}

        for lvl1_title, lvl1_data in base_data.items():
            lvl1_link = lvl1_data.get("link", "")
            if not lvl1_link:
                continue

            print(f"\n🔷 {lvl1_title}")
            lvl2 = parse_subsections(driver, lvl1_link)

            for lvl2_title, lvl2_data in lvl2.items():
                lvl2_link = lvl2_data.get("link", "")
                if not lvl2_link:
                    continue

                print(f"  🔶 {lvl2_title}")
                lvl3 = parse_subsections(driver, lvl2_link)

                for lvl3_title, lvl3_data in lvl3.items():
                    lvl3_link = lvl3_data.get("link", "")
                    if not lvl3_link:
                        continue

                    print(f"    🔸 {lvl3_title}")
                    lvl4 = parse_subsections(driver, lvl3_link)
                    lvl3_data["subsections"] = lvl4

                lvl2_data["subsections"] = lvl3

            final_result[lvl1_title] = {
                "link": lvl1_link,
                "subsections": lvl2
            }

        # Сохраняем всё
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(final_result, f, ensure_ascii=False, indent=2)

        print(f"\n✅ Финальный результат сохранён в {output_path}")

    finally:
        driver.quit()

if __name__ == "__main__":
    main()
