document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const openCartBtn = document.getElementById('open-cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-button');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartBody = document.getElementById('cart-body');
    const cartTotalElem = document.getElementById('cart-total');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const cartCounter = document.getElementById('cart-counter');

    // --- VARIABLES Y ESTADO ---
    let cart = []; // Array para almacenar los productos del carrito
    const WHATSAPP_NUMBER = '5359752791'; // Número sin el '+'

    // --- FUNCIONES ---

    /**
     * Renderiza (dibuja) la tabla del carrito con los productos actuales.
     */
    function renderCart() {
        cartBody.innerHTML = ''; // Limpiar la tabla antes de redibujar
        let total = 0;

        if (cart.length === 0) {
            cartBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">El carrito está vacío</td></tr>';
        } else {
            cart.forEach(item => {
                const price = item.quantity >= 5 ? item.priceQuantity : item.priceUnit;
                const subtotal = price * item.quantity;
                total += subtotal;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><img src="${item.image}" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${price.toFixed(2)}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                `;
                cartBody.appendChild(tr);
            });
        }
        
        cartTotalElem.textContent = `$${total.toFixed(2)}`;
        updateCartCounter();
    }

    /**
     * Actualiza el contador de ítems en el ícono del carrito.
     */
    function updateCartCounter() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'block' : 'none';
    }

    /**
     * Añade un producto al carrito o incrementa su cantidad si ya existe.
     */
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        renderCart();
    }
    
    /**
     * Genera el mensaje para WhatsApp y abre el chat.
     */
    function sendWhatsAppMessage() {
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de solicitar.');
            return;
        }

        let message = "¡Hola! Quisiera solicitar los siguientes productos:\n\n";
        let total = 0;

        cart.forEach(item => {
            const price = item.quantity >= 5 ? item.priceQuantity : item.priceUnit;
            const subtotal = price * item.quantity;
            total += subtotal;
            message += `*Producto:* ${item.name}\n`;
            message += `*Cantidad:* ${item.quantity}\n`;
            message += `*Subtotal:* $${subtotal.toFixed(2)}\n\n`;
        });

        message += `*TOTAL DEL PEDIDO: $${total.toFixed(2)}*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    }


    // --- EVENT LISTENERS ---

    // Abrir el modal del carrito
    openCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    // Cerrar el modal del carrito con el botón 'X'
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Cerrar el modal del carrito si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Añadir productos al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: button.dataset.id,
                name: button.dataset.name,
                priceUnit: parseFloat(button.dataset.priceUnit),
                priceQuantity: parseFloat(button.dataset.priceQuantity),
                image: button.dataset.image
            };
            addToCart(product);
        });
    });
    
    // Enviar pedido por WhatsApp
    whatsappBtn.addEventListener('click', sendWhatsAppMessage);

    // Inicializar el contador al cargar la página
    updateCartCounter();
});