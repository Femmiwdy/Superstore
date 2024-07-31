// script.js untuk menampilkan rentang tanggal
document.addEventListener('DOMContentLoaded', function () {
    const select = document.getElementById('dateRange');
    const startDate = new Date(2014, 0, 1); // Tanggal mulai (1 Januari 2024)
    const endDate = new Date(2018, 11, 31); // Tanggal akhir (31 Desember 2024)

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = monthNames[date.getMonth()]; 
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const option = document.createElement('option');
        option.value = currentDate.toISOString().split('T')[0]; 
        option.textContent = formatDate(currentDate); 
        select.appendChild(option);

    
        currentDate.setDate(currentDate.getDate() + 1);
    }
});

//untuk score tabel
document.addEventListener('DOMContentLoaded', function () {
    const scores = [
        { rank: 1, name: "John", score: 1000 },
        { rank: 2, name: "Jane", score: 900 },
        { rank: 3, name: "Doe", score: 800 },
        { rank: 4, name: "Alice", score: 750 },
        { rank: 5, name: "Bob", score: 700 }
    ];

    const tableBody = document.getElementById('scoreBody');

    scores.forEach(score => {
        const row = document.createElement('tr');

        const rankCell = document.createElement('td');
        rankCell.textContent = score.rank;
        row.appendChild(rankCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = score.name;
        row.appendChild(nameCell);

        const scoreCell = document.createElement('td');
        scoreCell.textContent = score.score;
        row.appendChild(scoreCell);

    });
});

//untuk menambahkan data pada tabel1
document.addEventListener('DOMContentLoaded', function () {
    fetch('assets/json/tabel1.json')
    .then(function(response) {
        console.log('Fetch response received:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(function(tabel1) {
        console.log('JSON data received:', tabel1);
        let pilih1 = document.querySelector('#tabel1');
        if (!pilih1) {
            throw new Error('Element with ID "tabel1" not found');
        }
        let out = "";
        for (let tabel_1 of tabel1) {
            out += `
                <tr>
                    <td>${tabel_1.product_name}</td>
                    <td>${tabel_1.city}</td>
                    <td>${tabel_1.quantity}</td>
                </tr>
            `;
        }
        
        pilih1.innerHTML = out;
    })
    .catch(function(error) {
        console.error('There has been a problem with your fetch operation:', error);
    });
})
