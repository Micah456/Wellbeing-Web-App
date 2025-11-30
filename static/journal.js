const journalEntriesDivEl = document.getElementById("journal-entries-div")
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

testData.forEach(entry => {
    journalEntriesDivEl.appendChild(createEntryListItemEl(entry))
    if(testData[testData.length-1] != entry){
        const divider = document.createElement("hr")
        divider.className = "solid-line"
        journalEntriesDivEl.appendChild(divider)
    }
})

