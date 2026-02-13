var request = require("request-promise");
const XLSX = require("xlsx");
const ids = require("./childIds.json");
// const ids = require("./adultIds.json");
const SOAT = require('../General/SOAT.json')

async function run() {
  let rows = [];

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    console.log("ID", id);

    await request.get({
      headers: { "content-type": "application/json" },
      url: "http://192.168.0.64:80/ismse-rest-api/api/Document/GetDocumentById/?id=" + id + "&userId=dced7bea-8a93-4baf-964b-232e75a758c5",
    })
      .then(async function (response) {
        let medakt = JSON.parse(response);
        let row = {};
        let addressCodes = {}
        for (let a = 0; a < medakt.attributes.length; a++) {
          let atr = medakt.attributes[a]
          if (atr.name == "MseName") {
            row["Наименование МСЭК"] = atr.enumValueText;
          }
          if (atr.name == "No") {
            row["№ регистрации"] = atr.value;
          }
          if (atr.name == "Date") {
            row["Дата регистрации"] = atr.value !== null ? atr.value.substring(0, 10) : "";
          }

          if (atr.name == "Person") {
            for (let pa = 0; pa < atr.subDocument.attributes.length; pa++) {
              let patr = atr.subDocument.attributes[pa]
              if (patr.name == "Last_Name") {
                row["Фамилия"] = patr.value;
              }
              if (patr.name == "First_Name") {
                row["Имя"] = patr.value;
              }
              if (patr.name == "Middle_Name") {
                row["Отчество"] = patr.value;
              }
              if (patr.name == "Date_of_Birth") {
                row["Дата рождения"] = patr.value !== null ? patr.value.substring(0, 10) : "";
              }
              if (patr.name == "Sex") {
                row["Пол"] = patr.enumValueText;
              }
              if (patr.name == "PassportType") {
                row["Типы удостоверяющих документов"] = patr.enumValueText;
              }
              if (patr.name == "PassportSeries") {
                row["Серия"] = patr.value;
              }
              if (patr.name == "PassportNo") {
                row["Номер"] = patr.value;
              }
            }
          }

          if (atr.name == "Region" || atr.name == "District" || atr.name == "subDistrict" || atr.name == "Village") {
            addressCodes[atr.name] = atr.value;
          }
          if (atr.name == "ResidentialAddress") {
            row["Дом/кв/ул."] = atr.value;
          }
          if (atr.name == "Phone") {
            row["№ телефона"] = atr.value;
          }

          if (atr.name == "DisabilityGroup") {
            row["Группа инвалидности"] = atr.enumValueText;
          }
          if (atr.name == "ExamDateFrom") {
            row["Период с"] = atr.value !== null ? atr.value.substring(0, 10) : "";
          }
        }

        let addressValues = await getAddressValues(addressCodes)
        // console.log("ADR", addressCodes);
        row["Область"] = addressValues.Region;
        row["Район/Город"] = addressValues.District;
        row["Джамоат"] = addressValues.subDistrict;
        row["Село"] = addressValues.Village;

        rows.push(row);
      })
      .catch(async function (error) {
        console.log("ERROR GET: ", error);
      });
  }

  // создаём Excel
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows, {
    header: [
      "Наименование МСЭК",
      "№ регистрации",
      "Дата регистрации",

      "Фамилия",
      "Имя",
      "Отчество",
      "Дата рождения",
      "Пол",
      "Типы удостоверяющих документов",
      "Серия",
      "Номер",

      "Область",
      "Район/Город",
      "Джамоат",
      "Село",
      "Дом/кв/ул.",
      "№ телефона",

      "Группа инвалидности",
      "Период с",
    ],
  });
  XLSX.utils.book_append_sheet(wb, ws, "Medakts");

  XLSX.writeFile(wb, "medakts.xlsx");
  console.log("✅ Готово! Данные сохранены в medakts.xlsx");
}

async function getAddressValues(codes) {
  console.log("CODES", codes)
  let values = {}
  for (let r = 0; r < SOAT.countries[0].regions.length; r++) {
    let region = SOAT.countries[0].regions[r]

    if (region.code == codes.Region) {
      values.Region = region.name
      // console.log("RR", region.code, codes.Region)
      for (let d = 0; d < region.districts.length; d++) {
        let district = region.districts[d]
        if (district.code == codes.District) {
          values.District = district.name
          for (let dj = 0; dj < district.subDistricts.length; dj++) {
            let djamoat = district.subDistricts[dj]
            if (djamoat.code == codes.subDistrict) {
              values.subDistrict = djamoat.name
              for (let v = 0; v < djamoat.villages.length; v++) {
                let village = djamoat.villages[v]
                if (village.code == codes.Village) {
                  values.Village = village.name
                }
              }
            }
          }
        }
      }
    }
  }
  // console.log("VV", values)
  return values
}

run();
