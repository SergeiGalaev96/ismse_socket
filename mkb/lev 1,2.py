from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import json
import re
import time
import os

def parse_subsections(driver, url):
    driver.get(url)
    time.sleep(2)

    # Удаляем div с id="add_info" и id="add_info_toggle"
    driver.execute_script("""
        var addInfo = document.getElementById('add_info');
        if(addInfo) addInfo.remove();
        var addInfoToggle = document.getElementById('add_info_toggle');
        if(addInfoToggle) addInfoToggle.remove();
    """)
    time.sleep(0.5)

    main_elem = driver.find_element(By.CSS_SELECTOR, "main#cnt")
    div_h2s = main_elem.find_elements(By.CSS_SELECTOR, "div.h2")

    subsections = {}

    for div_h2 in div_h2s:
        title = div_h2.text.strip()
        try:
            a_tag = div_h2.find_element(By.TAG_NAME, "a")
            link = a_tag.get_attribute("href")
        except NoSuchElementException:
            link = ""

        subsections[title] = {"link": link}

    return subsections

def main():
    url = "https://mkb-10.com/"
    output_path = r"D:\mkb\data.json"

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        driver.get(url)
        time.sleep(3)

        main_elem = driver.find_element(By.CSS_SELECTOR, "main#cnt")
        p_elements = main_elem.find_elements(By.TAG_NAME, "p")

        data = []

        # Сначала собираем текст и ссылки в памяти
        for i in range(0, len(p_elements), 2):
            p1 = p_elements[i]
            p2 = p_elements[i + 1] if i + 1 < len(p_elements) else None

            text1 = p1.text.strip()
            text2 = p2.text.strip() if p2 else ""

            combined_text = text1 + " " + text2

            link = ""
            a_tags_p1 = p1.find_elements(By.TAG_NAME, "a")
            if a_tags_p1:
                link = a_tags_p1[0].get_attribute("href")
            elif p2:
                a_tags_p2 = p2.find_elements(By.TAG_NAME, "a")
                if a_tags_p2:
                    link = a_tags_p2[0].get_attribute("href")

            data.append((combined_text, link))

        result = {}

        # Теперь для каждого пункта вызываем парсер вложенных страниц (если ссылка есть)
        for combined_text, link in data:
            subsections = {}
            if link:
                subsections = parse_subsections(driver, link)
            result[combined_text] = {
                "link": link,
                "subsections": subsections
            }

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        print(f"Сохранено в {output_path}")

    finally:
        driver.quit()
if __name__ == "__main__":
    main()
