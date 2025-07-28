// Инициализация главной страницы
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.situation-grid');
    const categories = appDatabase.getCategoryList();

    // Создаем карточки категорий
    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'situation-card';
        card.innerHTML = `
            <img src="${category.image}" alt="${category.title}">
            <h3>${category.title}</h3>
        `;
        
        card.addEventListener('click', () => {
            localStorage.setItem('selectedCategory', JSON.stringify({
                id: category.id,
                title: category.title
            }));
            window.location.href = 'category.html';
        });
        
        grid.appendChild(card);
    });

    // Обработчик случайной ситуации
    document.getElementById('random-btn')?.addEventListener('click', showRandomSituation);
});

// Функция показа случайной ситуации
function showRandomSituation() {
    const allSituations = [];
    Object.values(appDatabase.categories).forEach(category => {
        category.situations.forEach(text => {
            allSituations.push({
                text,
                category: category.title,
                categoryId: category.id
            });
        });
    });

    if (allSituations.length > 0) {
        const situation = allSituations[Math.floor(Math.random() * allSituations.length)];
        showFullscreenSituation(situation.text, situation.category, situation.categoryId);
    }
}

// Функция показа полноэкранного режима
function showFullscreenSituation(text, category, categoryId = 0) {
    const bgColor = appDatabase.getCategoryColor(categoryId);
    
    const fullscreen = document.createElement('div');
    fullscreen.className = 'meme-fullscreen';
    fullscreen.innerHTML = `
        <div class="meme-fullscreen-content" style="background: ${bgColor}">
            <small>${category || 'Случайная ситуация'}</small>
            <p>${text}</p>
            <button class="close-fullscreen">×</button>
        </div>
    `;
    
    document.body.appendChild(fullscreen);
    
    // Обработчики закрытия
    fullscreen.querySelector('.close-fullscreen').addEventListener('click', () => fullscreen.remove());
    
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') fullscreen.remove();
    });
    
    fullscreen.addEventListener('click', (e) => {
        if (e.target === fullscreen) fullscreen.remove();
    });
}