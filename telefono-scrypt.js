document.addEventListener('DOMContentLoaded', function () {
    let sliders = document.querySelectorAll('.slider');
    sliders.forEach(function (slider) {
        let images = slider.querySelectorAll('img');
        let currentIndex = 0;
        setInterval(function () {
            images[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.display = 'block';
        }, 3000);
    });
});

function toggleTariff(id) {
    const tariff = document.getElementById(id);
    tariff.style.display = tariff.style.display === 'block' ? 'none' : 'block';
}

function addToTable(productName, quantityId, pricePerUnit1, pricePerUnit2) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Por favor ingrese una cantidad válida.");
        return;
    }

    const pricePerUnit = quantity >= 5 ? pricePerUnit2 : pricePerUnit1;
    const tbody = document.getElementById('product-table').getElementsByTagName('tbody')[0];
    const newRow = tbody.insertRow();
    newRow.insertCell(0).innerText = productName;
    newRow.insertCell(1).innerText = quantity;
}

function calculateTotal() {
    const rows = document.querySelectorAll('#product-table tbody tr');
    let total = 0;

    rows.forEach(row => {
        const productName = row.cells[0].innerText;
        const quantity = parseInt(row.cells[1].innerText, 10);
        let pricePerUnit;

        switch (productName) {
            case 'Sansung Galaxy F05':
                pricePerUnit = quantity >= 5 ? 105 : 160;
                break;
            case 'Sansung Galaxy M14':
                pricePerUnit = quantity >= 5 ? 120 : 170;
                break;
            case 'Sansung Galaxy A16':
                pricePerUnit = quantity >= 5 ? 155 : 180;
                break;
                
            case 'Xiaomi Redmi A3':
                pricePerUnit = quantity >= 5 ? 84 : 110;
                break;
            case 'Tecno Spark Go 1':
                pricePerUnit = quantity >= 5 ? 90 : 115;
                break;
        }
        total += pricePerUnit * quantity;
    });

    document.getElementById('total-price').innerText = 'Total: ' + total + ' USD';
    document.getElementById('solicitar-btn').disabled = false;
}

function sendWhatsApp() {
    const rows = document.querySelectorAll('#product-table tbody tr');
    let message = 'Pedido:\n';
    rows.forEach(row => {
        message += `${row.cells[0].innerText} - Cantidad: ${row.cells[1].innerText}\n`;
    });
    const totalPrice = document.getElementById('total-price').innerText;
    message += totalPrice;
    window.open(`https://wa.me/59752791?text=${encodeURIComponent(message)}`, '_blank');
}
