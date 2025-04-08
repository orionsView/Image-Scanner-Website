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
    userNameExistsCheck(userName).then(userExists => {
        if (userExists) {
            console.log("correct");
            //go to alternate page
            localStorage.setItem("userName", userName); // store the value in local storage
            window.location.href = "UserHomePage.html";
        } else {
            console.log("incorrect");
            header.textContent = "Incorrect Username";
        }
    })

}

async function userNameExistsCheck(userName) {
    const urlToFetch = `http://localhost:5000/api/userexists/${userName}`;
    try {
        const response = await fetch(urlToFetch);
        const data = await response.json();
        return data && data.length > 0;
    } catch (error) {
        console.error('Error checking username:', error);
        return false;
    }
}


// export {userName};