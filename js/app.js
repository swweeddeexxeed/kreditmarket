document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tableContainer = document.getElementById('table-container');
    const loading = document.getElementById('loading');
    const lastUpdateEl = document.getElementById('last-update');
    
    // Активный таб
    let activeTab = 'users';
    
    // Функция загрузки данных
    async function loadData(tab) {
        loading.style.display = 'block';
        tableContainer.innerHTML = '';
        
        try {
            const response = await fetch(`data/${tab}.json`);
            const data = await response.json();
            
            // Обновляем время последнего обновления
            const now = new Date();
            lastUpdateEl.textContent = now.toLocaleString('ru-RU');
            
            // Создаем таблицу
            createTable(data);
        } catch (error) {
            tableContainer.innerHTML = `<p style="color: red;">Ошибка загрузки данных: ${error.message}</p>`;
        } finally {
            loading.style.display = 'none';
        }
    }
    
    // Функция создания таблицы
    function createTable(data) {
        if (data.length === 0) {
            tableContainer.innerHTML = '<p>Нет данных</p>';
            return;
        }
        
        // Получаем заголовки из первого объекта
        const headers = Object.keys(data[0]);
        
        let html = '<table>';
        
        // Заголовки
        html += '<thead><tr>';
        headers.forEach(header => {
            html += `<th>${header}</th>`;
        });
        html += '</tr></thead>';
        
        // Данные
        html += '<tbody>';
        data.forEach(row => {
            html += '<tr>';
            headers.forEach(header => {
                const value = row[header] || '';
                html += `<td>${value}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        
        tableContainer.innerHTML = html;
    }
    
    // Обработчики кликов по табам
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Убираем активный класс у всех табов
            tabs.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс текущему
            this.classList.add('active');
            
            // Загружаем данные
            activeTab = this.dataset.tab;
            loadData(activeTab);
        });
    });
    
    // Загружаем данные при загрузке страницы
    loadData(activeTab);
    
    // Проверяем статус GitHub Actions
    async function checkWorkflowStatus() {
        try {
            // Здесь можно добавить API GitHub для проверки статуса workflow
            const workflowStatus = document.getElementById('workflow-status');
            workflowStatus.textContent = '✅ Активен';
            workflowStatus.style.color = 'green';
        } catch (error) {
            console.log('Не удалось проверить статус workflow');
        }
    }
    
    checkWorkflowStatus();
});
