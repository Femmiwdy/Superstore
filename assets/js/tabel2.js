document.addEventListener('DOMContentLoaded', function () {
    let originalData;

    fetch('assets/json/tabelsalescategory.json')
        .then(function (response) {
            console.log('Fetch response received:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(function (tabelsalescategory) {
            console.log('JSON data received:', tabelsalescategory);
            originalData = tabelsalescategory;
            updateTable(tabelsalescategory);
        })
        .catch(function (error) {
            console.error('There has been a problem with your fetch operation:', error);
        });

    function updateTable(data) {
        let pilih2 = document.querySelector('#tabelsalescategory');
        if (!pilih2) {
            throw new Error('Element with ID "tabelsalescategory" not found');
        }
        let out = "";
        for (let tabel_2 of data) {
            out += `
                <tr>
                    <td>${tabel_2.Region}</td>
                    <td>${tabel_2.Furniture}</td>
                    <td>${tabel_2.Technology}</td>
                    <td>${tabel_2.Office_Supplice}</td>
                </tr>
            `;
        }
        
        pilih2.innerHTML = out;
    }

    let filter_by_region = document.getElementById('filter_by_region');
    filter_by_region.addEventListener('input', function () {
        const filterValue = filter_by_region.value.toLowerCase();

        if (filterValue === 'all' || filterValue === '') {
            updateTable(originalData);
        } else {
            const filteredData = originalData.filter(row => row.Region.toLowerCase().includes(filterValue));
            updateTable(filteredData);
        }
    });
});
