const journalEntriesDivEl = document.getElementById("journal-entries-div")
const appDataKey = 'wellbeing web app data'
const newEntryBtnEl = document.getElementById("new-entry-btn")
const writeEntryDivEl = document.getElementById("write-entry-div")
const readEntryDivEl = document.getElementById("read-entry-div")
const closeWriteEntryBtn = document.getElementById("close-write-entry-btn")
const titleInputEl = document.getElementById("title-input")
const entryTextAreaEl = document.getElementById("entry-textarea")
const saveEntryBtnEl = document.getElementById("save-entry-btn")
const deleteJournalBtnEl = document.getElementById("delete-journal-btn")
let dateCreated = null

const defaultAppData = {
    "mood-logger-data" :[],
    "journal-data" :[]
}

function checkLocalStorage(){
    //If appData not present in local storage
    //Create default data and assign to appDataKey
    if(!localStorage.getItem(appDataKey)){
        localStorage.setItem(appDataKey, JSON.stringify(defaultAppData))
    }
}

function deleteEntry(entry){
    const appData = JSON.parse(localStorage.getItem(appDataKey))
    try{
        const entryIndex = findEntryIndex(appData['journal-data'], entry['Date Created'])
        appData['journal-data'].splice(entryIndex, 1)
        localStorage.setItem(appDataKey, JSON.stringify(appData))
    }catch(error){
        alert("An error occurred: " + error.message)
        return
    }
    alert("Entry Successfully deleted")
    buildAndDisplayEntries()
    readEntryDivEl.style.visibility = "hidden"
}

function deleteJournal(){
    const result = confirm("Delete all entries?")
    if(result){
        const appData = JSON.parse(localStorage.getItem(appDataKey))
        appData['journal-data'] = []
        localStorage.setItem(appDataKey, JSON.stringify(appData))
        buildAndDisplayEntries()
    }
    
}

function createEntry(){
    dateCreated = null
    titleInputEl.value = ""
    entryTextAreaEl.value = ""
    writeEntryDivEl.style.visibility = "visible"
}

function editEntry(entry){
    dateCreated = entry['Date Created']
    readEntryDivEl.style.visibility = "hidden"
    titleInputEl.value = entry["Title"]
    entryTextAreaEl.value = entry["Content"]
    writeEntryDivEl.style.visibility = "visible"
}

function saveEntry(){
    //Validate Entry
    const title = titleInputEl.value.trim()
    const content = entryTextAreaEl.value.trim()
    let dc = 0
    const lm = Date.now()
    let successfulSaveMessage = ""
    if(!(title && content)){
        alert("Your entry needs a title and content")
        return
    }
    //Check dateCreated variable
    if(dateCreated) {
        dc = dateCreated
        successfulSaveMessage = "Entry Updated Successfully"
    }
    else {
        dc = lm
        successfulSaveMessage = "Entry Saved Successfully"
    }
    //Create entry object
    const newEntry = {
        "Title" : title,
        "Content" : content,
        "Date Created" : dc,
        "Last Modified" : lm
    }
    try{
        checkLocalStorage()
        const appData = JSON.parse(localStorage.getItem(appDataKey))
        if(dateCreated){
            let entryIndex = findEntryIndex(appData['journal-data'], dateCreated)
            if(entryIndex == -1){
                appData['journal-data'].push(newEntry)
            }
            else{
                appData['journal-data'][entryIndex] = newEntry
            }
        }
        else{
            appData['journal-data'].push(newEntry)
        }
        localStorage.setItem(appDataKey, JSON.stringify(appData))
    }catch(error){
        alert("An error occurred: " + error.message)
        return
    }
    alert(successfulSaveMessage)
    closeWriteEntryBtn.click()
    buildAndDisplayEntries()
}

function findEntryIndex(journal, id){
    //id is dateCreated
    for(let i = 0; i < journal.length; i++){
        if(journal[i]['Date Created'] === id){
            return i
        }
    }
    return -1
}

function formatDate(date, longFomat){
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    
    if(longFomat){
        const time = date.toLocaleTimeString()
        return `${day}/${month}/${year} ${time}`
    }
    else{
        return `${day}/${month}/${year}`
    }
    
}

function createEntryHeaderDiv(title){
    const divEl = document.createElement("div")
    divEl.className = "entry-header"
    //Create title
    const titleH2El = document.createElement("h2")
    titleH2El.textContent = title
    divEl.appendChild(titleH2El)
    //Create close button with eventListener
    const closeBtnEl = document.createElement("button")
    closeBtnEl.id = "close-read-entry-btn"
    closeBtnEl.addEventListener("click", () => {
        readEntryDivEl.style.visibility = "hidden"
    })
    closeBtnEl.innerHTML = `<img src="https://www.svgrepo.com/show/510355/x.svg"alt="Close Entry"/>`
    divEl.appendChild(closeBtnEl)
    return divEl
}

