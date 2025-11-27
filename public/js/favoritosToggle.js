function toggleFavorite(heartElement) {
    const card = heartElement.closest('.product-card');
    const imgEl = card.querySelector('.product-image');
    const product = {
        nombre: card.querySelector('.product-title').textContent,
        descripcion: card.querySelector('.product-description').textContent,
        precio: card.querySelector('.product-price').textContent,
        image: imgEl ? imgEl.getAttribute('src') : null,
        category: card.getAttribute('data-category')
    };

    const icon = heartElement.querySelector('i');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        heartElement.classList.add('favorited');
            if (!favorites.some(p => p.nombre === product.nombre)) {
                favorites.push(product);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        heartElement.classList.remove('favorited');
            favorites = favorites.filter(p => p.nombre !== product.nombre);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}