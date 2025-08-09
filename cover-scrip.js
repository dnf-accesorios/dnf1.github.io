let cart = []; // Array to store items in the shopping cart

// Get DOM elements
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const filterNormalBtn = document.getElementById('filter-normal');
const filterAstronautaBtn = document.getElementById('filter-astronauta');
const filterSiliconaBtn = document.getElementById('filter-silicona');
const cartIcon = document.getElementById('cart-icon');
const cartCountSpan = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeModalBtn = document.querySelector('.close-button');
const cartItemsBody = document.getElementById('cart-items-body');
const cartTotalSpan = document.getElementById('cart-total');
const requestWhatsappButton = document.getElementById('request-whatsapp-button');

// Function to attach event listeners to all 'Add to Cart' buttons
function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            // Get product data from the parent product card using data attributes
            const productCard = event.target.closest('.product-card');
            if (!productCard) return; // Should not happen

            const productId = parseInt(productCard.dataset.productId);
            const productName = productCard.dataset.productName;
            const productPrice = parseInt(productCard.dataset.productPrice);

            const quantityInput = productCard.querySelector(`#qty-${productId}`);
            const quantity = parseInt(quantityInput.value);

            addProductToCart({ id: productId, name: productName, price: productPrice }, quantity);
        });
    });
}

// Function to add product to cart
function addProductToCart(product, quantity) {
    if (quantity < 25) {
        alert('La cantidad mínima para este producto es 25 unidades.');
        return;
    }

    const existingCartItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingCartItemIndex > -1) {
        cart[existingCartItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }
    updateCartDisplay();
}

// Function to update cart display (table and total)
function updateCartDisplay() {
    cartItemsBody.innerHTML = ''; // Clear current cart items
    let total = 0;

    if (cart.length === 0) {
        cartItemsBody.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-gray-500">El carrito está vacío.</td></tr>';
    } else {
        cart.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            total += itemSubtotal;
            const cartRow = `
                <tr>
                    <td class="py-3 px-4 text-gray-800">${item.name}</td>
                    <td class="py-3 px-4 text-gray-800">${item.quantity}</td>
                    <td class="py-3 px-4 text-gray-800">${item.price} USD</td>
                    <td class="py-3 px-4 text-gray-800">${itemSubtotal} USD</td>
                </tr>
            `;
            cartItemsBody.innerHTML += cartRow;
        });
    }

    cartTotalSpan.textContent = `${total} USD`;
    cartCountSpan.textContent = cart.length; // Update cart icon count
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    setupAddToCartButtons(); // Set up buttons once DOM is loaded
    updateCartDisplay(); // Initial update of cart display
});

// Search functionality
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.dataset.productName.toLowerCase();
        const productType = card.dataset.productType.toLowerCase();

        if (productName.includes(searchTerm) || productType.includes(searchTerm)) {
            card.style.display = 'block'; // Show the card
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });
});

// Filter buttons
filterNormalBtn.addEventListener('click', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        if (card.dataset.productType === 'normal') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

filterAstronautaBtn.addEventListener('click', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        if (card.dataset.productType === 'astronauta') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

filterSiliconaBtn.addEventListener('click', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        if (card.dataset.productType === 'silicona') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Cart Modal functionality
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex'; // Show the modal
});

closeModalBtn.addEventListener('click', () => {
    cartModal.style.display = 'none'; // Hide the modal
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// WhatsApp Request Button
requestWhatsappButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Por favor, agrega productos antes de solicitar.');
        return;
    }

    const phoneNumber = '59752791';
    let message = "¡Hola! Me gustaría solicitar los siguientes productos:\n\n";
    let totalAmount = 0;

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        message += `- ${item.name} (Cantidad: ${item.quantity}, Subtotal: ${itemSubtotal} CUP)\n`;
        totalAmount += itemSubtotal;
    });

    message += `\nPrecio Total: ${totalAmount} CUP\n`;
    message += "Por favor, confírmame la disponibilidad y el proceso de entrega. ¡Gracias!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
});