function createDateDiv(dateCreatedString, lastModifiedString){
    const divEl = document.createElement("div")
    divEl.className = "entry-dates-div"
    divEl.innerHTML = 
        `
            <div>
                <p>Date Created</p>
                <p>${dateCreatedString}</p>
            </div>
            <div>
                <p>Last Modified</p>
                <p>${lastModifiedString}</p> 
            </div>
        `
    return divEl
}

function createContentParagraph(content){
    const pEl = document.createElement("p")
    pEl.className = "entry-content"
    pEl.textContent = content
    return pEl
}

function createEntryActionBtnDiv(entry){
    const divEl = document.createElement("div")
    divEl.className = "entry-action-btns-div"
    const deleteEntryBtnEl = document.createElement("button")
    deleteEntryBtnEl.innerHTML = `<img src="https://www.svgrepo.com/show/510280/trash.svg" alt="Delete Entry"/>`
    deleteEntryBtnEl.addEventListener("click", () => {
        deleteEntry(entry)
    })
    const editEntryBtnEl = document.createElement("button")
    editEntryBtnEl.innerHTML = `<img src="https://www.svgrepo.com/show/509911/edit.svg"alt="Edit Entry"/>`
    editEntryBtnEl.addEventListener("click", () => {
        editEntry(entry)
    })
    divEl.appendChild(deleteEntryBtnEl)
    divEl.appendChild(editEntryBtnEl)
    return divEl
}

function readEntry(entry){
    //Set readEntry details to that of entry
    readEntryDivEl.innerHTML = ""
    const title = entry['Title']
    const content = entry['Content']
    const dateCreatedString = formatDate(new Date(entry['Date Created']), false)
    const lastModifiedString = formatDate(new Date(entry['Last Modified']), false)
    const innerDiv = document.createElement("div")
    innerDiv.appendChild(createEntryHeaderDiv(title))
    innerDiv.appendChild(createDateDiv(dateCreatedString, lastModifiedString))
    innerDiv.appendChild(createContentParagraph(content))
    innerDiv.appendChild(createEntryActionBtnDiv(entry))
    readEntryDivEl.appendChild(innerDiv)
    //Show readEntryDiv
    readEntryDivEl.style.visibility = "visible"
}

function createEntryListItemEl(entryObject){
    //Creates an entry list item div element from
    //Entry data object
    const entryListItemEl = document.createElement("div")
    entryListItemEl.className = "entry-list-item-div"
    const date = formatDate(new Date(entryObject['Date Created']), true)
    entryListItemEl.innerHTML = 
        `<p>${entryObject['Title']}</p><p>${date}</p>`
    entryListItemEl.addEventListener("click", () => {
        readEntry(entryObject)
    })
    return entryListItemEl
}

function buildAndDisplayEntries(){
    const appData = JSON.parse(localStorage.getItem(appDataKey))
    journalEntriesDivEl.innerHTML = ""
    if(appData && appData['journal-data'].length > 0){
        
        appData['journal-data'].forEach(entry => {
            journalEntriesDivEl.appendChild(createEntryListItemEl(entry))
            if(appData[appData.length-1] != entry){
                const divider = document.createElement("hr")
                divider.className = "solid-line"
                journalEntriesDivEl.appendChild(divider)
            }
        })
    }
    else{
        const pEl = document.createElement("p")
        pEl.style.textAlign = "center"
        pEl.style.fontSize = "1.5rem"
        pEl.textContent = "No Entries - Create one now!"
        const btnEl = document.createElement("button")
        btnEl.textContent = "New Entry"
        btnEl.addEventListener("click", createEntry)
        journalEntriesDivEl.appendChild(pEl)
        journalEntriesDivEl.appendChild(btnEl)
    }
}

//Event Listeners
newEntryBtnEl.addEventListener("click", createEntry)
saveEntryBtnEl.addEventListener("click", saveEntry)
deleteJournalBtnEl.addEventListener("click", deleteJournal)
closeWriteEntryBtn.addEventListener("click", () => {
    dateCreated = null
    writeEntryDivEl.style.visibility = "hidden"
})
//First check localstorage for app data
checkLocalStorage()

//Read and display entries
buildAndDisplayEntries()



