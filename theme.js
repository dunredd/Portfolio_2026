// ===== THEME TOGGLE =====
// Reads from localStorage, toggles light/dark, persists across pages.

(function () {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
        const html = document.documentElement;
        const isLight = html.getAttribute('data-theme') === 'light';
        const next = isLight ? 'dark' : 'light';

        // Add transition class for smooth color change
        html.classList.add('theme-transitioning');

        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);

        // Remove transition class after animation completes
        setTimeout(function () {
            html.classList.remove('theme-transitioning');
        }, 450);
    });
})();
