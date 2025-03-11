// Forms and files
const processesToDeploy = require('./ISMSE Processes/ImportProcesses.js')
// Person Forms
const personViewForm = require('./Forms/Person/personViewFormTJ.json')
const personSearchForm = require('./Forms/Person/personSearchFormTJ.json')
const personViewFormNRSZ = require('./Forms/Person/personViewFormNRSZTJ.json')
const personShortForm = require('./Forms/Person/personShortFormTJ.json')
const personMemoForm = require('./Forms/Person/personMemoForm.json')


const DownloadAdultsMedaktForm = require('./Forms/DownloadAdultsMedaktForm.json')
const DownloadChildMedaktForm = require('./Forms/DownloadChildMedaktForm.json')

// Registriation Forms
const AdultsRegistrationForm = require('./Forms/Adult/adultsRegistrationFormTJ.json')
const ChildRegistrationForm = require('./Forms/Child/ChildRegistrationFormTJ.json')
const RegistrationSearchForm = require('./Forms/RegistrationSearchFormTJ.json')
const RegistrationGridForm = require('./Forms/RegistrationGridFormTJ.json')

// Detailed Forms
// Adults forms
const adultsDetailedForm = require('./Forms/Adult/adultsDetailedFormTJ.json')
const adultsDetailedFormTherapist = require('./Forms/Adult/adultsDetailedFormTJTherapist.json')
const adultsDetailedFormSurgeon = require('./Forms/Adult/adultsDetailedFormTJSurgeon.json')
const adultsDetailedFormOphtalmologist = require('./Forms/Adult/adultsDetailedFormTJOphtalmologist.json')
const adultsDetailedFormNeurologistPsychiatrist = require('./Forms/Adult/adultsDetailedFormTJNeurologistPsychiatrist.json')
const adultsDetailedFormOculist = require('./Forms/Adult/adultsDetailedFormTJOculist.json')
const adultsDetailedFormCardiologist = require('./Forms/Adult/adultsDetailedFormTJCardiologist.json')
const adultsDetailedFormPediatritian = require('./Forms/Adult/adultsDetailedFormTJPediatritian.json')
const adultsDetailedFormDoctorAnother = require('./Forms/Adult/adultsDetailedFormTJDoctorAnother.json')
// Child forms
const childDetailedForm = require('./Forms/Child/childDetailedFormTJ.json')
const childDetailedFormTherapist = require('./Forms/Child/childDetailedFormTJTherapist.json')
const childDetailedFormSurgeon = require('./Forms/Child/childDetailedFormTJSurgeon.json')
const childDetailedFormOphtalmologist = require('./Forms/Child/childDetailedFormTJOphtalmologist.json')
const childDetailedFormNeurologistPsychiatrist = require('./Forms/Child/childDetailedFormTJNeurologistPsychiatrist.json')
const childDetailedFormOculist = require('./Forms/Child/childDetailedFormTJOculist.json')
const childDetailedFormCardiologist = require('./Forms/Child/childDetailedFormTJCardiologist.json')
const childDetailedFormPediatritian = require('./Forms/Child/childDetailedFormTJPediatritian.json')
const childDetailedFormDoctorAnother = require('./Forms/Child/childDetailedFormTJDoctorAnother.json')
const childStatesEnumForm = require('./Forms/Child/childStatesEnumFormTJ.json')
const ChildDetailedSearchForm = require('./Forms/Child/ChildDetailedSearchFormTJ.json')
// Other forms
const AdultsDetailedSearchForm = require('./Forms/Adult/AdultsDetailedSearchFormTJ.json')
const adultsStatesEnumForm = require('./Forms/Adult/adultsStatesEnumFormTJ.json')

const TransferDocumentForm = require('./Forms/TransferDocumentFormTJ.json')
const DetailedGridForm = require('./Forms/DetailedGridFormTJ.json')
const memoForm = require('./Forms/memoForm.json')


// IPR Forms
const adultsIPRForm = require('./Forms/Adult/adultsIPRFormTJ.json')
const childIPRForm = require('./Forms/Child/childIPRFormTJ.json')
const AdultsIPRSearchForm = require('./Forms/Adult/AdultsIPRSearchFormTJ.json')
const ChildIPRSearchForm = require('./Forms/Child/ChildIPRSearchFormTJ.json')
const IPRGridForm = require('./Forms/Adult/IPRGridFormTJ.json')

// Users forms
const searchUserForm = require('./Forms/Users/searchUserFormTJ.json')
const createUserForm = require('./Forms/Users/createUserFormTJ.json')
const editUserForm = require('./Forms/Users/editUserFormTJ.json')
const userGridForm = require('./Forms/Users/userGridFormTJ.json')
const userMonitoringSearchForm = require('./Forms/Users/userMonitoringSearchForm.json')
const userMonitoringGridForm = require('./Forms/Users/userMonitoringGridForm.json')

// Complaints forms
const complaintsForm = require('./Forms/complaintsFormTJ.json')
const complaintsSearchForm = require('./Forms/complaintsSearchFormTJ.json')
const complaintsGridForm = require('./Forms/complaintsGridFormTJ.json')

// Appeals forms
const appealsForm = require('./Forms/appealsFormTJ.json')
const appealsSearchForm = require('./Forms/appealsSearchFormTJ.json')
const appealsGridForm = require('./Forms/appealsGridFormTJ.json')

// Other files
const personEnumTestData = require('./General/personEnumTestData.json')
const enumTestData = require('./General/enumTestData.json')
const parentTestIdList = require('./General/parentIdList.json')

const ConfigurationFile = require('./General/ConfigurationFile.json')
const Buttons = require('./General/Buttons.json')
const dashboardRoutes = require('./General/dashboardRoutes.json')
const SOAT = require('./General/SOAT.json')

// Libraries
var amqp = require('amqplib/callback_api')
var request = require("request-promise")
// var rimraf = require("rimraf")
const fs = require('fs')
// const path = require('path')
var WebSocketServer = new require("ws")
var FormData = require('form-data')
const axios = require('axios')

// RESTS LOCAL
const CamundaApiHost = 'http://localhost:8080/engine-rest'
// const ismseApi = "http://server-1/ISMSE-REST-API/api"
// const cacheApi = "http://server-1/ISMSE-REST-API/api"
// const CamundaApiHost = 'http://192.168.0.72:8080/engine-rest'
const ismseApi = "http://192.168.0.64:80/ismse-rest-api/api"
const cacheApi = "http://192.168.0.64:80/ismse-rest-api/api"
const asistApi = "http://192.168.0.64:80/ismse-rest-api/api"
const keycloakRESTApi = "http://192.168.0.64:8180"
const wsport = 3320

// RESTS SERVER 72
// const CamundaApiHost = 'http://192.168.0.72:8080/engine-rest'
// const ismseApi = "http://192.168.0.64:80/ismse-rest-api/api"
// const cacheApi = "http://192.168.0.64:80/ismse-rest-api/api"
// const asistApi = "http://192.168.0.64:80/ismse-rest-api/api"
// const keycloakRESTApi = "http://192.168.0.64:8180"
// const wsport = 3120


