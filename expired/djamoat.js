var request = require("request-promise")

var codes = [ // ADULT
  { "old": "75", "new": "9" },
  { "old": "77", "new": "14" },
  {"old": "78", "new": "8"},
  {"old": "79", "new": "10"},
  {"old": "80", "new": "28"},
  {"old": "81", "new": "3"},
  {"old": "82", "new": "25"},
  {"old": "83", "new": "32"}
]
// var codes = [
//   // { "old": "75", "new": "9" }, +
//   // { "old": "77", "new": "14" }, +
//   // {"old": "78", "new": "8"}, +
//   // {"old": "79", "new": "10"}, +
//   // {"old": "80", "new": "28"}, +
//   // {"old": "81", "new": "3"}, +
//   // {"old": "82", "new": "25"}, +
//   // {"old": "83", "new": "32"}
// ]
async function run() {

  for (let code = 0; code < codes.length; code++) {
    request.post({
      "headers": { "content-type": "application/json; charset=utf-8" },
      "url": "http://192.168.0.64:80/ismse-rest-api/api/Document/FilterDocumentsByDefId?defId=5FDE415F-DB00-43B4-BA6E-FE439CFF6DA0&size=100&page=1&userId=dced7bea-8a93-4baf-964b-232e75a758c5",
      // "url": "http://192.168.0.64:80/ismse-rest-api/api/Document/FilterDocumentsByDefId?defId=B4DDDC00-9EA9-4AD4-9C4F-498E87AA9828&size=100&page=1&userId=dced7bea-8a93-4baf-964b-232e75a758c5",
      "body": JSON.stringify({
        "attributes": [
          {
            "name": "District",
            "type": "Text",
            "value": codes[code].old
          }]
      })
    })
      .then(async function (response) {
        let medakts = JSON.parse(response)
        console.log("LEN", medakts.length, "CODE", codes[code].old)
        for (let m = 0; m < medakts.length; m++) {
          let id = medakts[m].id
          console.log("ID", id)
          var newMedakt = { attributes: [] }
          await request.get({
            "headers": { "content-type": "application/json" },
            "url": "http://192.168.0.64:80/ismse-rest-api/api/Document/GetDocumentById/?id=" + id + "&userId=dced7bea-8a93-4baf-964b-232e75a758c5",
          })
            .then(async function (response) {
              // console.log("MED", response)
              let medakt = JSON.parse(response)

              for (let a = 0; a < medakt.attributes.length; a++) {
                let atr = medakt.attributes[a]
                if (atr.type !== "State" && atr.value !== null) {
                  if (atr.name === "District") {
                    atr.value = codes[code].new
                  }
                  if (atr.type === "Doc") {
                    atr.subDocument = null
                  }
                  newMedakt.attributes.push(atr)
                }
              }
              // console.log("MMM", JSON.stringify(newMedakt))

              await request.put({
                "headers": { "content-type": "application/json" },
                "url": "http://192.168.0.64:80/ismse-rest-api/api/Document/Update?id=" + medakts[m].id + "&userId=dced7bea-8a93-4baf-964b-232e75a758c5",
                "body": JSON.stringify(newMedakt)
              })
                .then(function (response) {
                  console.log("PUT OK", response)
                })
                .catch(async function (error) {
                  console.log("ERROR PUT: ", error.error)
                })
            })
            .catch(async function (error) {
              console.log("ERROR GET: ", error.error)
            })



        }
      })
      .catch(async function (error) {
        console.log("ERROR: ", error)
      })
  }
}

run();