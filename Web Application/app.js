
const sheetLinks = {'amazon':'https://script.google.com/macros/s/AKfycbyZja7xVTDk8V5SA5Y9kRo4LN61htzWyq0XffJNcxUT5wAMWeO98hEpczxmerP4nbDlXg/exec',
                    'nike':'https://script.google.com/macros/s/AKfycbwUfBeNUeZLSDw6GuHBdneH7_Ux9LJtVWNJqYdfFzXO6Xsq7ChE8dpVJ48p4K0Sbsjl/exec',
                    'google':'https://script.google.com/macros/s/AKfycbwhRT4kmFm3cEm8GNBSPRU6A-AoXzgOB8CyEErB06d5LaLaUz6NV-6TtT86Pw0iSyLNcA/exec',
                    'apple':'https://script.google.com/macros/s/AKfycbw3JtaT0-95qML_631rHyEkDHp91QsrdxRDqCndL24C5QLLuX2H2Q-BgyLIMe2RToOH/exec',
                    'cocacola':'https://script.google.com/macros/s/AKfycbwnEyUDwCmRLPCg9XVfL_8c-5OrKsopx_Lec0pF_YBNgnxPULH2CVV4psrSw8RqKFo35Q/exec'}

getCompany()
async function getCompany() { 

    var query = window.location.search.substring(1);

    var varName = query.split('=')[1];

    createChart(varName);
}

async function createChart(companyName) {

    const data = await getData(companyName);

    var ctx = document.getElementById('myChart').getContext('2d');

    var nameLabel = companyName.charAt(0).toUpperCase() + companyName.slice(1)
    if (companyName == 'cocacola') { 
        nameLabel = 'Coca Cola';
    }

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xlabels,
            datasets: [{
                label: nameLabel,
                data: data.yprices,
                backgroundColor: 'rgba(99, 200, 132, 1)',
                borderColor: 'rgba(99, 200, 132, 1)',
                borderWidth: 2,
                radius: 3,
                hitRadius: 5,
            }]
        },
        
    });
}

async function getData(company) { 

    var yprices = [];
    var xlabels = [];

    const url = sheetLinks[company]
    const response = await fetch(url)
    .then(res => res.json())
    .then((out) => {
        responseData = out;
        console.log(responseData);
    })
    .catch(err => {throw err})

    dataLength = Object.keys(responseData["prices"]).length;

    for (var i = 0; i < dataLength; i++) { 

        var record = responseData["prices"][i]

        yprices.push(record["value"])
        xlabels.push(record["date"])

    }

    return {yprices, xlabels};
}