// // RESTS SERVER 64
// const CamundaApiHost = 'http://192.168.0.64:8080/engine-rest'
// const ismseApi = "http://192.168.0.64:80/cissa-rest-api/api"
// const cacheApi = "http://192.168.0.64:80/cissa-web-api/api"
// const asistApi = "http://192.168.0.64:80/ismse-rest-api/api"
// const keycloakRESTApi = "http://192.168.0.64:8180"
// const wsport = 3120


// List of connected clients
var clients = {}

// Section of socket functions
// Get data from camunda and send them to clients
function startCamundaProcess(processKey, variables) {
  // console.log("CALL REST VARS", variables)
  variables["ismseApi"] = { value: ismseApi }
  variables["asistApi"] = { value: asistApi }
  variables["CamundaApiHost"] = { value: CamundaApiHost }
  variables["keycloakRESTApi"] = { value: keycloakRESTApi }
  request.post({
    "headers": { "content-type": "application/json" },
    "url": CamundaApiHost + "/process-definition/key/" + processKey + "/start",
    "body": JSON.stringify(
      { "variables": variables }
    )
  }, (error, response, body) => {
    if (error) {
      return console.log("call REST error: ", error)
    }
    // else clients[session_id].send(JSON.stringify({ messageType: "processInfo", data: body, "process_id": process_id }));
  })
}
// Complete Process by taskID
async function completeTask(variables, taskID) {
  console.log("Variables", variables)
  request.post({
    "headers": { "content-type": "application/json" },
    "url": CamundaApiHost + "/task/" + taskID + "/complete",
    "body": JSON.stringify({ "variables": variables })
  })
    .then(function (response) {
      console.log("Completed task", taskID)
    })
    .catch(async function (error) {
      console.log("Complete task ERROR: ", error.message)
      let task = await getTaskVariables(taskID)
      // console.log("TASK", task)
      let userId = task.userId.value
      sendMessage({ userId: userId, messageType: "toast", toastText: error.message, toastType: "error" })
      sendMessageByType(task, userId, taskID, false, task.user_session_id.value, task.userRole.value)
    })
}
// Delete session data from ignite
async function clearCache(cacheId) {
  await request.delete(
    {
      "headers": { "content-type": "application/json" },
      "url": cacheApi + "/InMemoryCache/Delete?cacheId=" + cacheId
    }
  )
    .then(function (response) {
      console.log("Cache cleared")
      // return response
    })
    .catch(function (error) {
      // return console.log("Request Ignite error: ", error)
    })
}
// Restore all previously opened user tabs from Camunda
async function restoreSession(userId, session_id, userRole) {
  var camundaTaskList = await getCamundaTaskList()
  console.log()
  for (let i = 0; i < camundaTaskList.length; i++) {
    var task = null
    task = await getTaskVariables(camundaTaskList[i].id)
    if (task.user_session_id.value !== undefined) {
      sendMessageByType(task, userId, camundaTaskList[i].id, true, task.user_session_id.value, userRole)
    }
  }
}
async function sendMessageByType(task, userId, taskId, restore, session_id, userRole) {
  if (task.userId.value === userId) {
    // console.log("TASK", task)
    var taskType = task.taskType.value
    var docList
    var selectedDoc
    var docListIPR
    var person
    if (task.docList !== undefined) {
      if (task.docList.value !== "null" && task.docList.value !== null) {
        var fetchDocList = await getObjectTypeData(taskId, "docList")
        docList = fetchDocList.value
      }
      else {
        // console.log("docList", "undefined || null")
        docList = null
      }
    }
    else {
      // console.log("docList", "undefined || null")
      docList = null
    }
    if (task.selectedDoc !== undefined) {
      if (task.selectedDoc.value !== "null" && task.selectedDoc.value !== null) {
        var fetchSelectedDoc = await getObjectTypeData(taskId, "selectedDoc")
        selectedDoc = fetchSelectedDoc.value
      }
      else {
        // console.log("selectedDoc", "undefined || null")
        selectedDoc = null
      }
    }
    else {
      // console.log("selectedDoc", "undefined || null")
      selectedDoc = null
    }
    if (task.docListIPR !== undefined) {
      if (task.docListIPR.value !== "null" && task.docListIPR.value !== null) {
        var fetchDocListIPR = await getObjectTypeData(taskId, "docListIPR")
        docListIPR = fetchDocListIPR.value
        // console.log("IPRS", docListIPR)
      }
      else {
        // console.log("docListIPR", "undefined || null")
        docListIPR = null
      }
    }
    else {
      // console.log("docListIPR", "undefined || null")
      docListIPR = null
    }
    if (task.person !== undefined) {
      if (task.person.value !== "null" && task.person.value !== null) {
        fetchPerson = await getObjectTypeData(taskId, "person")
        person = fetchPerson.value
      }
      else {
        // console.log("person", "undefined || null")
        person = null
      }
    }
    else {
      // console.log("person", "undefined || null")
      person = null
    }
    let message = {
      taskID: taskId,
      session_id: task.user_session_id.value,
      process_id: task.process_id.value,
      taskType: taskType,
      form: task.form.value,
      formType: task.formType.value,
      buttons: task.buttons.value,
      selectedDoc: selectedDoc,
      docId: task.docId.value,
      gridForm: task.gridForm.value,
      gridFormButtons: task.gridFormButtons.value,
      docList: docList,
      docListIPR: docListIPR,
      size: task.size.value,
      page: task.page.value,
      person: person,
      userAction: task.userAction.value,      
      tabLabel: task.tabLabel.value,
      userRole: task.userRole.value,
      userId: task.userId.value
    }

    if (docList !== undefined && selectedDoc !== undefined && docListIPR !== undefined && person !== undefined) {
      if (taskType === "showPersonForm" || taskType === "showPersonFormNRSZ") {
        // await sendPersonForm(session_id, task.process_id.value, taskId, taskType, JSON.parse(selectedDoc),
        //   task.userAction.value, "edit", docList, task.buttons.value, 10, 1, userRole, restore, task.tabLabel.value, task.userId.value)
        sendPersonForm(message, restore)
      }
      else if (taskType === "showRegForm" || taskType === "showRegSearchForm" ||
        taskType === "showChildRegForm" || taskType === "showChildRegSearchForm") {
        // console.log("CHECK: ", task.formType.value)
        sendRegForm(message, restore)
        // await sendRegForm(session_id, task.process_id.value, taskId, task.docId.value, taskType, selectedDoc,
        //   task.formType.value, docList, task.buttons.value, person, 10, 1, userRole, restore, task.tabLabel.value, task.userId.value)
      }
      else if (taskType === "showDetailedForm" || taskType === "showDetailedSearchForm" ||
        taskType === "showChildDetailedForm" || taskType === "showChildDetailedSearchForm" ||
        taskType === "searchAdultsDetailedForm" || taskType === "searchChildDetailedForm") {
        sendDetailedForm(message, restore)
      }
      else if (taskType === "showAdultsStatesSelectingForm") {
        sendAdultsStatesSelectingForm(message, restore)
      }
      else if (taskType === "showDownloadAdultsMedaktForm" || taskType === "showDownloadChildMedaktForm") {
        sendDownloadMedaktForm(message, restore)
      }

      else if (taskType === "showChildStatesSelectingForm") {
        await sendChildStatesSelectingForm(session_id, taskId, task.process_id.value, task.docId.value, taskType, selectedDoc,
          task.formType.value, task.buttons.value, docList, person, 10, 1, userRole, restore, task.tabLabel.value, task.userId.value)
      }
      else if (taskType === "showIPRForm" || taskType === "showIPRSearchForm" ||
        taskType === "showChildIPRForm" || taskType === "showChildIPRSearchForm") {
        sendIPRForm(message, restore)
      }
      else if (taskType === "showSearchUser" || taskType === "showCreateUser" || taskType === "showEditUser") {
        sendUserForm(message, restore)
      }
      else if (taskType === "showUserMonitoring") {
        sendMonitoringForm(message, restore)
      }

      
      else if (taskType === "showMemoForm") {
        sendMemoForm(message, restore)
      }
      else if (taskType === "showComplaintsForm" || taskType === "showSearchComplaintsForm" || taskType === "showAppealsForm" || taskType === "showSearchAppealsForm") {
        sendComplaintsAppealsForm(message, restore)
      }
      else if (taskType === "showToast") {
        let vars = { "userAction": { "value": "cancel" } }
        await completeTask(vars, taskId)
      }
    }
    else {
      if (taskType === "showToast") {
        let vars = { "userAction": { "value": "cancel" } }
        await completeTask(vars, taskId)
      }
    }
  }
}

