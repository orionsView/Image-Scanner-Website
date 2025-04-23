document.getElementById("displayUserNameButon").addEventListener("click", function (event) {
    const userNameTitle = document.getElementById("userNameTitle");
    userNameTitle.textContent = "User Name: " + localStorage.getItem("userName") + " " + localStorage.getItem("userID");
})


document.getElementById("fileInput").addEventListener("change", function (event) {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;
    console.log(files);

    let usedMetaDataObjectArray = [];

    // const sharedBuffer = new SharedArrayBuffer(4); // 4 bytes = 1 Int32
    // const counter = new Int32Array(sharedBuffer);
    let counter = 0;

    for (let i = 0; i < files.length; i++) {
    const file = files[i];
    EXIF.getData(file, function () {
        var allMetaData = EXIF.getAllTags(this);
        console.log(allMetaData);
        console.log("fnum: ", allMetaData["FNumber"]);

        getMakeID(allMetaData["Make"]).then(makeID => {
            usedMetaDataObjectArray[i] = {
                "customerID": localStorage.getItem("userID"),
                "fNum": allMetaData["FNumber"],
                "shutterSpeed": reformatShutterSpeed(allMetaData["ExposureTime"]),
                "timeTaken": refromatDateTime(allMetaData["DateTime"]),
                "ISO": allMetaData["ISOSpeedRatings"],
                "focalLength": allMetaData["FocalLength"],
                "artistName": allMetaData["Artist"],
                "makeID": makeID
            }


            console.log(usedMetaDataObjectArray[i]);
            const botText = document.getElementById("bottomText");
            botText.innerHTML = "<span style='font-weight: bold;'>Add Meta Data?</span><br>" + makeMetaDataString(usedMetaDataObjectArray[i]);

            // Atomics.add(counter, 0, 1);
            counter++;

            const confirmButton = document.getElementById("confirmButton");
            if(counter == files.length) {
                confirmButton.textContent = "Confirm?";
                confirmButton.addEventListener("click", function (event) {
                    for(let metaDataObject of usedMetaDataObjectArray){
                        sendPostRequest(metaDataObject);
                    }
                })
            }else{
                confirmButton.textContent = `Processing File ${counter} of ${files.length}...`;
            }
        })
    });

    }

})

function makeMetaDataString(metaData) {
    let htmlToReturn = "";
    for (let key in metaData) {
        htmlToReturn += key + ": " + metaData[key] + "<br>";
    }
    return htmlToReturn;
}

async function getMakeID(make) {
    console.log(make);
    const urlToFetch = `http://localhost:5000/api/images/makeid/${make}`;

    try {
        const response = await fetch(urlToFetch);

        // Check if the response is okay (status 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("data: ", data);

        return data.id;
    } catch (error) {
        console.error('Failed to fetch make ID:', error);
        throw error;  // Re-throw the error to be handled by the caller
    }
}

function sendPostRequest(metaData) {
    fetch("http://localhost:5000/api/images", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(metaData)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Post request successful:", data);
            // Handle the response from the server
        })
        .catch(error => {
            console.error("Error sending post request:", error);
            // Handle the error
        });
}

function refromatDateTime(dateTime) {
    let dateTimeString = "";
    let count = 0;

    for (let i = 0; i < dateTime.length; i++) {
        // console.log(dateTimeString[i]);
        if (count < 2 && dateTime[i] == ':') {
            dateTimeString += '-';
            count++;
        } else {
            dateTimeString += dateTime[i];
        }
    }

    return dateTimeString;
}


function reformatShutterSpeed(shutterSpeed) {
    // 1/125 = 0.008 
    //.008 = 8/1000
    if(shutterSpeed >= 1 || shutterSpeed == 0){
        return shutterSpeed;
    }

    let denominator = 1/shutterSpeed;

    return `1/${denominator}`;

}