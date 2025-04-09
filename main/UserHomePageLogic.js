document.getElementById("displayUserNameButon").addEventListener("click", function (event) {
    const userNameTitle = document.getElementById("userNameTitle");
    userNameTitle.textContent = "User Name: " + localStorage.getItem("userName");
})


document.getElementById("fileInput").addEventListener("change", function (event) {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;
    console.log(files);
})