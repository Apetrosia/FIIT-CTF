import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const DB_STATUS = { connected: false, checked: false };

async function checkDatabaseConnection() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');

    try {
        // Пытаемся сделать самый лёгкий запрос к БД
        const { error } = await supabase.from('posts').select('id').limit(1).maybeSingle();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 = таблица пуста, это НЕ ошибка подключения
            throw new Error(error.message);
        }

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
        console.error('DB check failed:', e);
    } finally {
        DB_STATUS.checked = true;
    }
}

document.addEventListener('DOMContentLoaded', checkDatabaseConnection);