// Get all camunda Tasks
async function getCamundaTaskList() {
  var camundaTaskList = await request(
    {
      "url": CamundaApiHost + "/task"
    }
  )
    .then(function (response) {
      var data = JSON.parse(response)
      return data
    })
    .catch(function (error) {
      return console.log("Getting Camunda Task List error: ", error)
    })
  return camundaTaskList
}
// Get all task variables by id
async function getTaskVariables(id) {
  var taskVariables = await request(
    {
      "url": CamundaApiHost + "/task/" + id + "/variables"
    }
  )
    .then(function (response) {
      var data = JSON.parse(response)
      return data
    })
    .catch(function (error) {
      return console.log("Getting Camunda Task Variables error: ", error)
    })
  return taskVariables
}
// Get Json data in serialized type
async function getObjectTypeData(id, varName) {
  // console.log("GET OBJECT", varName)
  var objectTypeData = await request(
    {
      "url": CamundaApiHost + "/task/" + id + "/variables/" + varName + "?deserializeValue=false"
    }
  )
    .then(function (response) {
      var data = JSON.parse(response)
      return data
    })
    .catch(function (error) {
      return console.log("Getting Camunda docList error: ", error)
    })
  return objectTypeData
}
// Getting Enum Data for person document
async function getPersonEnumData(Form) {
  console.log("Collecting Person Enum DATA", Form.formName)
  var enumData = []
  var igniteEnumData = await requestDataFromIgnite()
  var parsedEnumData = JSON.parse(igniteEnumData)
  // console.log("igniteEnumData", parsedEnumData.length)
  for (var i = 0; i < Form.attributes.length; i++) {
    if (Form.attributes[i].type === "Enum") {
      var enumDefId = Form.attributes[i].enumDef
      if (parsedEnumData.length === 0) {
        var newEnumValues = await getEnumValues(enumDefId)
        saveEnumDataToIgnite(newEnumValues)
        console.log("newEnumValues", newEnumValues)
        enumData.push(newEnumValues)
      }
      else {
        for (var l = 0; l < parsedEnumData.length; l++) {
          if (parsedEnumData[l].Data["enumDef"] === enumDefId) {
            var newEnumList = {
              enumDef: enumDefId,
              data: parsedEnumData[l].Data["data"]
            }
            enumData.push(newEnumList)
            // console.log("MATHED RESULT", parsedEnumData[l].Data["enumDef"])
            break
          }
          if (l + 1 === parsedEnumData.length && parsedEnumData[l].Data["enumDef"] !== enumDefId) {
            console.log("ENUM ABSENT person ", enumDefId)
            var newEnumValues = await getEnumValues(enumDefId)
            saveEnumDataToIgnite(newEnumValues)
            // console.log("newEnumValues", newEnumValues)
            enumData.push(newEnumValues)
          }
        }
      }
    }
  }
  // console.log("EnumData", enumData)
  return enumData
}
// Getting Enum Data for other documents
async function getEnumData(Form) {
  console.log("Form", Form.formName)
  var enumData = []
  try {
    var igniteEnumData = await requestDataFromIgnite()
    var parsedEnumData = JSON.parse(igniteEnumData)
    for (var section = 0; section < Form.sections.length; section++) {
      // console.log("SECTION", JSON.stringify(Form.sections[i].contents))
      for (var item = 0; item < Form.sections[section].contents.length; item++) {
        // console.log("ENUMDEF NAME", Form.sections[section].contents[item].name, "ENUMDEF", Form.sections[section].contents[item].enumDef)
        if (Form.sections[section].contents[item].type === "Enum" || Form.sections[section].contents[item].type === "TransferList") {
          var enumDefId = Form.sections[section].contents[item].enumDef
          if (Form.sections[section].contents[item].custom === true) {
            var newEnumValues = await request(
              {
                "headers": { "content-type": "application/json" },
                "url": ismseApi + ConfigurationFile.enumConfig[enumDefId].api,
              }
            )
              .then(function (response) {
                // console.log("RESP CUSTOM ENUM", response)
                var resp = {
                  enumDef: enumDefId,
                  data: JSON.parse(response)
                }
                enumData.push(resp)
              })
              .catch(function (error) {
                console.log("Collecting enum data error: ", error)
              })
          }
          else {
            if (parsedEnumData.length === 0) {
              var newEnumValues = await getEnumValues(enumDefId)
              await saveEnumDataToIgnite(newEnumValues)
              // console.log("newEnumValues", newEnumValues)
              enumData.push(newEnumValues)
            }
            else {
              for (var l = 0; l < parsedEnumData.length; l++) {
                if (parsedEnumData[l].Data["enumDef"] === enumDefId) {
                  var newEnumList = {
                    enumDef: enumDefId,
                    data: parsedEnumData[l].Data["data"]
                  }
                  enumData.push(newEnumList)
                  break
                }
                if (l + 1 === parsedEnumData.length && parsedEnumData[l].Data["enumDef"] !== enumDefId) {
                  console.log("ENUM ABSENT", enumDefId)
                  var newEnumValues = await getEnumValues(enumDefId)
                  await saveEnumDataToIgnite(newEnumValues)
                  // console.log("newEnumValues", newEnumValues)
                  enumData.push(newEnumValues)
                }
              }
            }
          }
        }
      }
    }
    // console.log("Enums", enumData)
    return enumData
  }
  catch (er) {
    return []
  }
}
// Delete all enum data from Ignite to update it
async function clearEnumData(userId) {
  sendMessage({ userId: userId, messageType: "toast", toastText: "Очистка кэша справочных данных", toastType: "success" })
  var inMemoryCache = await requestDataFromIgnite(userId)
  var pasedInMemoryCache = JSON.parse(inMemoryCache)

  for (var i = 0; i < pasedInMemoryCache.length; i++) {
    if (pasedInMemoryCache[i].Data["type"] === "enumData") {
      var cacheId = pasedInMemoryCache[i].cacheId
      clearCache(cacheId)
    }
  }
}
// Get list of parentId to create user in REST
async function getParentIdList() {
  let orgIdList = await request(
    {
      "headers": { "content-type": "application/json" },
      "url": asistApi + "/users/GetOrganizationList"
    }
  )
    .then(function (response) {
      var data = JSON.parse(response)
      return data
    })
    .catch(function (error) {
      return console.log("Collecting orgIdList error: ", error)
    })
  // console.log("orgIdList", orgIdList)
  return orgIdList
}
// Get all data from Ignite
async function requestDataFromIgnite(userId) {
  var igniteEnumData = await request(
    {
      "headers": { "content-type": "application/json" },
      "url": cacheApi + "/InMemoryCache/GetList"
    }
  )
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      // console.log("Request Ignite error: ", error)
      sendMessage({ userId: userId, messageType: "toast", toastText: "Ошибка сбора кэша справочных данных", toastType: "error" })
      sendMessage({ userId: userId, messageType: "toast", toastText: error.message, toastType: "error" })
      return "[]"
    })
  return igniteEnumData
}
// Save Enum Data to Ignite
async function saveEnumDataToIgnite(newEnumValues) {
  // var newEnumValues = await getEnumValues(enumDefId)
  var dataToBeSaved = { "Data": newEnumValues }
  // console.log("dataToBeSaved", dataToBeSaved)
  request.post({
    "headers": { "content-type": "application/json" },
    "url": cacheApi + "/InMemoryCache/Save",
    "body": JSON.stringify(dataToBeSaved)

  }, (error, response, body) => {
    if (error) {
      return console.log("complete task error: ", error)
    }
    else {
      console.log("Created Data", body)
    }
  })
}
// Request Enum Data from Ignite
async function getEnumValues(enumDefId) {
  var newEnumValues = await request(
    {
      "headers": { "content-type": "application/json" },
      "url": ismseApi + "/Enum/GetEnumItems?enumDefId=" + enumDefId,
      "body": JSON.stringify(
        {
          "variables":
            { "enumDef": { "value": enumDefId, "type": "String" } }
        }
      )
    }
  )
    .then(function (response) {
      var data = {
        type: "enumData",
        enumDef: enumDefId,
        data: JSON.parse(response)
      }
      return data
    })
    .catch(function (error) {
      console.log("Collecting enum data error: ", error)
      var data = {
        type: "enumData",
        enumDef: enumDefId,
        data: []
      }
      return data
    })
  // console.log("newEnumValues", newEnumValues)
  return newEnumValues
}

