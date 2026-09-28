(() => {
  'use strict';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch {
    // Storage is optional: the system preference remains available.
  }

  if (preference) root.dataset.theme = preference;
  const currentTheme = () => preference || (system.matches ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme-toggle');
    const syncButton = () => button.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
    syncButton();
    button.hidden = false;
    button.addEventListener('click', () => {
      root.classList.add('theme-animated');
      preference = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = preference;
      syncButton();
      try {
        window.localStorage.setItem('theme', preference);
      } catch {
        // The selected theme still works for this visit.
      }
    });
    system.addEventListener('change', syncButton);
  });
})();
