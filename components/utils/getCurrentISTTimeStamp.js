// Helper to get current IST time in 'YYYY-MM-DD HH:mm:ss'
export function getCurrentISTTimestamp() {
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}