//  Collect data related to Complaints form and send to client
async function sendAdultsStatesSelectingForm(message, restore) {
  let form = null
  let buttons = null
  let enumData = null
  if (message.form !== "null") {
    form = eval(message.form)
    buttons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.buttons]
    enumData = await getEnumData(form)
  }
  let messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let newCommandJSON =
  {
    messageType: messageType,
    session_id: message.session_id,
    process_id: message.process_id,
    taskID: message.taskID,
    taskType: message.taskType,
    selectedDoc: JSON.parse(message.selectedDoc),
    docId: message.docId,
    Form: form,
    formType: message.formType,
    person: message.person,
    documentViewForm: "edit",
    buttons: buttons,
    gridForm: null,
    gridFormButtons: null,
    docList: message.docList,
    size: message.size,
    page: message.page,
    enumData: enumData,
    SOAT: SOAT,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  sendMessage(newCommandJSON)
  // let form = adultsStatesEnumForm
  // let gridFormButtons = null
  // let buttons = Buttons[ConfigurationFile.rolesConfig[userRole]][formButtons]
  // let enumData = await getEnumData(form)

  // let messageType = "userTask"
  // if (restore === true) {
  //   messageType = "restoreTab"
  // }
  // let newCommandJSON = {
  //   messageType,
  //   taskType,
  //   enumData,
  //   Form: form,
  //   person,
  //   gridForm: null,
  //   docList,
  //   size,
  //   page,
  //   documentViewForm: "edit",
  //   selectedDoc: null,
  //   personEnumData: [],
  //   personFormType: null,
  //   formType,
  //   SOAT,
  //   gridFormButtons,
  //   buttons,
  //   taskID,
  //   session_id,
  //   process_id,
  //   docId,
  //   tabLabel,
  //   userId
  // }
  // sendMessage(newCommandJSON)
}

async function sendDownloadMedaktForm(message, restore) {
  let form = null
  let buttons = null
  let enumData = null
  if (message.form !== "null") {
    form = eval(message.form)
    buttons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.buttons]
    enumData = await getEnumData(form)
  }
  let messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let newCommandJSON =
  {
    messageType: messageType,
    session_id: message.session_id,
    process_id: message.process_id,
    taskID: message.taskID,
    taskType: message.taskType,
    selectedDoc: message.selectedDoc,
    Form: form,
    formType: message.formType,
    person: message.person,
    documentViewForm: "edit",
    buttons: buttons,
    gridForm: null,
    gridFormButtons: null,
    docList: message.docList,
    size: message.size,
    page: message.page,
    enumData: enumData,
    SOAT: SOAT,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  sendMessage(newCommandJSON)
}
//  Collect data related to ... form and send to client
// async function sendChildStatesSelectingForm(session_id, taskID, process_id, docId, taskType,
//   selectedDoc, formType, formButtons, docList, person, size, page, userRole, restore, tabLabel, userId) {
  async function sendChildStatesSelectingForm(message, restore){
  let form = childStatesEnumForm
  // let gridFormButtons = null
  let buttons = Buttons[ConfigurationFile.rolesConfig[userRole]][formButtons]
  let enumData = await getEnumData(form)

  let messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let newCommandJSON =
  {
    messageType: messageType,
    session_id: message.session_id,
    process_id: message.process_id,
    taskID: message.taskID,
    taskType: message.taskType,
    selectedDoc: null,
    docId: message.docId,
    Form: form,
    formType: message.formType,
    person: message.person,
    personEnumData: [],
    personFormType: null,
    documentViewForm: "edit",
    buttons: buttons,
    gridForm: null,
    gridFormButtons: null,
    docList: message.docList,
    size: message.size,
    page: message.page,
    enumData: enumData,
    SOAT: SOAT,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  sendMessage(newCommandJSON)

  // let newCommandJSON = {
  //   messageType,
  //   taskType,
  //   enumData,
  //   Form: form,
  //   person,
  //   gridForm: null,
  //   docList,
  //   size,
  //   page,
  //   documentViewForm: "edit",
  //   selectedDoc: null,
  //   personEnumData: [],
  //   personFormType: null,
  //   formType,
  //   SOAT,
  //   gridFormButtons,
  //   buttons,
  //   taskID,
  //   session_id,
  //   process_id,
  //   docId,
  //   tabLabel,
  //   userId
  // }
  // sendMessage(newCommandJSON)
}
// Section Of Forms and related Data
// Collecting all data related to the document and send it to client
async function sendPersonForm(message, restore) {
  let personForm = eval(message.form)
  let personEnumData = await getPersonEnumData(personForm)
  let buttons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.buttons]

  let gridFormButtons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.gridFormButtons]
  let messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let newCommandJSON =
  {
    messageType: messageType,
    session_id: message.session_id,
    process_id: message.process_id,
    taskID: message.taskID,
    taskType: message.taskType,
    selectedDoc: JSON.parse(message.selectedDoc),
    formType: message.formType,
    documentViewForm: personForm,
    buttons: buttons,
    gridFormButtons: gridFormButtons,
    docList: message.docList,
    size: message.size,
    page: message.page,
    enumData: personEnumData,
    SOAT: SOAT,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  sendMessage(newCommandJSON)
}

