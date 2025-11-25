//Feelings equation: n + total/3 + (n-2)
//Where n = row number
//Where total is total of rows below the first row

//const { createElement } = require("react")

//i.e. total sub-emotions
const feelingsBtnDivEl = document.getElementById("feelings-btn-div")
const devWebServerAddress = "http://127.0.0.1:5000"
let feelingsData = {}

function nextEmotions(emotion){
    //console.log(feelingsData[emotion])
    if(Object.prototype.toString.call(feelingsData[emotion]) === '[object Array]'){
        createEmotionBtns(feelingsData[emotion], finalEmotion)
    }
    else{
        createEmotionBtns(Object.keys(feelingsData[emotion]), nextEmotions)
        feelingsData = feelingsData[emotion]
    }
}

function finalEmotion(emotion){
    console.log(emotion)
    feelingsBtnDivEl.innerHTML = `
        <p style="font-size:2rem; text-align: center;">You are feeling: ${emotion}</p>
    `
    feelingsBtnDivEl.style.display = 'flex'
}

function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

function createEmotionBtns(feelingsArray, onclickEventFunction){
    //Empties all child elements of the feelingsBtnDiv
    //And replaces them with emotion button elements
    //Based on the array argument
    //Also add the onclick event function argument to the buttons
    removeAllChildNodes(feelingsBtnDivEl)
    console.log(feelingsArray)
    feelingsArray.forEach((emotion) => {
        const emotionBtn = document.createElement('button')
        emotionBtn.id = emotion
        emotionBtn.textContent = emotion
        emotionBtn.addEventListener("click", event => onclickEventFunction(event.target.id))
        feelingsBtnDivEl.appendChild(emotionBtn)
    })
}

//Get data from server
fetch(devWebServerAddress + '/data/feelings')
    .then(response => response.json())
    .then(data => {
        feelingsData = data
        //Show core emotions
        feelingsBtnDivEl.style.display = 'grid'
        createEmotionBtns(Object.keys(feelingsData), nextEmotions)
    })

