document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/json/SumProfitCategory.json')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        })
        .then(function(data) {
            console.log(data);
            drawChart(data);
        })
        .catch(function(error) {
            console.error('Error fetching the data:', error);
        });

    function drawChart(data) {
        const ctx = document.getElementById('piechart').getContext('2d'); // Ensure the correct ID
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.map(row => row.Category),
                datasets: [{
                    label: 'SUM of Profit',
                    data: data.map(row => parseFloat(row.SUM_of_Profit.replace(/,/g, ''))),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Sum of Profit by Category',
                        font: {
                            size: 15
                        }
                    }
                },
                responsive: true
            }
        });
    }
});
