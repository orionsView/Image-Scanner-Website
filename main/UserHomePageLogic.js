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

            
            const usedMetaData = {
                "userID": localStorage.getItem("userID"),
                "fNum": allMetaData["FNumber"],
                "shutterSpeed": allMetaData["ExposureTime"],
                "timeTaken": allMetaData["DateTime"],
                "ISO": allMetaData["ISOSpeedRatings"],
                "focalLength": allMetaData["FocalLength"],
                "artistName": allMetaData["Artist"],
                "make": allMetaData["Make"]
            }


            console.log(usedMetaData);
            const botText = document.getElementById("bottomText");
            botText.innerHTML = "<span style='font-weight: bold;'>Add Meta Data?</span><br>" + makeMetaDataString(usedMetaData);
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