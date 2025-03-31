// window.onload=getExif;

let fnums = new Map([
    [1.0, 0], [1.1, 0], [1.2, 0], [1.4, 0], [1.6, 0], [1.8, 0], [2, 0], [2.2, 0], [2.5, 0], [2.8, 0],
    [3.2, 0], [3.5, 0], [4, 0], [4.5, 0], [5.0, 0], [5.6, 0], [6.3, 0], [7.1, 0], [8, 0], [9, 0],
    [10, 0], [11, 0], [13, 0], [14, 0], [16, 0], [18, 0], [20, 0], [22, 0], [25, 0], [29, 0],
    [32, 0], [36, 0], [40, 0], [45, 0], [51, 0], [57, 0], [64, 0], [72, 0], [81, 0], [90, 0],
    [102, 0], [114, 0], [128, 0]
])

let chartObject1 = null;
const lab = document.getElementById("l");

document.getElementById("textInputField").addEventListener("change", function (event) {
    const name  = document.getElementById("textInputField").value;
    lab.textContent = "name inputed: " + name;

    const urlToFetch = `http://localhost:5000/api/images/fnum/${name}`
    fetch(urlToFetch)
    .then(response => response.json())
    .then(data => console.log(data)); // Show images for Alice


    

    
});

// let myData = await fetchData(urlToFetch);

// async function fetchData(url) {
//     let response = await fetch(url);
//     let data = await response.json();
//     return data;
// }



document.getElementById("fileInput").addEventListener("change", function (event) {
    if (chartObject1 != null) {
        chartObject1.destroy();
        fnums = new Map([
            [1.0, 0], [1.1, 0], [1.2, 0], [1.4, 0], [1.6, 0], [1.8, 0], [2, 0], [2.2, 0], [2.5, 0], [2.8, 0],
            [3.2, 0], [3.5, 0], [4, 0], [4.5, 0], [5.0, 0], [5.6, 0], [6.3, 0], [7.1, 0], [8, 0], [9, 0],
            [10, 0], [11, 0], [13, 0], [14, 0], [16, 0], [18, 0], [20, 0], [22, 0], [25, 0], [29, 0],
            [32, 0], [36, 0], [40, 0], [45, 0], [51, 0], [57, 0], [64, 0], [72, 0], [81, 0], [90, 0],
            [102, 0], [114, 0], [128, 0]
        ])
    }




    const folder = event.target.files;
    lab.innerHTML = "";//clear

    let processedFiles = 0;
    let totalFiles = folder.length;

    for (let file of folder) {
        EXIF.getData(file, function () {
            var metaData = EXIF.getTag(this, "FNumber");
            if (metaData != undefined) {
                fnums.set(metaData.valueOf(), fnums.get(metaData.valueOf()) + 1);
            }
            processedFiles++;

            // var temp = EXIF.getAllTags(this);
            // console.log(temp);

            // lab.textContent = "hello";
            console.log(processedFiles);
            if (processedFiles === totalFiles) {
                console.log(processedFiles);

                const labels = Array.from(fnums.keys());
                const vals = Array.from(fnums.values());

                // console.log("flables: ", labels);
                // console.log("fval: ", vals);
                updateChart();
            }
        });
    }

})


function updateChart() {

    console.log(fnums);
    let labels = Array.from(fnums.keys());
    labels.length = 20;
    const values = Array.from(fnums.values());

    const c1 = document.getElementById("chart1");
    chartObject1 = new Chart(c1, {
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
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

//ExposureTime
//FocalLength
//ISOSpeedRatings
//FNumber

// document.addEventListener("DOMContentLoaded", function () {

// });
