// <div id="navBar">
/* <button id="addPhoto" class="defaultButton" onclick="window.location.href = '../AddPhotoPage/AddPhotoPage.html'">Add Photos</button>
<button id="logout" class="defaultButton">Logout</button>
<button id="homepage" class="defaultButton">Home Page</button>
<button id="userStats" class="defaultButton">User Stats</button>
</div> */

function loadNavBar() {
    const navBar = document.getElementById("navBar");

    addButtonToNavBar(navBar, "Home Page", "../HomePage/UserHomePage.html");
    addButtonToNavBar(navBar, "Add Photos", "../AddPhotoPage/AddPhotoPage.html");
    addButtonToNavBar(navBar, "User Stats", "../UserStatsPage/UserStatsPage.html");
    addButtonToNavBar(navBar, "Logout", "../loginPage/login.html");
}



function addButtonToNavBar(navBar, text, href) {
    const button = document.createElement("button");
    button.classList.add("defaultButton");
    button.textContent = text;
    button.addEventListener("click", function (event) {
        window.location.href = href;
    });
    navBar.appendChild(button);
}
