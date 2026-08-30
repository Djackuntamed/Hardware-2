const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

(function() {
  function initPan() {
    const poster = document.getElementById('posterSlideshow');
    if (poster) poster.remove();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPan);
  } else {
    initPan();
  }
})();

const jingle = document.getElementById('jingle');
function playJingleOnce() {
  if (!jingle) return;
  const p = jingle.play();
  if (p && typeof p.then === 'function') {
    p.catch(() => {
      const playOnInteract = () => { const q = jingle.play(); if (q && q.catch) q.catch(() => {}); };
      window.addEventListener('pointerdown', playOnInteract, { once: true });
      window.addEventListener('keydown', playOnInteract, { once: true });
    });
  }
}
playJingleOnce();
