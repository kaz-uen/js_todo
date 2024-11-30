import App from "./src/App.js";

const app = new App();

// ページ読み込み時
window.addEventListener('load', () => app.mount());

// ページ破棄時（リロード・ページ遷移）
window.addEventListener('unload', () => app.unmount());
