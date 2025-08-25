if (localStorage.getItem("carrito") == undefined) {
    localStorage.setItem("carrito", JSON.stringify([]))
}

function agregarCarrito(event) {
    const articulo = event.target.closest('.product-card');
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    const nombre = articulo.querySelector(".product-title").innerHTML;
    const descripcion = articulo.querySelector(".product-description").innerHTML;
    const precio = articulo.querySelector(".product-price").innerHTML;
    const cantidadInput = articulo.querySelector(".quantity-input");
    const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;

    const existe = carrito.some(articulo => articulo.nombre === nombre);
    if(existe) {
        alert("El articulo ya se encuentra en el carrito!");
        return;
    }

    let articuloCarrito = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        cantidad: cantidad
    };

    carrito.push(articuloCarrito);

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function quitarCarrito(event) {
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    const articulo = event.target.parentNode.parentNode
    const nombreArticulo = articulo.querySelector(".tituloArticulo").innerHTML
    
    carrito = carrito.filter(element => element.nombre !== nombreArticulo)
    
    localStorage.setItem("carrito", JSON.stringify(carrito))
    articulo.remove()
    calcularTotal()
}

function modificarCantidad(event) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    const articulo = event.target.closest('.articulo');
    const nombreArticulo = articulo.querySelector(".tituloArticulo").innerHTML;
    const nuevaCantidad = parseInt(event.target.value);

    carrito.forEach((element) => {
        if (element.nombre == nombreArticulo) {
            element.cantidad = nuevaCantidad;
        }
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}

function cargarCarrito() {
    const carritoDiv = document.querySelector("#articulosCarrito");
    carritoDiv.innerHTML = ""; // Limpia antes de cargar
    const carrito = JSON.parse(localStorage.getItem("carrito"));

    carrito.forEach((articulo) => {
        const articuloContenedor = document.createElement("div");
        const articuloContenido = document.createElement("div");
        articuloContenedor.className = "articulo";

        const nombre = document.createElement("p");
        nombre.innerHTML = articulo.nombre;
        nombre.className = "tituloArticulo";

        const descripcion = document.createElement("p");
        descripcion.innerHTML = articulo.descripcion;
        descripcion.className = "descripcionArticulo";

        const precio = document.createElement("p");
        precio.innerHTML = articulo.precio;
        precio.className = "precioArticulo";

        const cantidad = document.createElement("input");
        cantidad.className = "cantidadArticulo";
        cantidad.type = "number";
        cantidad.min = 1;
        cantidad.value = articulo.cantidad;
        cantidad.oninput = modificarCantidad;

        const eliminarArticulo = document.createElement("button");
        eliminarArticulo.classList = "eliminarArticulo fa-solid fa-circle-xmark";
        eliminarArticulo.setAttribute("onclick", "quitarCarrito(event)");

        articuloContenido.append(nombre, descripcion, precio, cantidad, eliminarArticulo);
        articuloContenedor.appendChild(articuloContenido);

        carritoDiv.appendChild(articuloContenedor);
    });

    calcularTotal();
}

function calcularTotal() {
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    let total = 0

    carrito?.forEach((element) => {
        let precio = parseInt(element.precio.replace(/\D/g,''))
        let cantidad = parseInt(element.cantidad)
        total += precio * cantidad
    })

    document.querySelector("#totalCompra").innerHTML = total
}

function vaciarCarrito() {
    localStorage.setItem("carrito", JSON.stringify([]));
    cargarCarrito();
}

window.onload = function cargarBotones() {
    document.querySelectorAll(".product-card")?.forEach((element) => {
        element.querySelector(".btn-primary").setAttribute("onclick", "agregarCarrito(event)")
    })
}

document.addEventListener('DOMContentLoaded', function() {
    const vaciarBtn = document.getElementById('vaciarCarritoBtn');
    if (vaciarBtn) {
        vaciarBtn.addEventListener('click', vaciarCarrito);
    }
});