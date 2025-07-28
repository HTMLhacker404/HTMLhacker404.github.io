// memes.js
document.addEventListener('DOMContentLoaded', () => {
    const memeCategoriesContainer = document.querySelector('.memes-categories');
    if (!memeCategoriesContainer) return;

    const categories = memesDatabase.getMemeCategoryList();

    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'situation-card';
        card.innerHTML = `
            <img src="${category.image}" alt="${category.title}">
            <h3>${category.title}</h3>
        `;
        
        card.addEventListener('click', () => {
            localStorage.setItem('selectedMemeCategory', JSON.stringify({
                id: category.id,
                title: category.title
            }));
            window.location.href = 'meme-category.html';
        });
        
        memeCategoriesContainer.appendChild(card);
    });

    document.getElementById('random-meme-btn')?.addEventListener('click', showRandomMeme);
});

function showFullscreenMeme(imgSrc, altText) {
    const fullscreen = document.createElement('div');
    fullscreen.className = 'meme-fullscreen';
    fullscreen.innerHTML = `
        <div class="meme-fullscreen-content">
            <img src="${imgSrc}" alt="${altText}" class="fullscreen-meme-img">
            <button class="close-fullscreen">×</button>
        </div>
    `;
    
    document.body.appendChild(fullscreen);
    
    fullscreen.querySelector('.close-fullscreen').addEventListener('click', () => fullscreen.remove());
    
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') fullscreen.remove();
    });
    
    fullscreen.addEventListener('click', (e) => {
        if (e.target === fullscreen) fullscreen.remove();
    });
}

function showRandomMeme() {
    const allMemes = [];
    Object.values(memesDatabase.memeCategories).forEach(category => {
        category.memes.forEach(meme => {
            allMemes.push({
                img: meme.img,
                alt: meme.alt,
                category: category.title
            });
        });
    });

    if (allMemes.length > 0) {
        const randomMeme = allMemes[Math.floor(Math.random() * allMemes.length)];
        showFullscreenMeme(randomMeme.img, randomMeme.alt, randomMeme.category);
    }
}

function showFullscreenMeme(imgSrc, altText, category) {
    const fullscreen = document.createElement('div');
    fullscreen.className = 'meme-fullscreen';
    fullscreen.innerHTML = `
        <div class="meme-fullscreen-content">
            <small>${category || 'Случайный мем'}</small>
            <img src="${imgSrc}" alt="${altText}" class="fullscreen-meme-img">
            <button class="close-fullscreen">×</button>
        </div>
    `;
    
    document.body.appendChild(fullscreen);
    
    fullscreen.querySelector('.close-fullscreen').addEventListener('click', () => {
        fullscreen.remove();
    });
    
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') fullscreen.remove();
    });
    
    fullscreen.addEventListener('click', (e) => {
        if (e.target === fullscreen) fullscreen.remove();
    });
}