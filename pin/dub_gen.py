import requests
import json
from datetime import datetime

FILENAME = "iin_duplicates.json"

personUrl = "http://192.168.0.64:80/ismse-rest-api/api/Document/GetDocumentById"

headers = {
    "Content-Type": "application/json"
}

user_id = "dced7bea-8a93-4baf-964b-232e75a758c5"

# 📂 читаем файл
with open(FILENAME, "r", encoding="utf-8") as f:
    duplicates = json.load(f)

for iin, docs in duplicates.items():
    print(f"\nIIN: {iin}, документов: {len(docs)}")

    for item in docs:
        doc_id = item.get("doc_id")
        if not doc_id:
            continue

        params = {
            "id": doc_id,
            "userId": user_id
        }

        try:
            response = requests.get(personUrl, params=params, headers=headers, timeout=30)

            response.raise_for_status()
            person = response.json()

            print("DOC ID:", doc_id)
            attrs = {a["name"]: a.get("value") for a in person.get("attributes", [])}

            first_Name = attrs.get("First_Name")
            last_Name = attrs.get("Last_Name")
            passportNo = attrs.get("PassportNo")
            
            
            print("first_Name:", first_Name)
            print("last_Name:", last_Name)
            print("passportNo:", passportNo)

            medaktUrl = "http://192.168.0.64:80/ismse-rest-api/api/Document/FilterDocumentsByDefIdState"
            medakdParams = {
                # "defId": "5FDE415F-DB00-43B4-BA6E-FE439CFF6DA0", # Детский
                "defId": "B4DDDC00-9EA9-4AD4-9C4F-498E87AA9828",  # Взрослый
                "stateTypeId": "32062CB7-C31C-4AFB-ADF3-F9F9AEEFCE59",
                "size": 10,
                "page": 1,
                "userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
            }
            payloadMedakt = {
                "attributes": [
                {
                    "name": "Person",
                    "type": "Doc",
                    "docDef": "6052978A-1ECB-4F96-A16B-93548936AFC0",
                    "subDocument": {
                        "attributes": [
                            {
                                "name": "First_Name",
                                "type": "Text",
                                "value": first_Name
                            },
                            {
                                "name": "Last_Name",
                                "type": "Text",
                                "value": last_Name
                            },
                            {
                                "name": "PassportNo",
                                "type": "Text",
                                "value": passportNo
                            }
                        ]
                    }

                }
            ]}

            responseMedakt = requests.post(medaktUrl, params=medakdParams, headers=headers, json=payloadMedakt, timeout=30)

            medakts = responseMedakt.json()

            print("MEDAKTS ADULT", len(medakts))

            if not medakts:
                # print("No Adult MEDAKTS")
                medakdParams["defId"] = "5FDE415F-DB00-43B4-BA6E-FE439CFF6DA0"
                responseMedakt = requests.post(medaktUrl, params=medakdParams, headers=headers, json=payloadMedakt, timeout=30)
                medakts = responseMedakt.json()
                print("MEDAKTS CHILD", len(medakts))
                if not medakts:
                    print("No Child MEDAKTS")

            if medakts:
                # if len(medakts) > 1:
                #     print("More than 1")
                # else:
                medakt = medakts[0]
                attrs = {a["name"]: a.get("value") for a in medakt.get("attributes", [])}
                subDocs = {a["name"]: a.get("subDocument") for a in medakt.get("attributes", [])}

                Region = attrs.get("Region")
                print("Region", Region)

                District = attrs.get("District")
                print("District", District)

                Person = subDocs.get("Person")
                personId = attrs.get("Person")
                # print("Person", Person)

                PersonAtrs = Person.get("attributes")

                nrszPayload = {}
                ismsePayload = []
                for atr in PersonAtrs:
                    value = atr.get("value")
                    name = atr.get("name")
                    type = atr.get("type")
                    if type == "DateTime":

                        nrszPayload[name] = datetime.strptime(value, "%d.%m.%Y %H:%M:%S").strftime("%Y-%m-%d")
                        ismseAtr = {
                            "name": name,
                            "type": type,
                            "value": datetime.strptime(value, "%d.%m.%Y %H:%M:%S").strftime("%d.%m.%Y")
                        }
                        ismsePayload.append(ismseAtr)
                        
                    else:
                        if type != "State" and name != "IIN":
                            if name != "SIN" and name != "INN":
                                nrszPayload[name] = value

                            ismseAtr = {
                                "name": name,
                                "type": type,
                                "value": value
                            }
                            ismsePayload.append(ismseAtr)
                # print("nrszPayload", nrszPayload)
                print("ismsePayload", ismsePayload)

                nrszSearchUrl = "http://192.168.0.68:5000/api/NrszPersons/FindPersons"
                nrszCreateUrl = "http://192.168.0.68:5000/api/NrszPersons/AddNewPerson"

                nrszParams = {
                    "regionNo": Region,
                    "districtNo": District
                }

                try:
                    # 🔍 1. SEARCH
                    responseNRSZ = requests.post(
                        nrszSearchUrl,
                        params=nrszParams,
                        headers=headers,
                        json=nrszPayload,
                        timeout=30
                    )

                    responseNRSZ.raise_for_status()
                    personNRSZ = responseNRSZ.json()

                    if personNRSZ.get("successFlag") is True:
                        data = personNRSZ.get("data") or {}
                        persons = data.get("Persons") or []

                        if not persons:
                            raise ValueError("Search successFlag=true, but Persons is empty")

                        person = persons[0]
                        newPIN = person.get("iin")
                        print("newPIN (found):", newPIN)

                    else:
                        print("Person not found in NRSZ, creating...")

                        # ➕ 2. CREATE
                        responseNRSZ = requests.post(
                            nrszCreateUrl,
                            params=nrszParams,
                            headers=headers,
                            json=nrszPayload,
                            timeout=30
                        )

                        responseNRSZ.raise_for_status()
                        personNRSZ = responseNRSZ.json()

                        if personNRSZ.get("successFlag") is not True:
                            print("ERROR CREATE PERSON NRSZ:", personNRSZ.get("errorMessages"))
                            continue

                        data = personNRSZ.get("data") or {}
                        newPIN = data.get("ResultPIN")
                        print("newPIN (created):", newPIN)

                    # 🔁 3. UPDATE ISMSE (одинаково для search и create)
                    ismsePIN = {
                        "name": "IIN",
                        "type": "Text",
                        "value": newPIN
                    }
                    ismsePayload.append(ismsePIN)

                    updUrl = "http://192.168.0.64:80/ismse-rest-api/api/Document/Update"
                    updParams = {
                        "id": personId,
                        "userId": user_id
                    }
                    updPayload = {"attributes": ismsePayload}

                    responseUpdateISMSE = requests.put(
                        updUrl,
                        params=updParams,
                        headers=headers,
                        json=updPayload,
                        timeout=30
                    )

                    if responseUpdateISMSE.status_code in (200, 204):
                        print("PIN UPDATED in ISMSE")
                    else:
                        print("UPDATE ISMSE ERROR:", responseUpdateISMSE.text)

                except requests.exceptions.RequestException as err:
                    print("Request NRSZ error:", err)
                except ValueError as err:
                    print("Logic error:", err)



        except requests.exceptions.RequestException as e:
            print("Request error:", e)
        except ValueError:
            print("JSON parse error:", response.text)
