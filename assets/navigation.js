(() => {
  'use strict';
  const contacts = document.getElementById('kontakt');
  let navigation = 0;

  async function navigate(hash, saveHistory = false) {
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    const request = ++navigation;
    if (saveHistory && location.hash !== hash) history.pushState(null, '', hash);

    if (target === contacts) contacts.open = true;
    // Wait for disclosure layout even when the next destination is below it.
    // Otherwise a rapid second navigation scrolls to a still-moving target.
    contacts.getBoundingClientRect();
    await Promise.allSettled(contacts.getAnimations({ subtree: true }).map(animation => animation.finished));
    if (request !== navigation) return;
    const focusTarget = target === contacts ? contacts.querySelector('summary') : target;
    focusTarget.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(link.hash, true);
    });
  });
  window.addEventListener('hashchange', () => {
    ++navigation;
    if (location.hash) navigate(location.hash);
  });
  // Deep links expose the requested contacts; ordinary visits stay collapsed.
  if (location.hash === '#kontakt') contacts.open = true;
})();
