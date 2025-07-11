let totalQuantity = 0;

// Función para obtener el precio según la cantidad
function getPriceByQuantity(quantity) {
    if (quantity >= 10000) return 700;
    if (quantity >= 5000) return 725;
    if (quantity >= 3000) return 750;
    if (quantity >= 800) return 760;
    if (quantity >= 200) return 770;
    if (quantity >= 100) return 780;
    if (quantity >= 50) return 800;
    return 850;
}

// Función para agregar productos a la tabla
function addProduct(productName, inputId) {
    const quantity = parseInt(document.getElementById(inputId).value);
    if (isNaN(quantity) || quantity < 1) {
        alert("Por favor, ingrese una cantidad válida.");
        return;
    }

    const tableBody = document.querySelector("#productTable tbody");
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = productName;

    const quantityCell = document.createElement("td");
    quantityCell.textContent = quantity;

    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    tableBody.appendChild(row);

    totalQuantity += quantity;

    // Habilitar o deshabilitar el botón de solicitud
    document.getElementById("requestButton").disabled = totalQuantity < 25;
}

// Función para calcular el precio total
function calculateTotal() {
    const pricePerUnit = getPriceByQuantity(totalQuantity);
    const totalPrice = pricePerUnit * totalQuantity;
    document.getElementById("totalPrice").textContent = totalPrice;
}

// Función para enviar mensaje de WhatsApp
function sendWhatsApp() {
    const tableBody = document.querySelector("#productTable tbody");
    let message = "Hola, deseo solicitar los siguientes productos:\n";
    tableBody.querySelectorAll("tr").forEach(row => {
        const name = row.cells[0].textContent;
        const quantity = row.cells[1].textContent;
        message += `- ${name}: ${quantity} unidades\n`;
    });
    const total = document.getElementById("totalPrice").textContent;
    message += `Total: ${total} CUP`;
    window.open(`https://wa.me/59752791?text=${encodeURIComponent(message)}`);
}

// Script de transición de imágenes
document.querySelectorAll(".image-slider").forEach((slider) => {
    const images = slider.querySelectorAll(".slider-img");
    let index = 0;

    images[index].style.opacity = 1;
    setInterval(() => {
        images.forEach((img, i) => img.style.opacity = i === index ? "1" : "0");
        index = (index + 1) % images.length;
    }, 3000);
});

function searchProducts() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        let isMatch = false;

        // Limpiar el texto de búsqueda y el nombre del producto para comparación aproximada
        const cleanedSearchInput = cleanString(searchInput);
        const cleanedProductName = cleanString(productName);

        // Comprobar si el nombre del producto incluye el texto de búsqueda aproximado
        if (cleanedProductName.includes(cleanedSearchInput)) {
            isMatch = true;
        } else {
            // Dividir el texto de búsqueda en palabras y comprobar si todas las palabras están en el nombre del producto
            const searchWords = cleanedSearchInput.split(' ').filter(word => word.length > 0);
            isMatch = searchWords.every(word => cleanedProductName.includes(word));
        }
        
        // Mostrar u ocultar la tarjeta del producto
        if (isMatch) {
            card.style.display = 'block'; // O 'flex' o el display original de tus tarjetas
        } else {
            card.style.display = 'none';
        }
    });
}

// Función para limpiar una cadena, quitando tildes y caracteres especiales, dejando solo letras y números
function cleanString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, '').toLowerCase();
}