// Collect data related to Registration form and send to client
async function sendRegForm(message, restore) {
  let form = null
  let buttons = null
  let gridForm
  let gridFormButtons = null
  let personForm = null
  let personType = "view"
  let enumData = null
  if (message.form !== "null") {
    form = eval(message.form)
    buttons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.buttons]
    enumData = await getEnumData(form)
    let PlaceOfLivingValues = await getEnumValues("2D1C2089-B970-47FC-BD73-2F241FAC12B5")
    enumData.push(PlaceOfLivingValues)
  }
  if (message.gridForm !== "null") {
    gridForm = eval(message.gridForm)
    gridFormButtons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.gridFormButtons]
  }
  if (message.taskType === "showRegForm" || message.taskType === "showChildRegForm") {
    personForm = personViewForm
    gridForm = null
  }
  else if (message.taskType === "showRegSearchForm" || message.taskType === "showChildRegSearchForm") {
    personForm = personShortForm
    personType = "edit"
  }

  let personEnumData = await getPersonEnumData(personForm)

  let messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let newCommandJSON =
  {
    messageType: messageType,
    session_id: message.session_id,
    process_id: message.process_id,
    taskID: message.taskID,
    taskType: message.taskType,
    Form: form,
    buttons: buttons,
    selectedDoc: message.selectedDoc,
    docId: message.docId,
    enumData: enumData,
    formType: message.formType,
    person: message.person,
    personEnumData: personEnumData,
    personFormType: personType,
    documentViewForm: personForm,
    gridForm: gridForm,
    gridFormButtons: gridFormButtons,
    docList: message.docList,
    size: message.size,
    page: message.page,
    SOAT: SOAT,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  sendMessage(newCommandJSON)
}
// Collect data related to Detailed form and send to client
async function sendDetailedForm(message, restore) {
  let gridFormButtons = null
  let buttons = null
  let personType = "view"
  let form = null
  let gridForm = null
  let enumData = null
  let personForm = personViewForm
  let personEnumData = null

  if (message.form !== "null" && message.form !== "empty") {
    form = eval(message.form)
  }
  else if (message.form === "null") {
    // console.log("GET FORM BY ROLE", ConfigurationFile.adultsMedaktFormsConfig[message.userRole])
    if (message.taskType === "showDetailedForm") {
      // Adults Medakt
      form = eval(ConfigurationFile.adultsMedaktFormsConfig[message.userRole])
    }
    else {
      // Child Medakt
      form = eval(ConfigurationFile.childMedaktFormsConfig[message.userRole])
    }
  }
  else if (message.form === "empty") {
    form = null
  }
  if (message.gridForm !== "null") {
    gridForm = eval(message.gridForm)
    gridFormButtons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.gridFormButtons]
  }
  if (message.taskType === "showDetailedSearchForm" || message.taskType === "showChildDetailedSearchForm" ||
    message.taskType === "searchAdultsDetailedForm" || message.taskType === "searchChildDetailedForm") {
    personType = "edit"
    personForm = personShortForm
  }
  buttons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.buttons]
  if (form !== null) { 
    enumData = await getEnumData(form)
    let PlaceOfLivingValues = await getEnumValues("2D1C2089-B970-47FC-BD73-2F241FAC12B5")
    enumData.push(PlaceOfLivingValues)
  }
  personEnumData = await getPersonEnumData(personForm)

  let messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let newCommandJson = {
    messageType: messageType,
    taskType: message.taskType,
    Form: form,
    buttons: buttons,
    enumData: enumData,
    selectedDoc: message.selectedDoc,
    documentViewForm: personForm,
    adultsIPRForm: adultsIPRForm,
    docListIPR: message.docListIPR,
    docList: message.docList,
    size: message.size,
    page: message.page,
    userAction: message.userAction,
    person: message.person,
    personEnumData: personEnumData,
    personFormType: personType,
    gridForm: gridForm,
    gridFormButtons: gridFormButtons,
    IPRGridForm: IPRGridForm,
    formType: message.formType,
    SOAT: SOAT,
    taskID: message.taskID,
    docId: message.docId,
    session_id: message.session_id,
    process_id: message.process_id,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  // console.log("US ACT", )
  sendMessage(newCommandJson)
  get18Entries(message.userId)
}

