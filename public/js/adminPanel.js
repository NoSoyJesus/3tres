// adminPanel.js: Maneja la gestión de productos desde el backend para admin.html

const API_PRODUCTS = '/productos';

// Verificar que el usuario sea admin antes de permitir acceso
async function verificarAdmin() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debes iniciar sesión para acceder al panel de admin');
        window.location.href = 'login.html';
        return false;
    }

    try {
        const res = await fetch('/users/protegido', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (res.status === 201) {
            // Usuario es admin (rol = 1)
            return true;
        } else {
            // Usuario no es admin
            alert('No tienes permisos para acceder al panel de admin');
            window.location.href = 'index.html';
            return false;
        }
    } catch (error) {
        alert('Error al verificar permisos');
        window.location.href = 'index.html';
        return false;
    }
}

// Cargar productos al iniciar
async function cargarProductosAdmin() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    const token = localStorage.getItem('token');
    const res = await fetch(API_PRODUCTS, {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const productos = await res.json();
    productos.forEach(product => {
        grid.innerHTML += `
            <div class="product-card" data-id="${product.id}">
                <h3 class="product-title">${product.nombre}</h3>
                <p class="product-description">${product.descripcion}</p>
                <div class="product-price">$${product.precio}</div>
                <button class="btn-primary" onclick="eliminarProducto('${product.id}')">Eliminar</button>
                <button class="btn-primary" onclick="editarProducto('${product.id}')">Editar</button>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const esAdmin = await verificarAdmin();
    if (esAdmin) {
        cargarProductosAdmin();
    }
});

// Agregar producto
async function agregarProducto(e) {
    e.preventDefault();
    const form = e.target;
    const token = localStorage.getItem('token');
    const nombre = form.querySelector('[name="nombre"]').value;
    const descripcion = form.querySelector('[name="descripcion"]').value;
    const precio = form.querySelector('[name="precio"]').value;
    const res = await fetch(API_PRODUCTS, {
        method: 'POST',
        headers: { 
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, descripcion, precio })
    });
    if (!res.ok) return alert('Error al agregar producto');
    cargarProductosAdmin();
    form.reset();
    document.getElementById('formularioAgreg').style.display = 'none';
}

document.querySelector('#formularioAgreg form').onsubmit = agregarProducto;

// Eliminar producto
async function eliminarProducto(id) {
    if (!confirm('¿Eliminar producto?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_PRODUCTS}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) return alert('Error al eliminar');
    cargarProductosAdmin();
}

// Editar producto (mostrar formulario)
function editarProducto(id) {
    // Cargar datos y mostrar formulario de edición
    const card = document.querySelector(`.product-card[data-id='${id}']`);
    const form = document.querySelector('#formularioEdit form');
    form[0].value = card.querySelector('.product-title').textContent;
    form[1].value = card.querySelector('.product-description').textContent;
    form[2].value = card.querySelector('.product-price').textContent.replace('$','');
    form.setAttribute('data-id', id);
    document.getElementById('formularioEdit').style.display = 'block';
}

// Confirmar edición
async function confirmarEdicion(e) {
    e.preventDefault();
    const form = e.target;
    const id = form.getAttribute('data-id');
    const token = localStorage.getItem('token');
    const nombre = form.querySelector('[name="nombre"]').value;
    const descripcion = form.querySelector('[name="descripcion"]').value;
    const precio = form.querySelector('[name="precio"]').value;
    const res = await fetch(`${API_PRODUCTS}/${id}`, {
        method: 'PUT',
        headers: { 
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, descripcion, precio })
    });
    if (!res.ok) return alert('Error al editar');
    cargarProductosAdmin();
    form.reset();
    document.getElementById('formularioEdit').style.display = 'none';
}

document.querySelector('#formularioEdit form').onsubmit = confirmarEdicion;
