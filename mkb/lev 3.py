from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import json
import os
import time

def parse_subsections(driver, link):
    """Парсит подзаголовки на странице."""
    print(f"Обрабатываю: {link}")
    try:
        driver.get(link)
        time.sleep(2)

        main_elem = driver.find_element(By.CSS_SELECTOR, "main#cnt")

        # Удаляем ненужные div'ы
        driver.execute_script("""
            const rm = id => { const el = document.getElementById(id); if (el) el.remove(); };
            rm("add_info");
            rm("add_info_toggle");
        """)

        subsections = {}
        h2_divs = main_elem.find_elements(By.CSS_SELECTOR, "div.h2")
        for div in h2_divs:
            raw_title = div.text.strip().replace("\n", " ")  # убираем переносы
            a_tags = div.find_elements(By.TAG_NAME, "a")
            href = a_tags[0].get_attribute("href") if a_tags else ""
            subsections[raw_title] = {"link": href}

        return subsections

    except Exception as e:
        print(f"Ошибка при обработке {link}: {e}")
        return {}

def main():
    input_path = r"D:\mkb\data.json"
    output_path = r"D:\mkb\data_full_nested.json"

    with open(input_path, "r", encoding="utf-8") as f:
        base_data = json.load(f)

    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        full_result = {}

        for top_title, top_data in base_data.items():
            top_link = top_data.get("link", "")
            if not top_link:
                continue

            print(f"\n🔷 {top_title}")
            second_level = parse_subsections(driver, top_link)

            # Для каждого подраздела получаем ещё один уровень
            for sub_title, sub_data in second_level.items():
                sub_link = sub_data.get("link", "")
                if not sub_link:
                    continue

                print(f"  🔸 {sub_title}")
                third_level = parse_subsections(driver, sub_link)
                sub_data["subsections"] = third_level

            # Формируем итог
            full_result[top_title] = {
                "link": top_link,
                "subsections": second_level
            }

        # Сохраняем
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(full_result, f, ensure_ascii=False, indent=2)

        print(f"\n✅ Полный результат сохранён в {output_path}")

    finally:
        driver.quit()

if __name__ == "__main__":
    main()
