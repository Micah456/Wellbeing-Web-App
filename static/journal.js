const journalEntriesDivEl = document.getElementById("journal-entries-div")
const appDataKey = 'wellbeing web app data'
const newEntryBtnEl = document.getElementById("new-entry-btn")
const writeEntryDivEl = document.getElementById("write-entry-div")
const closeWriteEntryBtn = document.getElementById("close-write-entry-btn")
const noEntriesNewEntryBtnEl = document.getElementById("no-entries-new-entry-btn")
const defaultAppData = {
    "mood-logger-data" :[],
    "journal-data" :[]
}
const testData = [
    {
        "Title" : "Test Entry 1",
        "Content" : "Test Content 1",
        "Date Created" : Date.now(),
        "Last Modified" : Date.now()
    },
    {
        "Title" : "Test Entry 2",
        "Content" : "Test Content 2",
        "Date Created" : Date.now(),
        "Last Modified" : Date.now()
    },
    {
        "Title" : "Test Entry 3",
        "Content" : "Test Content 3",
        "Date Created" : Date.now(),
        "Last Modified" : Date.now()
    }
]

function formatDate(date){
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const time = date.toLocaleTimeString()
    return `${day}/${month}/${year} ${time}`
}

function createEntryListItemEl(entryObject){
    //Creates an entry list item div element from
    //Entry data object in format in the testData
    const entryListItemEl = document.createElement("div")
    entryListItemEl.className = "entry-list-item-div"
    const date = formatDate(new Date(entryObject['Date Created']))
    entryListItemEl.innerHTML = 
        `<p>${entryObject['Title']}</p><p>${date}</p>`
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



