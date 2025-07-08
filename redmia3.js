// Función para actualizar la cantidad de productos seleccionados
function updateQuantity(action, id) {
    const product = `Modelo ${id}`;
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

    if (action === 'plus') {
        if (carrito[product]) {
            carrito[product]++;
        } else {
            carrito[product] = 1;
        }
    } else if (action === 'minus') {
        if (carrito[product]) {
            carrito[product]--;
            if (carrito[product] <= 0) {
                delete carrito[product];
            }
        }
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Producto actualizado: ${product} - Cantidad: ${carrito[product] || 0}`);
}
