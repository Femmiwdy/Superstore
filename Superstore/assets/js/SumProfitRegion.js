document.addEventListener('DOMContentLoaded', function () {
    let chart;
    let originalData = [];

    fetch('assets/json/SumProfitRegion.json')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        })
        .then(function (data) {
            console.log(data);
            originalData = data; // Save the original data
            drawChart(data);
        })
        .catch(function (error) {
            console.error('Error fetching the data:', error);
        });

    function drawChart(data) {
        const ctx = document.getElementById('barchart2').getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.Region),
                datasets: [{
                    label: 'SUM of Profit',
                    data: data.map(row => parseFloat(row.SUM_of_Profit.replace(/,/g, ''))),
                    backgroundColor: data.map(row => getColor(row.Region)),
                    borderColor: data.map(row => getColor(row.Region, 1)),
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Sum of Profit by Region',
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

    function getColor(region, opacity = 0.6) {
        switch (region) {
            case 'Central':
                return `rgba(54, 162, 235, ${opacity})`; 
            case 'East':
                return `rgba(255, 99, 132, ${opacity})`; 
            case 'South':
                return `rgba(255, 206, 86, ${opacity})`; 
            case 'West':
                return `rgba(100, 216, 100, ${opacity})`; 
            default:
                return `rgba(100, 211, 100, ${opacity})`; // Light Green for other regions
        }
    }

    let filter_by_region = document.getElementById('filter_by_region');
    filter_by_region.addEventListener('input', function () {
        const filterValue = filter_by_region.value.toLowerCase();

        let filteredData;
        if (filterValue === 'all' || filterValue === '') {
            filteredData = originalData;
        } else {
            filteredData = originalData.filter(row => row.Region.toLowerCase().includes(filterValue));
        }

        chart.data.labels = filteredData.map(row => row.Region);
        chart.data.datasets[0].data = filteredData.map(row => parseFloat(row.SUM_of_Profit.replace(/,/g, '')));
        chart.data.datasets[0].backgroundColor = filteredData.map(row => getColor(row.Region));
        chart.data.datasets[0].borderColor = filteredData.map(row => getColor(row.Region, 1));
        chart.update();
    });
});
