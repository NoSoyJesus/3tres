const header=`<div style="margin-left: 80px;">
            <img src="" alt="Logo">
        </div>
        <ul>
            <li><a href="login.html">Sign in</a></li>
            <li><a href="registro.html">Sign up</a></li>
        </ul>`
const footer= `<div class="footer-container">
        <div class="footer-section">
            <div class="logo">
            <img src="" alt="logo">
            </div>
            <p>Tu tienda de confianza</p>
                <div class="social-icons">
                    <a href=" " class="social-icon"><i class="fab fa-facebook-f"></i></a>
                    <a href=" " class="social-icon"><i class="fab fa-twitter"></i></a>
                    <a href=" " class="social-icon"><i class="fab fa-instagram"></i></a>
                </div>
        </div>

        <div class="footer-section">
            <h4>Enlaces</h4>
            <ul>
                <li><a href="#productos">Productos</a></li>
                <li><a href="#contacto">Contacto</a></li>
                <li><a href="#nosotros">Sobre Nosotros</a></li>
            </ul>
        </div>

        <div class="footer-section">
            <h4>Contacto</h4>
            <p>📞 +54 11 1234-5678</p>
            <p>✉️ info@gmail.com</p>
            <p>📍 Buenos Aires, Argentina</p>
        </div>
    </div>

    <div class="footer-bottom">
        <p>&copy; 2025 3tres. Todos los derechos reservados.</p>
    </div>`

document.querySelector('header').innerHTML=nav;
document.querySelector('footer').innerHTML=footer;