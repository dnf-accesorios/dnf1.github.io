function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function agregarProducto(nombre, precioUnidad, precioDescuento, inputId) {
    const cantidad = document.getElementById(inputId).value;
    if (!cantidad || cantidad <= 0) {
        alert("Por favor, introduce una cantidad válida.");
        return;
    }

    const precio = cantidad >= 20 ? precioDescuento : precioUnidad;
    const total = precio * cantidad;

    const tabla = document.getElementById("tabla-productos").getElementsByTagName("tbody")[0];
    const fila = tabla.insertRow();
    const celdaNombre = fila.insertCell(0);
    const celdaCantidad = fila.insertCell(1);
    const celdaPrecio = fila.insertCell(2);
    const celdaTotal = fila.insertCell(3);

    celdaNombre.innerText = nombre;
    celdaCantidad.innerText = cantidad;
    celdaPrecio.innerText = precio;
    celdaTotal.innerText = total;
}

function calcularTotal() {
    const tabla = document.getElementById("tabla-productos").getElementsByTagName("tbody")[0];
    let total = 0;

    for (let i = 0; i < tabla.rows.length; i++) {
        total += parseFloat(tabla.rows[i].cells[3].innerText);
    }

    document.getElementById("total").innerText = `Total: ${total} CUP`;
}

function solicitarProductos() {
    const tabla = document.getElementById("tabla-productos").getElementsByTagName("tbody")[0];
    let mensaje = "Solicito los siguientes productos:\n";

    for (let i = 0; i < tabla.rows.length; i++) {
        const producto = tabla.rows[i].cells[0].innerText;
        const cantidad = tabla.rows[i].cells[1].innerText;
        mensaje += `${producto}: ${cantidad} unidades\n`;
    }

    const telefono = "59752791";
    const url = `https://wa.me/53${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}
