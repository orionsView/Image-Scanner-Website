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
    if(userName === "a"){
        console.log("correct");
        //go to alternate page
        localStorage.setItem("userName", userName); // store the value in local storage
        window.location.href = "UserHomePage.html";
    }else{
        console.log("incorrect");
        header.textContent = "Incorrect Username";
    }
    
}

// export {userName};