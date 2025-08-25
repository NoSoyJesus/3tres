document.addEventListener('DOMContentLoaded', function() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const productsSection = document.querySelector('.products');
    productsSection.innerHTML = '';

    if (favorites.length === 0) {
        productsSection.innerHTML = '<p>No tienes productos favoritos.</p>';
        return;
    }

    favorites.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
                        <div class="heart-icon favorited" onclick="toggleFavorite(this)">
                            <i class="fas fa-heart"></i>
                        </div>
                        <img src="${product.image}" alt="" class="product-image">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">${product.price}</div>
                        <div class="product-actions">
                            <button class="btn-primary" onclick="agregarCarrito(event)">
                                <i class="fas fa-shopping-cart"></i> Agregar
                            </button>
                        </div>
        `;
        productsSection.appendChild(card);
    });
});