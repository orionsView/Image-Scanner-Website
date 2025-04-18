document.getElementById("displayUserNameButon").addEventListener("click", function (event) {
    const userNameTitle = document.getElementById("userNameTitle");
    userNameTitle.textContent = "User Name: " + localStorage.getItem("userName") + " " + localStorage.getItem("userID");
})


document.getElementById("fileInput").addEventListener("change", function (event) {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;
    console.log(files);

    // for (let i = 0; i < files.length; i++) {
    const file = files[0];
    EXIF.getData(file, function () {
        var allMetaData = EXIF.getAllTags(this);
        console.log(allMetaData);
        console.log("fnum: ", allMetaData["FNumber"]);

        getMakeID(allMetaData["Make"]).then(makeID => {
            const usedMetaData = {
                "customerID": localStorage.getItem("userID"),
                "fNum": allMetaData["FNumber"],
                "shutterSpeed": allMetaData["ExposureTime"],
                "timeTaken": refromatDateTime(allMetaData["DateTime"]),
                "ISO": allMetaData["ISOSpeedRatings"],
                "focalLength": allMetaData["FocalLength"],
                "artistName": allMetaData["Artist"],
                "makeID": makeID
            }


            console.log(usedMetaData);
            const botText = document.getElementById("bottomText");
            botText.innerHTML = "<span style='font-weight: bold;'>Add Meta Data?</span><br>" + makeMetaDataString(usedMetaData);

            const confirmButton = document.getElementById("confirmButton");
            confirmButton.textContent = "Confirm?";
            confirmButton.addEventListener("click", function (event) {
                sendPostRequest(usedMetaData);
            })
        })
    });

    // }

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
