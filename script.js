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

// ----------- Ajuste de Scroll para evitar que el header tape las secciones -----------

const headerOffset = document.querySelector('.header')?.offsetHeight || 80;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
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

// ----------- Animaciones de habilidades -----------
function setupSkillAnimations() {
  const skills = document.querySelectorAll('.skill');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skill = entry.target;
        const percentage = skill.getAttribute('data-percentage');
        const progress = skill.querySelector('.progress');
        const offset = 314 - (314 * percentage / 100);
        progress.style.strokeDashoffset = offset;

        // observer.unobserve(skill); // Evita que se repita

        // Usa esto si quieres repetir animación:
        progress.style.transition = 'none';
        progress.style.strokeDashoffset = 314;
        setTimeout(() => {
          progress.style.transition = 'stroke-dashoffset 2s ease-out';
          progress.style.strokeDashoffset = offset;
        }, 100);
      }
    });
  }, {
    threshold: 0.6
  });

  skills.forEach(skill => observer.observe(skill));
}


// ----------- Inicialización al cargar -----------
window.addEventListener('load', () => {
  setupRevealAnimations();
  applyStoredTheme();
  setupSkillAnimations();
});



