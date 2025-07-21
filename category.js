document.addEventListener('DOMContentLoaded', () => {
    const category = JSON.parse(localStorage.getItem('selectedCategory'));
    const titleElement = document.getElementById('category-title');
    const grid = document.querySelector('.memes-grid');
    
    // Устанавливаем заголовок
    titleElement.textContent = category?.title || "Категория";
    grid.innerHTML = '';
    
    // Получаем данные категории
    const situations = appDatabase.getCategorySituations(category?.id);
    const bgColor = appDatabase.getCategoryColor(category?.id);
    
    // Создаем карточки ситуаций
    situations.forEach(text => {
        const card = document.createElement('div');
        card.className = 'meme-card';
        card.style.background = bgColor;
        card.innerHTML = `<p>${text}</p>`;
        
        // Обработчик для полноэкранного режима
        card.addEventListener('click', () => {
            const fullscreen = document.createElement('div');
            fullscreen.className = 'meme-fullscreen';
            fullscreen.innerHTML = `
                <div class="meme-fullscreen-content" style="background: ${bgColor}">
                    <p>${text}</p>
                    <button class="close-fullscreen">×</button>
                </div>
            `;
            
            document.body.appendChild(fullscreen);
            
            // Закрытие по кнопке
            fullscreen.querySelector('.close-fullscreen').addEventListener('click', () => {
                fullscreen.remove();
            });
            
            // Закрытие по Esc
            document.addEventListener('keydown', function closeOnEsc(e) {
                if (e.key === 'Escape') fullscreen.remove();
            });
            
            // Закрытие по клику вне текста
            fullscreen.addEventListener('click', (e) => {
                if (e.target === fullscreen) fullscreen.remove();
            });
        });
        
        grid.appendChild(card);
    });
});