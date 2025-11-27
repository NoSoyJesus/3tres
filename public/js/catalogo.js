document.addEventListener('DOMContentLoaded', () => {
    fetch('/productos')
        .then(response => response.json())
        .then(productos => {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            productos.forEach((product, idx) => {
                const isFavorited = favorites.some(p => p.nombre === product.nombre);
                grid.innerHTML += `
                    <div class="product-card" data-category="${product.categoria || ''}">
                        <div class="heart-icon${isFavorited ? ' favorited' : ''}" onclick="toggleFavorite(this)">
                            <i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>
                        </div>
                        <h3 class="product-title">${product.nombre}</h3>
                        <p class="product-description">${product.descripcion}</p>
                        <div class="product-price">$${product.precio}</div>
                        <div class="product-actions">
                            <div class="quantity-controls">
                                <label for="quantity-${idx}" class="quantity-label">Cant:</label>
                                <input type="number" id="quantity-${idx}" class="quantity-input" value="1" min="1" max="99">
                            </div>
                            <button class="btn-primary" onclick="agregarCarrito(event)">
                                <i class="fas fa-shopping-cart"></i> Agregar
                            </button>
                        </div>
                    </div>
                `;
            });
        });
});