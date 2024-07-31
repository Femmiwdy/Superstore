document.addEventListener('DOMContentLoaded', function () {
    let originalData;
    let chart;

    // Fetch data from JSON file
    fetch('assets/json/AvgDiskonPerCity.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            originalData = data;
            drawChart(data);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });

    // Function to draw chart
    function drawChart(data) {
        const ctx = document.getElementById('barchart1').getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.City),
                datasets: [{
                    label: 'Avg of Discount',
                    data: data.map(row => row.Avg_Discount),
                    backgroundColor: data.map(row => getColor(row.City, 0.6)),
                    borderColor: data.map(row => getColor(row.City, 1)),
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Avg of Discount per City',
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

    // Function to get consistent color based on city name
    function getColor(city, opacity) {
        const colors = {
            'Philadelphia': `rgba(255, 99, 132, ${opacity})`, // Red
            'Yuma': `rgba(54, 162, 235, ${opacity})`, // Blue
            'York': `rgba(255, 206, 86, ${opacity})`, // Yellow
            'Wilson': `rgba(100, 216, 100, ${opacity})`, // Green
            'Whittier': `rgba(153, 102, 255, ${opacity})`, // Purple
            'default': `rgba(100, 211, 100, ${opacity})` // Light Green for other cities
        };
        return colors[city] || colors['default'];
    }

    // Event listener for filtering by city
    const filter_by_city = document.getElementById('filter_by_city');
    filter_by_city.addEventListener('input', function () {
        const filterValue = filter_by_city.value.toLowerCase();

        const filteredData = (filterValue === 'all' || filterValue === '') 
            ? originalData 
            : originalData.filter(row => row.City.toLowerCase().includes(filterValue));

        chart.data.labels = filteredData.map(row => row.City);
        chart.data.datasets[0].data = filteredData.map(row => row.Avg_Discount);
        chart.data.datasets[0].backgroundColor = filteredData.map(row => getColor(row.City, 0.6));
        chart.data.datasets[0].borderColor = filteredData.map(row => getColor(row.City, 1));
        chart.update();
    });
});
