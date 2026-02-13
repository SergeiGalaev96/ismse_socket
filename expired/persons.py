import requests
from datetime import datetime

# page = 1
page = 1 # to 20000

while True:
	print("PAGE", page)
	url = "http://192.168.0.64:80/ismse-rest-api/api/Document/FilterDocumentsByDefId"
	params = {
			"defId": "6052978A-1ECB-4F96-A16B-93548936AFC0",
			"size": 10,
			"page": page,
			"userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
	}
	headers = {
			"Content-Type": "application/json"
	}

	payload = {}

	try:
		responsePerson = requests.post(url, params=params, headers=headers, json=payload)
		# Пытаемся разобрать JSON
		data = responsePerson.json()
		if not data:  # Если список пустой — завершить цикл
			print("END")
			break
		page += 1

		for person in data:
			personId = person["id"]
			# print("personId:", personId)
			age = 18
			for atr in person["attributes"]:
				if atr["name"] == "Date_of_Birth":
					if not atr["value"]:  # None или пустая строка
						print("Дата рождения отсутствует")
						continue  # age останется 18
					try:
						# print("BD", atr["value"])
						birth_str  = atr["value"][:10]
						birth_date = datetime.strptime(birth_str, "%d.%m.%Y")
						today = datetime.today()
						# Точное вычисление возраста с учётом дня и месяца
						age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
					except ValueError:
						print("Неверный формат даты рождения:", atr["value"])

			print("Age:", age)
			medaktUrl = "http://192.168.0.64:80/ismse-rest-api/api/Document/FilterDocumentsByDefIdState"
			medakdParams = {
				"stateTypeId": "32062CB7-C31C-4AFB-ADF3-F9F9AEEFCE59",
				"defId": "5FDE415F-DB00-43B4-BA6E-FE439CFF6DA0",
				"size": 100,
				"page": 1,
				"userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
			}
			payloadMedakt = {
				"attributes": [
				{
					"name": "person",
					"value": personId,
					"type": "Doc"
				}]
			}
			medaktsToArchive = []
			iprToArchive = []
			if age <18: # Детский медакт
				print("Child:", personId)
				responseMedaktDt = requests.post(medaktUrl, params=medakdParams, headers=headers, json=payloadMedakt)
				medaktList = responseMedaktDt.json()
				if not medaktList:  # Если список пустой — завершить цикл
					print("NO CHILD MEDAKT")
				else:
					if len(medaktList) > 1:  # имеются дубликаты
						
						lastMedaktId = ""
						lastMedaktDate = None
						for medakt in medaktList:
							for atr in medakt["attributes"]:
								if atr["name"] == "ExamFinishDate":
									if atr["value"]:
											try:
												curMedaktDate = datetime.strptime(atr["value"], "%d.%m.%Y %H:%M:%S")
											except ValueError:
												print("Неверный формат даты:", atr["value"])
												medaktsToArchive.append(medakt["id"])
												continue

											if lastMedaktId == "":
												lastMedaktId = medakt["id"]
												lastMedaktDate = curMedaktDate
											else:
												if lastMedaktDate > curMedaktDate:
													# Текущий медакт старее — в архив
													medaktsToArchive.append(medakt["id"])
												else:
													# Текущий медакт новее — предыдущий в архив
													medaktsToArchive.append(lastMedaktId)
													lastMedaktId = medakt["id"]
													lastMedaktDate = curMedaktDate
									else:
										print("Пустое значение даты")
										medaktsToArchive.append(medakt["id"])
						if len(medaktsToArchive) == len(medaktList):
							medaktsToArchive.pop(0)
							print("Нет дат у всех медактов")
					else:
						print("No duplicates")

			else: # Взрослый медакт
				print("Adult:", personId)
				# Собираем все детские медакты
				responseMedaktDt = requests.post(medaktUrl, params=medakdParams, headers=headers, json=payloadMedakt)
				medaktList = responseMedaktDt.json()
				if not medaktList:
					print("NO CHILD MEDAKT for adult")
				else:
					for medakt in medaktList:
						medaktsToArchive.append(medakt["id"]) # Помещаем их в архив

				medakdParams["defId"] = "B4DDDC00-9EA9-4AD4-9C4F-498E87AA9828"
				responseMedaktVz = requests.post(medaktUrl, params=medakdParams, headers=headers, json=payloadMedakt)
				medaktList = responseMedaktVz.json()
				if not medaktList:  # Если список пустой — пропускаем
					print("NO ADULT MEDAKT")
				else:
					if len(medaktList) > 1:  # имеются дубликаты
						
						lastMedaktId = ""
						lastMedaktDate = None
						for medakt in medaktList:
							curMedaktId = medakt["id"]
							for atr in medakt["attributes"]:
								if atr["name"] == "ExamFinishDate":
									if atr["value"]:
										try:
											curMedaktDate = datetime.strptime(atr["value"], "%d.%m.%Y %H:%M:%S")
										except ValueError:
											print("Неверный формат даты:", atr["value"])
											medaktsToArchive.append(curMedaktId)
											continue

										if lastMedaktId == "":
											lastMedaktId = curMedaktId
											lastMedaktDate = curMedaktDate
										else:
											if lastMedaktDate > curMedaktDate:
												# Текущий медакт старее — в архив
												medaktsToArchive.append(curMedaktId)
											else:
												# Текущий медакт новее — предыдущий в архив
												medaktsToArchive.append(lastMedaktId)
												lastMedaktId = curMedaktId
												lastMedaktDate = curMedaktDate
									else:
										print("Пустое значение даты")
										medaktsToArchive.append(medakt["id"])
					else:
						print("No duplicates")
			if medaktsToArchive:
				# Собираем ИПР
				print("medaktsToArchive:", medaktsToArchive)
				for medakt in medaktsToArchive:
					iprParams = {
						"defId": "38CBA2D5-9783-4B85-9D8E-40A5384765CB",
						"size": 100,
						"page": 1,
						"userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
					}
					payloadIpr = {
						"attributes": [
							{
								"name": "AdultsMedicalCart",
								"value": medakt,
								"type": "Doc"
							}
						]
					}
					responseIpr = requests.post(url, params=iprParams, headers=headers, json=payloadIpr)
					try:
						iprList = responseIpr.json()
						# print("IPR:", iprList)
						for ipr in iprList:
							iprToArchive.append(ipr["id"])
					except ValueError:
						print("Ошибка разбора JSON-ответа:", responseIpr.text)
				print("IPR To Archive:", iprToArchive)
		
			
			# URL статусов
				urlStatus = "http://192.168.0.64:80/ismse-rest-api/api/Document/SetMultipleDocsToState"
				paramsStatus = {
					"userId": "dced7bea-8a93-4baf-964b-232e75a758c5"
				}
				stateBody = {
					"docIdList": medaktsToArchive,
					"stateTypeId": "D5B97FA0-9D87-4FB8-BDF1-B2F118D42640"
				}	

				# Изменяем статусы медактов
				# print("STATUS MED", stateBody)
				responseStatus = requests.post(urlStatus, params=paramsStatus, headers=headers, json=stateBody)
				print("Статус-установлен МЕД:", responseStatus.status_code)
				# print("Статус-установлен МЕД:", medaktsToArchive)

				# Изменяем статусы ИПР
				stateBody["docIdList"] = iprToArchive
				# print("STATUS IPR", stateBody)
				responseStstus = requests.post(urlStatus, params=paramsStatus, headers=headers, json=stateBody)
				print("Статус-установлен ИПР:", responseStatus.status_code)
				# print("Статус-установлен ИПР:", iprToArchive)
				

	except requests.exceptions.RequestException as e:
		print("Request error:", e)
		break
	except ValueError:
		print("Не удалось распарсить JSON. Ответ:", responsePerson.text)
		break

