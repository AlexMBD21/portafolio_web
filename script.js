// ----------- Animaciones con IntersectionObserver -----------
function setupRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('active');
      else entry.target.classList.remove('active');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal, .from-left, .from-right')
          .forEach(el => observer.observe(el));
}

// ----------- Cambio de tema -----------
const toggleBtn = document.getElementById('theme-toggle');
function applyStoredTheme() {
  const storedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${storedTheme}-theme`);
  toggleBtn.textContent = storedTheme === 'dark' ? '☀️' : '🌙';
}
toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-theme');
  const newTheme = isDark ? 'light' : 'dark';
  document.body.classList.toggle('light-theme', newTheme === 'light');
  document.body.classList.toggle('dark-theme', newTheme === 'dark');
  localStorage.setItem('theme', newTheme);
  toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// --- Carrusel de Certificaciones ---
const track = document.querySelector('.cert-track');
const prev  = document.querySelector('.cert-btn.prev');
const next  = document.querySelector('.cert-btn.next');
if (track && prev && next){
  const cardWidth = 250 + 24; // tarjeta + gap
  next.onclick = () => track.scrollBy({ left:  cardWidth, behavior:'smooth' });
  prev.onclick = () => track.scrollBy({ left: -cardWidth, behavior:'smooth' });
}

// ----------- Menú Hamburguesa -----------
const hamburger  = document.getElementById('hamburger');
const navList    = document.querySelector('.nav-list');
const navOverlay = document.getElementById('nav-overlay');

function toggleMenu() {
  const isOpen = navList.classList.toggle('active');
  hamburger.classList.toggle('active', isOpen);
  navOverlay.classList.toggle('active', isOpen);

  navList.querySelectorAll('li').forEach((item, i) => {
    item.style.transitionDelay = isOpen ? `${i * 0.1 + 0.3}s` : '0s';
    item.classList.toggle('menu-fade-in', isOpen);
  });
}

function closeMenu() {
  navList.classList.remove('active');
  navOverlay.classList.remove('active');
  hamburger.classList.remove('active');
  navList.querySelectorAll('li').forEach(item => {
    item.classList.remove('menu-fade-in');
    item.style.transitionDelay = '0s';
  });
}

hamburger.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', closeMenu);

// ** NUEVO **: cerrar al hacer clic en cualquier enlace del menú
navList.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', closeMenu)
);

// ----------- Inicialización al cargar -----------
window.addEventListener('load', () => {
  setupRevealAnimations();
  applyStoredTheme();
});
