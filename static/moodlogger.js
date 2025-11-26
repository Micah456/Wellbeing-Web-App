const moodloggerBtnDivEl = document.getElementById("moodlogger-btn-div")
const instructionEl = document.getElementById("instruction")
const moodEls = Array.from(moodloggerBtnDivEl.children)
const appDataKey = 'wellbeing web app data'
const defaultAppData = {
    "mood-logger-data" :[],
    "journal-data" :[]
}

function createMood(moodValue){
    return {
        "timestamp" : Date.now(),
        "moodValue" : moodValue
    }
}

function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

function saveMood(event){
    try{
        const moodtext = event.target.id
        const moodSrc = event.target.src
        const moodAlt = event.target.alt
        const moodValue = Number(moodtext.substring(4,5))
        const userData = JSON.parse(localStorage.getItem(appDataKey))
        userData["mood-logger-data"].push(createMood(moodValue))
        localStorage.setItem(appDataKey, JSON.stringify(userData))
        moodSaved(moodtext, moodSrc, moodAlt)
    }catch(error){
        alert("Unable to store mood: " + error)
    }
    
}

function moodSaved(moodText, moodSrc, moodAlt){
    console.log(`Mood ${moodText} saved successfully`)
    removeAllChildNodes(moodloggerBtnDivEl)
    const selectedMoodEl = document.createElement("img")
    selectedMoodEl.src = moodSrc
    selectedMoodEl.style.width = "20vw"
    moodloggerBtnDivEl.appendChild(selectedMoodEl)
    instructionEl.textContent = `You are feeling: ${moodAlt}`

}

//First check localstorage for app data
if(!localStorage.getItem(appDataKey)){
    localStorage.setItem(appDataKey, JSON.stringify(defaultAppData))
}

//Add event listeners to emoji btns
for(let i = 0; i < moodEls.length; i++){
    moodEls[i].addEventListener('click', event => saveMood(event))
}

