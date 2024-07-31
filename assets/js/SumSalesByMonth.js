
  fetch('assets/json/SumSalesByMonth.json')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok ' + response.statusText);
        }
    })
    .then(function (data) {
        console.log(data);
        drawChart(data);
    })
    .catch(function (error) {
        console.error('Error fetching the data:', error);
    });

function drawChart(data) {
    const ctx = document.getElementById('linechart2').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(row => row.Month_Year),
            datasets: [{
                label: 'SUM of Sales',
                data: data.map(row => parseFloat(row.SUM_of_Sales.replace(/,/g, ''))),
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Sum of Sales by Month',
                    font: {
                        size: 15
                    }
                }
            },
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

