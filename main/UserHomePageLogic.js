// import {userName} from "./loginLogic.js";
document.getElementById("displayUserNameButon").addEventListener("click", function (event) {
    const userNameTitle = document.getElementById("userNameTitle");
    userNameTitle.textContent = "User Name: " + localStorage.getItem("userName");
})