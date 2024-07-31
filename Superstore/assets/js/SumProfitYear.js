document.addEventListener('DOMContentLoaded', function() {
    let originalData;
    let chart;

    fetch('assets/json/SumProfitByYear.json')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        })
        .then(function(data) {
            console.log(data);
            originalData = data;
            drawChart(data);
        })
        .catch(function(error) {
            console.error('Error fetching the data:', error);
        });

    function drawChart(data) {
        const ctx = document.getElementById('linechart1').getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.Year),
                datasets: [{
                    label: 'SUM of Profit',
                    data: data.map(row => parseFloat(row.SUM_of_Profit.replace(/,/g, ''))),
                    backgroundColor: data.map(row => getColor(row.Year)),
                    borderColor: data.map(row => getColor(row.Year, 1)),
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Sum of Profit by Year',
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

    function getColor(year, opacity = 0.6) {
        switch (year) {
            case '2014':
                return `rgba(100, 216, 100, ${opacity})`; // Light Blue
            case '2015':
                return `rgba(255, 99, 132, ${opacity})`; // Light Red (Pink)
            case '2016':
                return `rgba(54, 162, 235, ${opacity})`; // Light Yellow
            case '2017':
                return `rgba(255, 206, 86, ${opacity})`; // Light Green
            default:
                return `rgba(100, 211, 100, ${opacity})`; // Light Grey for other years
        }
    }

    let filter_by_year = document.getElementById('filter_by_year');

    filter_by_year.addEventListener('input', function() {
        const filterValue = filter_by_year.value.toLowerCase();

        let filteredData;
        if (filterValue === 'all' || filterValue === '') {
            filteredData = originalData;
        } else {
            filteredData = originalData.filter(row => row.Year.toLowerCase().includes(filterValue));
        }

        chart.data.labels = filteredData.map(row => row.Year);
        chart.data.datasets[0].data = filteredData.map(row => parseFloat(row.SUM_of_Profit.replace(/,/g, '')));
        chart.data.datasets[0].backgroundColor = filteredData.map(row => getColor(row.Year));
        chart.data.datasets[0].borderColor = filteredData.map(row => getColor(row.Year, 1));
        chart.update();
    });
});