// Collect data related to IPR form and send to client
async function sendIPRForm(message, restore) {
  let form = null
  let buttons = null
  let enumData = null
  let gridForm = null
  let gridFormButtons = null
  let personType = "view"
  if (message.form !== "null") {
    form = eval(message.form)
    buttons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.buttons]
    enumData = await getEnumData(form)
  }
  if (message.gridForm !== "null") {
    gridForm = eval(message.gridForm)
    gridFormButtons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.gridFormButtons]
  }
  if (message.taskType === "showIPRSearchForm" || message.taskType === "showChildIPRSearchForm") {
    personType = "edit"
  }
  let personEnumData = await getPersonEnumData(personShortForm)

  let messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let newCommandJSON =
  {
    messageType: messageType,
    session_id: message.session_id,
    process_id: message.process_id,
    taskID: message.taskID,
    taskType: message.taskType,
    Form: form,
    buttons: buttons,
    selectedDoc: message.selectedDoc,
    docId: message.docId,
    enumData: enumData,
    formType: message.formType,
    person: message.person,
    personEnumData: personEnumData,
    personFormType: personType,
    documentViewForm: personShortForm,
    gridForm: gridForm,
    gridFormButtons: gridFormButtons,
    docList: message.docList,
    size: message.size,
    page: message.page,
    SOAT: SOAT,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  sendMessage(newCommandJSON)
}
// Collect data related to UserForm form and send to client
async function sendUserForm(message, restore) {
  let form = null
  let buttons = null
  let enumData = null
  let gridForm = null
  let gridFormButtons = null

  if (message.form !== "null") {
    form = eval(message.form)
    buttons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.buttons]
    enumData = await getEnumData(form)
  }
  if (message.gridForm !== "null") {
    gridForm = eval(message.gridForm)
    gridFormButtons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.gridFormButtons]
  }

  let organizationIdList = await getParentIdList()
  // let organizationIdList = parentTestIdList

  var messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let newCommandJSON = {
    messageType: messageType,
    taskType: message.taskType,
    enumData: enumData,
    organizationIdList: organizationIdList,
    Form: form,
    selectedDoc: message.selectedDoc,
    gridForm: gridForm,
    docList: message.docList,
    size: message.size,
    page: message.page,
    documentViewForm: null,
    selectedDoc: message.selectedDoc,
    person: null,
    personEnumData: null,
    personFormType: "edit",
    formType: message.formType,
    SOAT: null,
    gridFormButtons: gridFormButtons,
    buttons: buttons,
    taskID: message.taskID,
    docId: null,
    session_id: message.session_id,
    process_id: message.process_id,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  sendMessage(newCommandJSON)
}
// Collect data related to MonitoringForm form and send to client
async function sendMonitoringForm(message, restore) {
  let form = null
  let buttons = null
  let enumData = null
  let gridForm = null
  let gridFormButtons = null

  if (message.form !== "null") {
    form = eval(message.form)
    buttons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.buttons]
    enumData = await getEnumData(form)
  }
  if (message.gridForm !== "null") {
    gridForm = eval(message.gridForm)
    gridFormButtons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.gridFormButtons]
  }

  let organizationIdList = await getParentIdList()
  // let organizationIdList = parentTestIdList

  let operators = []
  let parsedDocList = JSON.parse(message.docList)
  for(let i=0; i<parsedDocList.length; i++){
    if(parsedDocList[i].attributes.userRole[0] === "Оператор"){
      operators.push(parsedDocList[i])
    }
    console.log("U", parsedDocList[i])
  }

  var messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let newCommandJSON = {
    messageType: messageType,
    taskType: message.taskType,
    enumData: enumData,
    organizationIdList: organizationIdList,
    Form: form,
    selectedDoc: message.selectedDoc,
    gridForm: gridForm,
    docList: JSON.stringify(operators),
    size: message.size,
    page: message.page,
    documentViewForm: null,
    selectedDoc: message.selectedDoc,
    person: null,
    personEnumData: null,
    personFormType: "edit",
    formType: message.formType,
    SOAT: null,
    gridFormButtons: gridFormButtons,
    buttons: buttons,
    taskID: message.taskID,
    docId: null,
    session_id: message.session_id,
    process_id: message.process_id,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  sendMessage(newCommandJSON)
}
//  Collect data related to MemoForm form and send to client
async function sendMemoForm(message, restore) {
  let form = null
  let buttons = null
  let personFormType = "view"
  let personForm = personMemoForm
  let enumData = null

  if (message.form !== "null") {
    form = eval(message.form)
    buttons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.buttons]
    enumData = await getEnumData(form)
  }
  // if (message.gridForm !== "null") {
  //   gridForm = eval(message.gridForm)
  //   gridFormButtons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.gridFormButtons]
  // }
  let personEnumData = await getPersonEnumData(personMemoForm)

  let messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let newCommandJson = {
    messageType: messageType,
    taskType: message.taskType,
    enumData: enumData,
    Form: form,
    buttons: buttons,
    person: message.person,
    gridForm: null,
    gridFormButtons: null,
    docList: null,
    size: message.size,
    page: message.page,
    documentViewForm: personForm,
    selectedDoc: message.selectedDoc,
    personEnumData,
    personFormType: personFormType,
    formType: message.formType,
    SOAT: null,
    taskID: message.taskID,
    session_id: message.session_id,
    process_id: message.process_id,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  sendMessage(newCommandJson)
}
//  Collect data related to Complaints form and send to client
async function sendComplaintsAppealsForm(message, restore) {
  let form = null
  let buttons = null
  let personFormType = "view"
  let personForm = personShortForm
  let enumData = null
  let gridForm = null
  let gridFormButtons = null

  if (message.form !== "null") {
    form = eval(message.form)
    buttons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.buttons]
    enumData = await getEnumData(form)
  }
  if (message.gridForm !== "null") {
    gridForm = eval(message.gridForm)
    gridFormButtons = Buttons[ConfigurationFile.rolesConfig[message.userRole]][message.gridFormButtons]
  }
  if (message.taskType === "showSearchComplaintsForm") {
    personFormType = "edit"
  }
  else if (message.taskType === "showSearchAppealsForm") {
    personFormType = "edit"
  }
  let messageType = "userTask"
  if (restore === true) {
    messageType = "restoreTab"
  }
  let personEnumData = await getPersonEnumData(personShortForm)

  let newCommandJson = {
    messageType: messageType,
    taskType: message.taskType,
    enumData: enumData,
    Form: form,
    buttons: buttons,
    person: message.person,
    gridForm: gridForm,
    gridFormButtons: gridFormButtons,
    docList: message.docList,
    size: message.size,
    page: message.page,
    documentViewForm: personForm,
    selectedDoc: message.selectedDoc,
    docId: message.docId,
    personEnumData: personEnumData,
    personFormType: personFormType,
    formType: message.formType,
    SOAT: null,
    taskID: message.taskID,
    session_id: message.session_id,
    process_id: message.process_id,
    tabLabel: message.tabLabel,
    userId: message.userId
  }
  sendMessage(newCommandJson)
}
// Process of sending documents from one district to another
async function transferDocuments(message) {
  // console.log("TRANSFER MEDAKT", message)
  let createdDocIdList = [] // new docs
  let prevDocIdList = [] // previous docs
  let medakts = JSON.parse(message.medakts)
  for (let i = 0; i < medakts.length; i++) {
    prevDocIdList.push(medakts[i].id)
    let createMedakt = await postRequest("/Document/Create?defId=" + message.medaktDocDefId + "&userId=" + message.userId, { "attributes": medakts[i].attributes })
    let createdMedakt = JSON.parse(createMedakt)
    createdDocIdList.push(createdMedakt.id)
    // console.log("CREATED MEDAKT", createdMedakt)

    let IPR = JSON.parse(message.IPR)
    for (let l = 0; l < IPR.length; l++) {
      prevDocIdList.push(IPR[l].id)
      let newIPR = []
      for (let k = 0; k < IPR[l].attributes.length; k++) {
        let newItem = {}
        if (IPR[l].attributes[k].name === "AdultsMedicalCart") {
          newItem = {
            name: "AdultsMedicalCart",
            value: createdMedakt.id,
            type: "Doc"
          }
          newIPR.push(newItem)
        }
        else {
          newItem = {
            name: IPR[l].attributes[k].name,
            value: IPR[l].attributes[k].value,
            type: IPR[l].attributes[k].type
          }
          newIPR.push(newItem)
        }
      }
      let createIPR = await postRequest("/Document/Create?defId=" + message.IPRDocDefId + "&userId=" + message.userId, { "attributes": newIPR })
      let createdIPR = JSON.parse(createIPR)
      console.log("createdIPR", createdIPR)
      createdDocIdList.push(createdIPR.id)
    }
  }

  let variables = {
    userAction: { value: "transferDocuments" },
    newDocs: { value: JSON.stringify({ docIdList: createdDocIdList, stateTypeId: "32062CB7-C31C-4AFB-ADF3-F9F9AEEFCE59" }) },
    prevDocs: { value: JSON.stringify({ docIdList: prevDocIdList, stateTypeId: "D203372C-236B-4B3E-953A-11F09A4ACA61" }) }
  }
  await completeTask(variables, message.taskID)
}
async function postRequest(api, body) {
  // console.log("POST", api, body)
  var createdDoc = await request.post({
    "headers": { "content-type": "application/json" },
    "url": ismseApi + api,
    "body": JSON.stringify(body)
  }, (error, response, body) => {
    if (error) {
      return console.log("call REST error: ", error)
    }
    // console.log('BODY', body)
    return body
  })
  return createdDoc
}

