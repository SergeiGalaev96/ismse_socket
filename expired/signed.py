import requests
from datetime import datetime
# signed 146620
# expired 3362 Adult
# person = 343360

# Подписанные в Истекшие

page = 1

while True:
  print("PAGE", page)
  medaktUrl = "http://192.168.0.64:80/ismse-rest-api/api/Document/FilterDocumentsByDefIdState"
  medakdParams = {
    "stateTypeId": "32062CB7-C31C-4AFB-ADF3-F9F9AEEFCE59", # подписанный
    # "defId": "5FDE415F-DB00-43B4-BA6E-FE439CFF6DA0", # Детский
    "defId": "B4DDDC00-9EA9-4AD4-9C4F-498E87AA9828",  # Взрослый
    "size": 10,
    "page": page,
    "userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
  }
  headers = {
    "Content-Type": "application/json"
  }
  payloadMedakt = {}
  try:
    responseMedakt = requests.post(medaktUrl, params=medakdParams, headers=headers, json=payloadMedakt)
    medakts = responseMedakt.json()
    # print(medakts)
    if not medakts:  # Если список пустой — завершить цикл
      print("END")
      break
    page += 1
    
    for medakt in medakts:
      personId = ""
      for atr in medakt["attributes"]:
        if atr["name"] == "Person":
          if not atr["subDocument"]["id"]:  # None или пустая строка
            print("Person не найден")
            continue
          try:
            personId = atr["subDocument"]["id"]
            payloadMedakt = {
              "attributes": [
              {
                "name": "person",
                "value": personId,
                "type": "Doc"
              }]
            }
            try:
              responseMedakt2 = requests.post(medaktUrl, params=medakdParams, headers=headers, json=payloadMedakt)
              # Пытаемся разобрать JSON
              medakts2 = responseMedakt2.json()
              
              if len(medakts2) > 1:
                medaktsToExpired = []
                iprToExpired = []
                print("M2", len(medakts2))
                lastMedaktId = ""
                lastMedaktDate = None
                

                for medakt2 in medakts2:
                  curMedaktId = medakt2["id"]
                  curMedaktDate = None
                  for atr2 in medakt2["attributes"]:
                    if atr2["name"] == "ExamFinishDate":
                      if atr2["value"]:
                          try:
                            curMedaktDate = datetime.strptime(atr2["value"], "%d.%m.%Y %H:%M:%S")
                            # print("дата:", curMedaktDate)
                            print("MID", curMedaktId)
                          except ValueError:
                            print("Неверный формат даты:", atr2["value"])
                            medaktsToExpired.append(medakt2["id"])
                            continue

                          if lastMedaktId == "":
                            lastMedaktId = curMedaktId
                            lastMedaktDate = curMedaktDate
                          else:
                            if lastMedaktDate >= curMedaktDate:
                              # Текущий медакт старее — в истекший
                              medaktsToExpired.append(curMedaktId)
                              print("В истекшие:", curMedaktId)
                            else:
                              # Текущий медакт новее — предыдущий в истекший
                              medaktsToExpired.append(lastMedaktId)
                              lastMedaktId = curMedaktId
                              lastMedaktDate = curMedaktDate
                              print("В истекшие:", lastMedaktId)
                      else:
                        print("Пустое значение даты")
                        medaktsToExpired.append(curMedaktId)      
                if len(medaktsToExpired) == len(medakts2):
                  medaktsToExpired.pop(0)
                  print("Нет дат у всех медактов")

                if medaktsToExpired:
                  # Собираем ИПР
                  url = "http://192.168.0.64:80/ismse-rest-api/api/Document/FilterDocumentsByDefId"
                  print("medaktsToExpired:", medaktsToExpired)
                  for medakt3 in medaktsToExpired:
                    iprParams = {
                      "defId": "38CBA2D5-9783-4B85-9D8E-40A5384765CB",
                      "size": 10,
                      "page": 1,
                      "userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
                    }
                    payloadIpr = {
                      "attributes": [
                        {
                          "name": "AdultsMedicalCart",
                          "value": medakt3,
                          "type": "Doc"
                        }
                      ]
                    }
                    responseIpr = requests.post(url, params=iprParams, headers=headers, json=payloadIpr)
                    try:
                      iprList = responseIpr.json()
                      # print("IPR:", iprList)
                      for ipr in iprList:
                        iprToExpired.append(ipr["id"])
                    except ValueError:
                      print("Ошибка разбора JSON-ответа:", responseIpr.text)
                  print("IPR To Archive:", iprToExpired)
              
                
                # URL статусов
                  urlStatus = "http://192.168.0.64:80/ismse-rest-api/api/Document/SetMultipleDocsToState"
                  paramsStatus = {
                    "userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
                  }
                  stateBody = {
                    "docIdList": medaktsToExpired,
                    "stateTypeId": "d203372c-236b-4b3e-953a-11f09a4aca61" # истекший
                  }	

                  # Изменяем статусы медактов
                  # responseStatus = requests.post(urlStatus, params=paramsStatus, headers=headers, json=stateBody)
                  # print("Статус-установлен МЕД:", responseStatus.status_code)
                  print("Статус-установлен МЕД:", medaktsToExpired)

                  # Изменяем статусы ИПР
                  stateBody["docIdList"] = iprToExpired
                  # responseStstus = requests.post(urlStatus, params=paramsStatus, headers=headers, json=stateBody)
                  # print("Статус-установлен ИПР:", responseStatus.status_code)
                  # print("Статус-установлен ИПР:", iprToExpired)
				


            except requests.exceptions.RequestException as e:
              print("Request2 error:", e)
              break
            except ValueError:
              print("Не удалось распарсить JSON. Ответ2:", responseMedakt.text)
              break

          except ValueError:
            print("Неверный формат Person:", atr["name"])

  except requests.exceptions.RequestException as e:
    print("Request error:", e)
    break
  except ValueError:
    print("Не удалось распарсить JSON. Ответ:", responseMedakt.text)
    break

