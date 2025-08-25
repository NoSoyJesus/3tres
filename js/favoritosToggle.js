function toggleFavorite(heartElement) {
    const card = heartElement.closest('.product-card');
    const product = {
        title: card.querySelector('.product-title').textContent,
        description: card.querySelector('.product-description').textContent,
        price: card.querySelector('.product-price').textContent,
        image: card.querySelector('.product-image').getAttribute('src'),
        category: card.getAttribute('data-category')
    };

    const icon = heartElement.querySelector('i');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        heartElement.classList.add('favorited');
        if (!favorites.some(p => p.title === product.title)) {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        console.log('Agregado a favoritos');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        heartElement.classList.remove('favorited');
        favorites = favorites.filter(p => p.title !== product.title);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Removido de favoritos');
    }
}