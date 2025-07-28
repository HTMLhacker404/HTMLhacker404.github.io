// meme-category.js
document.addEventListener('DOMContentLoaded', () => {
    const category = JSON.parse(localStorage.getItem('selectedMemeCategory'));
    const titleElement = document.getElementById('category-title');
    const grid = document.querySelector('.memes-grid');
    
    titleElement.textContent = category?.title || "Мемы";
    grid.innerHTML = '';
    
    const memes = memesDatabase.getCategoryMemes(category?.id);
    
    memes.forEach(meme => {
        const card = document.createElement('div');
        card.className = 'meme-post';
        card.innerHTML = `
            <img src="${meme.img}" alt="${meme.alt}" class="meme-img">
        `;
        
        card.addEventListener('click', () => {
            const fullscreen = document.createElement('div');
            fullscreen.className = 'meme-fullscreen';
            fullscreen.innerHTML = `
                <div class="meme-fullscreen-content">
                    <img src="${meme.img}" alt="${meme.alt}" class="fullscreen-meme-img">
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
        });
        
        grid.appendChild(card);
    });
});