import requests
import json
ids = [
    # "b52e3505-4757-440a-b8c4-9cde94ad5c60",
    # "43fab2ea-87eb-400c-835f-34994b34b1e9",
    # "83633016-b26f-419f-85a7-bcd1e884ffac",
    # "6120f308-deac-4894-bc8d-1d8e6195d04e",
    # "581a1b38-e721-4400-891e-98dff8dcc97b",
    # "f4ad3ac3-7a4f-49aa-891f-e777d258873a",
    # "e208d85a-f839-4757-9bc1-81fe08d63ee9",
    "3dd8e1f6-428c-4451-a331-691d5251209e"
  ]

def fix_encoding(text: str) -> str:
    try:
        return text.encode("cp1251").decode("utf-8")
    except Exception:
        return text  # если вдруг не получилось, возвращаем как есть
    
for id in ids:
  # print("code", code["old"])
  
  medaktUrl = "http://192.168.0.64:80/ismse-rest-api/api/Document/GetDocumentById"
  medakdParams = {
    "id": id,
    "userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
  }
  headers = {
    "Content-Type": "application/json"
  }
  try:
    responseMedakt = requests.get(medaktUrl, params=medakdParams, headers=headers)
    medakt = responseMedakt.json()
    # print(medakt)
    
    newMedakt = {"attributes": []}
    for atr in medakt["attributes"]:
      if atr["type"] != "State":
        if atr["type"] == "BLOB" and atr["value"] != "":
          fixed = fix_encoding(atr["value"])
          atr["value"] = fixed
        if atr["type"] == "Doc":
          atr["subDocument"] = None
        newMedakt["attributes"].append(atr)


    # print("NEW M", newMedakt)
    with open("newMedakt.json", "w", encoding="utf-8") as f:
      json.dump(newMedakt, f, ensure_ascii=False, indent=2)

    medaktPutUrl = "http://192.168.0.64:80/ismse-rest-api/api/Document/Update"
    medakdPutParams = {
      "id": id,
      "userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
    }
    # responseMedaktPut = requests.put(medaktPutUrl, params=medakdPutParams, headers=headers, json=newMedakt)
    # res = responseMedaktPut.json()
    # print("PUT", res)

  except requests.exceptions.RequestException as e:
    print("Request error:", e)
    break
  except ValueError:
    print("Не удалось распарсить JSON. Ответ:", responseMedakt.text)



