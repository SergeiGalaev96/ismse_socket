import requests
import json
from collections import defaultdict

startPage = 1

personUrl = "http://192.168.0.64:80/ismse-rest-api/api/Document/FilterDocumentsByDefId"

headers = {
    "Content-Type": "application/json"
}

payloadPerson = {}

page = startPage

# 🔥 здесь храним ВСЕ IIN
iin_index = defaultdict(list)

while True:
    personParams = {
        "defId": "6052978A-1ECB-4F96-A16B-93548936AFC0",
        "size": 500,          # можно 50–100
        "page": page,
        "userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
    }

    try:
        responsePerson = requests.post(
            personUrl,
            params=personParams,
            headers=headers,
            json=payloadPerson,
            timeout=30
        )

        responsePerson.raise_for_status()
        persons = responsePerson.json()

        if not persons:
            print("END: данных больше нет")
            break

        docs = persons if isinstance(persons, list) else [persons]

        print(f"Страница {page}, документов: {len(docs)}")

        for doc in docs:
            attrs = {a["name"]: a.get("value") for a in doc.get("attributes", [])}

            iin = attrs.get("IIN")
            if not iin:
                continue  # пустые / None не учитываем

            iin_index[iin].append({
                "doc_id": doc.get("id"),
                "iin": attrs.get("IIN"),
                "page": page
            })

        page += 1

    except requests.exceptions.RequestException as e:
        print("Request error:", e)
        break
    except ValueError:
        print("Не удалось распарсить JSON")
        print(responsePerson.text)
        break

# 🔍 Оставляем ТОЛЬКО дубликаты
duplicates = {
    iin: docs
    for iin, docs in iin_index.items()
    if len(docs) > 1
}

print(f"Всего IIN: {len(iin_index)}")
print(f"Дубликатов IIN: {len(duplicates)}")

# 💾 Сохраняем результат
with open("iin_duplicates.json", "w", encoding="utf-8") as f:
    json.dump(duplicates, f, ensure_ascii=False, indent=2)

print("Файл iin_duplicates.json сохранён")