// send message to user
async function sendMessage(message) {
  console.log("SEND MESSAGE TO", message.userId)

  for (let key in clients) {
    if (clients[key].userId === message.userId) {
      session_id = clients[key].session_id
      await clients[session_id].send(JSON.stringify(message))
    }
  }
}

async function deployProcesses() {
  for (let i = 0; i < processesToDeploy.length; i++) {
    let dirPath = processesToDeploy[i]
    var files = fs.readdirSync(dirPath)
    for (let f = 0; f < files.length; f++) {
      // console.log("FILES", files[f])
      let form = new FormData()
      form.append('deployment-name', files[f].substring(0, files[f].length - 5))
      form.append('data', fs.createReadStream(processesToDeploy[i] + files[f]))
      const options = {
        url: CamundaApiHost + '/deployment/create',
        method: 'POST',
        data: form,
        headers: form.getHeaders()
      }
      try {
        const response = await axios(options)
        console.log("DEPLOY", files[f])
        if (i === processesToDeploy.length - 1) {
          if (f === files.length - 1) {
            sendMessage({ userId: incomingJson.userId, messageType: "toast", toastText: "Процесс завершен", toastType: "success" })
            console.log("DEPLOYMENT COMPLITED")
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
async function deleteDeployments(all, incomingJson) {
  if (all === true) {
    console.log("SEND MESS", incomingJson.userId)
    sendMessage({ userId: incomingJson.userId, messageType: "toast", toastText: "Процесс запущен", toastType: "success" })
  }
  let deletingComplited = false
  await request(
    {
      "headers": { "content-type": "application/json" },
      "url": CamundaApiHost + "/deployment",
      "method": 'GET'
    }
  )
    .then(async function (response) {
      let deployments = JSON.parse(response)
      // console.log("DEP LIST", deployments.length)
      if (deployments.length === 0) {
        deployProcesses()
      }
      else {
        for (let i = 0; i < deployments.length; i++) {
          let deploymentId = null
          if (all === true) {
            deploymentId = deployments[i].id
          }
          else {
            if (deployments[i].source === "process application") {
              deploymentId = deployments[i].id
            }
          }
          if (deploymentId !== null) {
            await request(
              {
                "headers": { "content-type": "application/json" },
                "url": CamundaApiHost + "/deployment/" + deploymentId + "?cascade=true",
                "method": 'DELETE'
              }
            )
              .then(function (response) {
                console.log("DELETE ", deploymentId)
              })
              .catch(function (error) {
                return console.log("ERROR: ", error)
              })
          }

          if (i === deployments.length - 1) {
            deletingComplited = true
          }
        }
      }
    })
    .catch(function (error) {
      return console.log("ERROR: ", error)
    })
  if (deletingComplited === true && all === true) {
    deployProcesses()
  }
}
deleteDeployments(false, null)
// Create random client id
function getUUID() {
  const uuidv1 = require("uuid/v1")
  return uuidv1();
}
async function sendToast(message) {
  // console.log("TOAST", message)
  for (var key in clients) {
    if (clients[key].userId === message.userId) {
      session_id = clients[key].session_id
      await clients[session_id].send(JSON.stringify({
        messageType: "toast",
        toastText: message.selectedDoc,
        toastType: message.formType
      }))
      let vars = {
        userAction: { value: "cancel" }
      }
      setTimeout(completeTask, 2000, vars, message.taskID)
    }
  }
}
async function get18Entries(userId) {
  await request(
    {
      "headers": { "content-type": "application/json" },
      "url": ismseApi + "/BusinessNotifications/Get18Entries?userId=" + userId + "&page=1&size=1000",
      "method": 'POST',
      "body": JSON.stringify({})
    }
  )
    .then(async function (response) {
      let list = JSON.parse(response)
      if (list.isSuccess === true) {
        // console.log("CHILD LIST", list.data.length)
        sendMessage({ userId: userId, messageType: "ChildList", total: list.data.length })
      }
      else {
        console.log("CHILD LIST COLLECT ERR", list.errorMessage)
      }
    })
    .catch(function (error) {
      return console.log("ERROR: ", error)
    })
}

// WebSocket-server
var webSocketServer = new WebSocketServer.Server({ port: wsport })
webSocketServer.on("connection", function (ws) {
  var id = getUUID()
  clients[id] = ws
  console.log("New connection with " + id)
  clients[id].send(JSON.stringify({ messageType: "session_id", session_id: id }))

  // console.log("Sending session_id", id)
  ws.on("message", async function (message) {
    // console.log("Incoming message " + message)
    incomingJson = JSON.parse(message)
    if (incomingJson.commandType === "launchProcess") {
      console.log("Start Process", incomingJson.variables.tabLabel.value);
      startCamundaProcess(incomingJson.processKey, incomingJson.variables)
    }
    else if (incomingJson.commandType === "completeTask") {
      // console.log("COMPLETE TASK", incomingJson)
      completeTask(incomingJson.variables, incomingJson.taskID)
    }
    else if (incomingJson.commandType === "userRole") {
      clients[incomingJson.session_id].userRole = incomingJson.userRole
      clients[incomingJson.session_id].userId = incomingJson.userId
      clients[incomingJson.session_id].session_id = incomingJson.session_id
      let userRole = clients[incomingJson.session_id].userRole
      let routes = dashboardRoutes[ConfigurationFile.rolesConfig[userRole]]
      clients[incomingJson.session_id].send(JSON.stringify({ messageType: "Menu", routes }))
      console.log("Sending routes to", userRole, incomingJson.session_id)

      get18Entries(incomingJson.userId)
    }
    else if (incomingJson.commandType === "restoreSession") {
      console.log("restoreSession for ", incomingJson.userRole)
      await restoreSession(incomingJson.userId, incomingJson.session_id, incomingJson.userRole)
    }
    else if (incomingJson.commandType === "clearEnumData") {
      console.log("clearing EnumData", incomingJson.userRole)
      await clearEnumData(incomingJson.userId)
    }
    else if (incomingJson.commandType === "redeploy") {
      deleteDeployments(true, incomingJson)
    }
    else if (incomingJson.commandType === "transferDocuments") {
      transferDocuments(incomingJson)
      // await transferDocuments(incomingJson.taskID, incomingJson.userId, JSON.parse(incomingJson.medakts),
      //   JSON.parse(incomingJson.IPR), incomingJson.medaktDocDefId, incomingJson.IPRDocDefId)
    }
    else if (incomingJson.commandType === "saveImages") {
      console.log("saveImages", incomingJson.path)
      let dirPath = "C:/ScannedFiles/" + incomingJson.path
      var folderCreated = false
      try {
        fs.mkdirSync(dirPath)
        folderCreated = true
      }
      catch (e) {
        folderCreated = true
        // console.log(e)
      }
      if (folderCreated === true) {
        var lastImgSaved = false
        for (let i = 0; i < incomingJson.blobs.length; i++) {
          var buf = new Buffer.alloc(incomingJson.blobs[i].size, incomingJson.blobs[i].blob, 'base64') // decode
          fs.writeFile("C:/ScannedFiles/" + incomingJson.path + "/" + incomingJson.blobs[i].name + ".png", buf, function (err) {
            console.log(incomingJson.blobs[i].name)
            if (err) {
              console.log("err", err)
            }
            else {
              console.log('success')
            }
          })
          if (i === incomingJson.blobs.length) {
            lastImgSaved = true
          }
        }
        if (lastImgSaved = true) {
          clients[incomingJson.session_id].send(JSON.stringify({ messageType: "notification", text: "Сохранение успешно завершено", icon: "success" }))
        }
      }
    }
    else if (incomingJson.commandType === "loadPreviouslyScannedImages") {
      let dirPath = "C:/ScannedFiles/" + incomingJson.path
      console.log("LOAD FROM", dirPath)
      //passsing directoryPath and callback function
      fs.readdir(dirPath, function (err, files) {
        //handling error
        if (err) {
          console.log('Unable to scan directory: ' + err)
          clients[incomingJson.session_id].send(JSON.stringify({ messageType: "notification", text: "У данного документа нет сканов!", icon: "warning" }))
        }
        else {
          if (files.length === 0) {
            // directory appears to be empty
            clients[incomingJson.session_id].send(JSON.stringify({ messageType: "notification", text: "У данного документа нет сканов!", icon: "warning" }))
          }
          else {
            files.forEach(function (file) {
              //listing all files using forEach
              // console.log("IMG ", file)
              fs.readFile(dirPath + "/" + file, 'base64', function (err, content) {
                if (err) {
                  console.log("err", err)
                }
                else {
                  let imgName = file.substring(0, 36)
                  clients[incomingJson.session_id].send(JSON.stringify({ messageType: "LoadImages", content: content, docId: incomingJson.docId, name: imgName }))
                }
              })
            })
          }
        }
      })
    }
    else if (incomingJson.commandType === "deleteScannedImage") {
      let dirPath = "C:/ScannedFiles/" + incomingJson.path + "/" + incomingJson.fileName
      console.log("DELETE FROM", dirPath)
      try {
        fs.unlink(dirPath, function (err) {
          console.log("Successfully deleted")
        })
      }
      catch (err) {
        console.log("Deleting error", err)
      }
      //passsing directoryPath and callback function
    }
  })

  ws.on("close", function () {
    console.log("Connection closed " + id)
    delete clients[id];
  })
})
console.log("WS server works on port", wsport)
async function sendRabbitMessage(msg) {
  var message = JSON.parse(msg)
  console.log("RABBIT MESSAGE", message.taskType)
  var session_id = message.session_id
  for (var key in clients) {
    if (clients[key].userId === message.userId) {
      session_id = clients[key].session_id
    }
  }
  if (message.taskType === "showPersonForm" || message.taskType === "showPersonFormNRSZ") {
    // var selectedDoc = JSON.parse(message.selectedDoc)
    sendPersonForm(message, false)  }
  else if (message.taskType === "showRegForm" || message.taskType === "showRegSearchForm" ||
    message.taskType === "showChildRegForm" || message.taskType === "showChildRegSearchForm") {
    sendRegForm(message, false)
  }
  else if (message.taskType === "showDetailedForm" || message.taskType === "showDetailedSearchForm" ||
    message.taskType === "showChildDetailedForm" || message.taskType === "showChildDetailedSearchForm" ||
    message.taskType === "searchAdultsDetailedForm" || message.taskType === "searchChildDetailedForm") {
    sendDetailedForm(message, false)
  }
  else if (message.taskType === "showAdultsStatesSelectingForm") {
    sendAdultsStatesSelectingForm(message, false)
  }
  else if (message.taskType === "showDownloadAdultsMedaktForm" || message.taskType === "showDownloadChildMedaktForm") {
    sendDownloadMedaktForm(message, false)
  }
  else if (message.taskType === "showChildStatesSelectingForm") { // Func deleted
    // await sendChildStatesSelectingForm(session_id, message.taskID, message.process_id, message.docId,
    //   message.taskType, message.selectedDoc, message.formType,
    //   message.buttons, message.docList, message.person,
    //   message.size, message.page, message.userRole, false, message.tabLabel, message.userId)
    await sendChildStatesSelectingForm(message, false)
  }
  else if (message.taskType === "showIPRForm" || message.taskType === "showIPRSearchForm" ||
    message.taskType === "showChildIPRForm" || message.taskType === "showChildIPRSearchForm") {
    sendIPRForm(message, false)
  }
  else if (message.taskType === "showCreateUser" || message.taskType === "showSearchUser" || message.taskType === "showEditUser") {
    sendUserForm(message, false)
  }
  else if (message.taskType === "showUserMonitoring") {
    sendMonitoringForm(message, false)
  }
  else if (message.taskType === "showMemoForm") {
    sendMemoForm(message, false)
  }
  else if (message.taskType === "showComplaintsForm" || message.taskType === "showSearchComplaintsForm" ||
    message.taskType === "showAppealsForm" || message.taskType === "showSearchAppealsForm") {
    sendComplaintsAppealsForm(message, false)
  }
  else if (message.taskType === "showToast") {
    sendToast(message)
  }
}

// Rabbit MQ server
amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1
    }
    var queue = 'hello'
    channel.assertQueue(queue, {
      durable: false
    })
    console.log("Waiting for messages from Camunda")
    channel.consume(queue, function (msg) {
      sendRabbitMessage(msg.content.toString())
    }, {
      noAck: true
    })
  })
})



