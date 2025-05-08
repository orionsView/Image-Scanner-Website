document.getElementById("usernameInputField").addEventListener("change", function (event) {
    const userName = document.getElementById("usernameInputField").value;
    checkUserName(userName);
});

document.getElementById("subButton").addEventListener("click", function (event) {
    const userName = document.getElementById("usernameInputField").value;
    checkUserName(userName);
});

function checkUserName(userName) {
    let header = document.getElementById("topText");
    userNameExistsCheck(userName).then(userData => {
        if (userData.length > 0) {
            console.log("correct");
            //go to alternate page
            sessionStorage.setItem("userName", userName); // store the value in local storage
            console.log(userData);
            sessionStorage.setItem("userID", userData[0].id);
            window.location.href = "../HomePage/UserHomePage.html";
        } else {
            console.log("incorrect");
            header.textContent = "Incorrect Username";
        }
    })

}

async function userNameExistsCheck(userName) {
    const urlToFetch = `http://localhost:5000/api/userid/${userName}`;
    try {
        const response = await fetch(urlToFetch);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking username:', error);
        return false;
    }
}
