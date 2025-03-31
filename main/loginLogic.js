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
        header.innerText = "Correct";
    }else{
        header.innerText = "Incorrect";
    }
}