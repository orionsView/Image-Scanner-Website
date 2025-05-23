// const { response } = require("express");

// http://localhost:5000/api/images/data/"username"
const userName = sessionStorage.getItem("userName");
let imageData = null;
const settingsChart = document.getElementById("settingsChart");
let settingsChartObject = null;

if (userName) {
    fetch(`http://localhost:5000/api/images/data/${userName}`)
        .then(response => response.json())
        .then(data => {
            // Store the data as JSON
            imageData = data;
            console.log(imageData);
            console.log("Keys in imageData:", Object.keys(imageData));

            // You can use jsonData as needed
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
} else {
    console.error('Username not found in session storage.');
}



document.getElementById("userStatsSelect").addEventListener("change", function (event) {
    const selectedSetting = event.target.value;
    console.log(selectedSetting);
     const settingsArray = imageData.map(item => item[selectedSetting]);
    const settingsMap = settingsArray.reduce((map, val) => {
        map[val] = (map[val] || 0) + 1;
        return map;
    }, {});
    console.log("data: ", settingsMap);
    displaySettingOnChart(settingsMap);
})


function displaySettingOnChart(settings) {

    if(settingsChartObject != null) {
        settingsChartObject.destroy();
    }
    
    const labels = Object.keys(settings).sort((a, b) => Number(a) - Number(b));
    const values = labels.map(label => settings[label]); 
    const minValue = (value => Math.min(...value))
    // const maxValue = (value => Math.max(...value))
    const maxValue = Math.max(...values);
    const paddedMax = Math.ceil(maxValue * 1.1);


    settingsChartObject = new Chart(settingsChart, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: values,
                borderWidth: 1,
                // backgroundColor: "rgba(75, 192, 192, 0.6)"
            }]
        },
        options: {
            scales: {
                x: {
                    min:  minValue - minValue * 0.1, // Set minimum value for x-axis
                    max: paddedMax  // Set maximum value for x-axis
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
