const DB_STATUS = {
    connected: false,
    checked: false
};

async function checkDatabaseConnection() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');

    try {
        // Проверяем, есть ли конфиг. Пока это заглушка, позже сюда подставим ключи Supabase
        const config = window.SUPABASE_CONFIG || {};
        const supabaseUrl = config.url || null;

        if (!supabaseUrl) {
            throw new Error('Supabase URL не настроен');
        }

        // 👇 Сюда позже вставим реальный пинг БД через @supabase/supabase-js
        // const { data, error } = await supabase.from('writeups').select('id').limit(1);
        // if (error) throw error;

        DB_STATUS.connected = true;
        statusDot.classList.add('online');
        statusDot.classList.remove('offline');
        statusText.textContent = 'БД подключена ✓';
        statusText.style.color = '#22c55e';
    } catch (e) {
        DB_STATUS.connected = false;
        statusDot.classList.add('offline');
        statusDot.classList.remove('online');
        statusText.textContent = 'БД не подключена';
        statusText.style.color = '#ef4444';
        console.log('DB check:', e.message);
    } finally {
        DB_STATUS.checked = true;
    }
}

// Запускаем после полной загрузки DOM
document.addEventListener('DOMContentLoaded', checkDatabaseConnection);