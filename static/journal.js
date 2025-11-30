const journalEntriesDivEl = document.getElementById("journal-entries-div")
const appDataKey = 'wellbeing web app data'
const newEntryBtnEl = document.getElementById("new-entry-btn")
const writeEntryDivEl = document.getElementById("write-entry-div")
const readEntryDivEl = document.getElementById("read-entry-div")
const closeWriteEntryBtn = document.getElementById("close-write-entry-btn")
const noEntriesNewEntryBtnEl = document.getElementById("no-entries-new-entry-btn")
const defaultAppData = {
    "mood-logger-data" :[],
    "journal-data" :[]
}

function deleteEntry(entry){
    alert("Delete: To be implemented")
}

function editEntry(entry){
    alert("Edit: To be implemented")
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

//Event Listeners
newEntryBtnEl.addEventListener("click", () => {
    writeEntryDivEl.style.visibility = "visible"
})
closeWriteEntryBtn.addEventListener("click", () => {
    writeEntryDivEl.style.visibility = "hidden"
})
noEntriesNewEntryBtnEl.addEventListener("click", () => {
    writeEntryDivEl.style.visibility = "visible"
})

//First check localstorage for app data
if(!localStorage.getItem(appDataKey)){
    localStorage.setItem(appDataKey, JSON.stringify(defaultAppData))
}

//Read and display entries
const appData = JSON.parse(localStorage.getItem(appDataKey))
if(appData && appData['journal-data'].length > 0){
    journalEntriesDivEl.innerHTML = ""
    appData['journal-data'].forEach(entry => {
        journalEntriesDivEl.appendChild(createEntryListItemEl(entry))
        if(appData[appData.length-1] != entry){
            const divider = document.createElement("hr")
            divider.className = "solid-line"
            journalEntriesDivEl.appendChild(divider)
        }
    })
}



