// Обновление времени
function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
        timeElement.textContent = timeString;
    }
}

// Параллакс эффект для главной страницы
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const grid = document.querySelector('.grid-background');
        if (grid) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            grid.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 60000);
    initParallax();
    
    // Анимация статус баджа
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        setInterval(() => {
            badge.style.transform = 'scale(1.2)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    }
});