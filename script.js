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
const toggleInput = document.getElementById("theme-toggle");

function applyStoredTheme() {
  const storedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.remove("light-theme", "dark-theme");
  document.body.classList.add(`${storedTheme}-theme`);
  toggleInput.checked = storedTheme === "dark";
}

toggleInput.addEventListener("change", () => {
  const isDark = toggleInput.checked;
  const newTheme = isDark ? "dark" : "light";
  document.body.classList.remove("light-theme", "dark-theme");
  document.body.classList.add(`${newTheme}-theme`);
  localStorage.setItem("theme", newTheme);
});

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", applyStoredTheme);





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





// ----------- Comportamiento del botón "Leer más" en la sección "Sobre mí" -----------
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".read-more-btn");
  const content = document.querySelector(".about-content");

  function checkOverflow() {
    // Solo se aplica en pantallas móviles
    if (window.innerWidth <= 700) {
      const isOverflowing = content.scrollHeight > 400;
      btn.style.display = isOverflowing ? "inline-block" : "none";

      // Colapsa el contenido inicialmente
      if (!content.classList.contains("expanded")) {
        content.style.maxHeight = "400px";
      }
    } else {
      btn.style.display = "none";
      content.classList.add("expanded");
      content.style.maxHeight = "none";
    }
  }

  btn.addEventListener("click", function () {
    const isExpanded = content.classList.toggle("expanded");
    content.style.maxHeight = isExpanded ? "none" : "400px";
    btn.textContent = isExpanded ? "Leer menos" : "Leer más";
  });

  window.addEventListener("resize", checkOverflow);
  checkOverflow(); // ejecuta al cargar
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

// ----------- Comportamiento de las certificaciones al hacer clic -----------
  function setupCertClickToggle() {
    const certItems = document.querySelectorAll('.cert-item');
    let lastTouched = null;

    certItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();

        // Evita activar si el clic fue en el botón de zoom
        if (e.target.closest('.cert-view-btn')) return;

        // Si tocaste el mismo ítem otra vez, desactíalo
        if (lastTouched === item) {
          item.classList.remove('active');
          lastTouched = null;
          return;
        }

        // Desactiva todos los demás
        certItems.forEach(i => i.classList.remove('active'));

        // Activa este
        item.classList.add('active');
        lastTouched = item;
      });
    });

    // Clic fuera de los items, desactiva todos
    document.addEventListener('click', () => {
      certItems.forEach(item => item.classList.remove('active'));
      lastTouched = null;
    });
  }

  // Ejecutar cuando cargue el DOM
  document.addEventListener('DOMContentLoaded', setupCertClickToggle);





// ----------- Animaciones de habilidades -----------
function setupSkillAnimations() {
  const skills = document.querySelectorAll('.skill');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skill = entry.target;
        const percentage = parseInt(skill.getAttribute('data-percentage'), 10);
        const progress = skill.querySelector('.progress');
        const percentageText = skill.querySelector('.percentage-text');

        const radius = 50;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (circumference * percentage / 100);

        // Reinicio visual (permite repetición visual si quieres)
        progress.style.transition = 'none';
        progress.style.strokeDashoffset = circumference;
        percentageText.textContent = '0%';

        setTimeout(() => {
          // Activa la transición del trazo
          progress.style.transition = 'stroke-dashoffset 2s ease-out';
          progress.style.strokeDashoffset = offset;

          // Animación del número
          let count = 0;
          const duration = 2000;
          const interval = 20;
          const steps = duration / interval;
          const increment = percentage / steps;

          const counter = setInterval(() => {
            count += increment;
            if (count >= percentage) {
              count = percentage;
              clearInterval(counter);
            }
            percentageText.textContent = `${Math.round(count)}%`;
          }, interval);
        }, 100); // delay pequeño para sincronizar
      }
    });
  }, {
    threshold: 0.6
  });

  skills.forEach(skill => observer.observe(skill));
}






// ----------- Comportamiento de las tarjetas de proyectos -----------
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  document.querySelectorAll('.menu-icon').forEach(icon => {
    icon.addEventListener('click', e => {
      e.stopPropagation();

      const currentCard = icon.closest('.project-card');

      // Cierra todas las demás
      cards.forEach(card => {
        if (card !== currentCard) {
          card.classList.remove('show-button');
        }
      });

      // Alterna esta
      currentCard.classList.toggle('show-button');
    });
  });

  // Cierra al hacer clic fuera
  document.addEventListener('click', e => {
    if (!e.target.closest('.project-card')) {
      cards.forEach(card => card.classList.remove('show-button'));
    }
  });
});









// ----------- Inicialización al cargar -----------
window.addEventListener('load', () => {
  setupRevealAnimations();
  applyStoredTheme();
  setupSkillAnimations();
  setupCertClickToggle();
});



