import requests
import json
from datetime import datetime

# =====================
# CONFIG
# =====================
FILENAME = "iin_duplicates.json"

ISMSE_URL = "http://192.168.0.64:80/ismse-rest-api"
NRSZ_URL = "http://192.168.0.68:5000/api/NrszPersons"

headers = {"Content-Type": "application/json"}
user_id = "dced7bea-8a93-4baf-964b-232e75a758c5"


# =====================
# HELPERS
# =====================
def parse_date_for_nrsz(value):
    return datetime.strptime(value, "%d.%m.%Y %H:%M:%S").strftime("%Y-%m-%d")


# =====================
# LOAD INPUT
# =====================
with open(FILENAME, "r", encoding="utf-8") as f:
    duplicates = json.load(f)


# =====================
# MAIN LOOP
# =====================
for iin, docs in duplicates.items():
    print(f"\nIIN GROUP: {iin}, docs: {len(docs)}")

    for item in docs:
        doc_id = item.get("doc_id")
        if not doc_id:
            continue

        try:
            # =====================
            # 1️⃣ GET DOCUMENT (ISMSE)
            # =====================
            response = requests.get(
                f"{ISMSE_URL}/api/Document/GetDocumentById",
                params={"id": doc_id, "userId": user_id},
                headers=headers,
                timeout=30
            )
            response.raise_for_status()
            document = response.json()

            attrs = {a["name"]: a.get("value") for a in document.get("attributes", [])}

            first_name = attrs.get("First_Name")
            last_name = attrs.get("Last_Name")
            passportNo = attrs.get("PassportNo")
            sex = attrs.get("Sex")
            dob_raw = attrs.get("Date_of_Birth")

            if not all([first_name, last_name, passportNo, sex, dob_raw]):
                print("❌ Missing base person attributes")
                continue

            # =====================
            # 2️⃣ NRSZ SEARCH (SHORT PAYLOAD)
            # =====================
            nrsz_search_payload = {
                "First_Name": first_name,
                "Last_Name": last_name,
                "Sex": sex,
                "Date_of_Birth": parse_date_for_nrsz(dob_raw)
            }

            response = requests.post(
                f"{NRSZ_URL}/FindPersons",
                headers=headers,
                json=nrsz_search_payload,
                timeout=30
            )
            response.raise_for_status()
            nrsz_resp = response.json()

            persons = nrsz_resp.get("data", {}).get("Persons", [])

            # =====================
            # 🟢 FOUND IN NRSZ
            # =====================
            if persons:
                new_iin = persons[0].get("iin")
                print("🟢 NRSZ FOUND:", new_iin)

            # =====================
            # 🔴 NOT FOUND → MEDAKT → CREATE NRSZ
            # =====================
            else:
                print("🔴 NRSZ NOT FOUND → SEARCH MEDAKT")

                medakt_url = f"{ISMSE_URL}/api/Document/FilterDocumentsByDefIdState"
                medakt_params = {
                    "defId": "B4DDDC00-9EA9-4AD4-9C4F-498E87AA9828",  # adult
                    "stateTypeId": "32062CB7-C31C-4AFB-ADF3-F9F9AEEFCE59",
                    "size": 1,
                    "page": 1,
                    "userId": user_id
                }

                # ❗ PAYLOAD ОСТАВЛЕН КАК ТЫ ПРОСИЛ
                medakt_payload = {
                    "attributes": [{
                        "name": "Person",
                        "type": "Doc",
                        "docDef": "6052978A-1ECB-4F96-A16B-93548936AFC0",
                        "subDocument": {
                            "attributes": [
                                {"name": "First_Name", "type": "Text", "value": first_name},
                                {"name": "Last_Name", "type": "Text", "value": last_name},
                                {"name": "PassportNo", "type": "Text", "value": passportNo}
                            ]
                        }
                    }]
                }

                response = requests.post(
                    medakt_url,
                    params=medakt_params,
                    headers=headers,
                    json=medakt_payload,
                    timeout=30
                )
                response.raise_for_status()
                medakts = response.json()

                if not medakts:
                    print("❌ MEDAKT NOT FOUND")
                    continue

                medakt = medakts[0]
                med_attrs = {a["name"]: a.get("value") for a in medakt.get("attributes", [])}
                subdocs = {a["name"]: a.get("subDocument") for a in medakt.get("attributes", [])}

                region = med_attrs.get("Region")
                district = med_attrs.get("District")

                if not (region and district):
                    print("❌ MEDAKT missing Region/District")
                    continue

                # =====================
                # 3️⃣ BUILD FULL NRSZ CREATE PAYLOAD
                # =====================
                person_doc = subdocs.get("Person")
                if not person_doc:
                    print("❌ MEDAKT missing Person subdocument")
                    continue

                nrsz_create_payload = {}

                for atr in person_doc.get("attributes", []):
                    name = atr.get("name")
                    value = atr.get("value")
                    atr_type = atr.get("type")

                    if not value:
                        continue

                    if atr_type == "DateTime":
                        nrsz_create_payload[name] = parse_date_for_nrsz(value)
                    else:
                        if name not in ("State", "SIN", "INN"):
                            nrsz_create_payload[name] = value

                # =====================
                # 4️⃣ CREATE PERSON IN NRSZ
                # =====================
                response = requests.post(
                    f"{NRSZ_URL}/AddNewPerson",
                    params={"regionNo": region, "districtNo": district},
                    headers=headers,
                    json=nrsz_create_payload,
                    timeout=30
                )
                response.raise_for_status()
                create_resp = response.json()

                if create_resp.get("successFlag") is not True:
                    print("❌ NRSZ CREATE ERROR:", create_resp.get("errorMessages"))
                    continue

                new_iin = create_resp.get("data", {}).get("ResultPIN")
                print("🆕 NRSZ CREATED:", new_iin)

            # =====================
            # 5️⃣ UPDATE ISMSE
            # =====================
            update_payload = {
                "attributes": [{
                    "name": "IIN",
                    "type": "Text",
                    "value": new_iin
                }]
            }

            response = requests.put(
                f"{ISMSE_URL}/api/Document/Update",
                params={"id": doc_id, "userId": user_id},
                headers=headers,
                json=update_payload,
                timeout=30
            )

            if response.status_code in (200, 204):
                print("✅ ISMSE UPDATED")
            else:
                print("❌ ISMSE UPDATE ERROR:", response.text)

        except requests.exceptions.RequestException as e:
            print("HTTP ERROR:", e)
        except Exception as e:
            print("LOGIC ERROR:", e)
