// auth.js: Maneja login, registro y sesión

// URL base del backend (ruta definida en el servidor: /users)
const API_URL = '/users';

// Login
async function login(email, password) {
    const res = await fetch(`${API_URL}/iniciarSesion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: password })
    });
    if (!res.ok) throw new Error('Login fallido');
    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('nombre', data.nombreUsuario || data.nombre);
    if (data.rol !== undefined) localStorage.setItem('rol', data.rol);
    return data;
}

// Registro
async function register(nombre, email, password) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Nombre: nombre, Email: email, Password: password })
    });
    if (!res.ok) throw new Error('Registro fallido');
    return await res.json();
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    window.location.href = 'login.html';
}

// Saber si está logueado
function isLoggedIn() {
    return !!localStorage.getItem('token');
}

// Obtener nombre y rol
function getNombre() {
    return localStorage.getItem('nombre');
}
function getRol() {
    const rolStr = localStorage.getItem('rol');
    return rolStr ? parseInt(rolStr) : null;
}

// Renderizar saludo y logout en el nav
function renderUserNav() {
    const header = document.querySelector('header');
    if (!header) return;
    let nombre = getNombre();
    let rol = getRol();
    let navHtml = `
        <a href="./index.html">
            <div>
                <img src="./img/a.png" alt="Logo" style="width: 10%;">
            </div>
        </a>
        <ul>
    `;
    if (isLoggedIn()) {
        navHtml += `<li style="color: white;">Hola, ${nombre}!</li>`;
        if (rol === 1) {
            navHtml += `<li><a href="./admin.html">Admin</a></li>`;
        }
        navHtml += `<li><button id="logoutBtn">Cerrar sesión</button></li>`;
        navHtml += `<li><a href="./carrito.html"><i class="fa-solid fa-cart-shopping"></i></a></li>`;
    } else {
        navHtml += `<li><a href="./login.html">Sign in</a></li>`;
        navHtml += `<li><a href="./registro.html">Sign up</a></li>`;
        navHtml += `<li><a href="./carrito.html"><i class="fa-solid fa-cart-shopping"></i></a></li>`;
    }
    navHtml += '</ul>';
    header.innerHTML = navHtml;
    if (isLoggedIn()) {
        document.getElementById('logoutBtn').onclick = logout;
    }
}

document.addEventListener('DOMContentLoaded', renderUserNav);
