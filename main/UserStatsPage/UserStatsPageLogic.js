// http://localhost:5000/api/images/data/"username"
const userName = sessionStorage.getItem("userName");

if (userName) {
    fetch(`http://localhost:5000/api/images/data/${userName}`)
        .then(response => response.json())
        .then(data => {
            // Store the data as JSON
            const jsonData = JSON.stringify(data);
            console.log(jsonData);
            // You can use jsonData as needed
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
} else {
    console.error('Username not found in session storage.');
}



//ask user to choose stat type, then parse data and display