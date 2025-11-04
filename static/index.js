const downloadBtnEl = document.getElementById("download-btn");
const uploadBtnEl = document.getElementById("upload-btn");
const resetBtnEl = document.getElementById("reset-btn");
const readFileInputEl = document.getElementById("readFileInput");
const appDataKey = 'wellbeing web app data'
const userBackupDataFileName = "wba_data.txt"
const defaultAppData = {
    "mood-logger-data" :[],
    "journal-data" :[]
}

readFileInputEl.addEventListener("change", readFile)

function readFile(event){
    ///Reads file data once it has been selected from the event
    ///And saves it in the local storage

    //Read file
    const file = event.target.files[0]
    if(!file){
        console.error("No file selected")
        alert("Something went wrong: no file selected.")
        return
    }
    const reader = new FileReader()
    //Save data or display error
    reader.onload = () => {
        const fileData = reader.result
        if(fileInvalid(fileData)){
            console.error("Something went wrong: incompatible file")
            alert("Something went wrong: incompatible file")
            return
        }
        console.log("File contents: " + fileData)
        localStorage.setItem(appDataKey, fileData)

    } 
    reader.onerror = () => {
        const error = reader.error
        console.error("Error reading file: ", error)
        alert("Something went wrong: " + error)
    }
    reader.readAsText(file)
}

function fileInvalid(fileData){
    // Checks the file is NOT in JSON structure and/or doesn't have expected attributes
    // Returns true if invalid, false if not

    //Check JSON structure
    try{
        const fileDataObj = JSON.parse(fileData)
        if(!fileDataObj.hasOwnProperty("mood-logger-data") || !fileDataObj.hasOwnProperty("journal-data")){
            return true
        }
    }catch(error){
        return true
    }
    return false
}

function downloadFile(content, fileName){
    //Downloads file called 'fileName' with content 'content'
    const file = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    console.log("Download start")

    // Cleanup
    setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        console.log("cleanup done")
    }, 0);
}

function downloadData(){
    //Downloads app (local storage) data to wherever user
    //wants to save it
    console.log("Downloading data...")
    let appData = localStorage.getItem(appDataKey)
    if(appData){
        //Allow user to save data to a .txt file
        downloadFile(appData, userBackupDataFileName)
        return
    }
    console.log("No data.")
}

function uploadData(){
    //Replaces app (local storage) data with whatever
    //The user uploads. This is handled by readFileInputEl
    console.log("Uploading data...")
    readFileInputEl.value="" //Allows the same file to be uploaded
    readFileInputEl.click()
}

function resetData(){
    //Replaces app (local storage) data with empty arrays
    console.log("Resetting data...")
    localStorage.setItem(appDataKey, JSON.stringify(defaultAppData))
}

downloadBtnEl.addEventListener("click", downloadData)
uploadBtnEl.addEventListener("click", uploadData)
resetBtnEl.addEventListener("click", resetData)

