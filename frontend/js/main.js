// ---------------// frontend/js/main.js----------------

document.addEventListener('DOMContentLoaded', () => {
  // logo shrink on scroll
  const logo = document.querySelector('.logo');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      logo.classList.replace('w-32', 'w-20');
    } else {
      logo.classList.replace('w-20', 'w-32');
    }
  });

  // slider
  const slider = document.getElementById('testimonialSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentSlide = 0;
  const totalSlides = slider ? slider.children.length : 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (totalSlides === 0) return;
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (totalSlides === 0) return;
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    });
  }

  //movil
const mobileNav = document.querySelector('.mobile-nav');
let navOpen = false;

if (mobileNav) {
  mobileNav.addEventListener('click', () => {
    navOpen = !navOpen;

    mobileNav.querySelectorAll('li').forEach(li => {
      const letterSpan = li.querySelector('span:first-child');  // letra H/S/P/C
      const textSpan = li.querySelector('span:nth-child(2)');  // resto de la palabra

      if (navOpen) {
        // Ocultar la letra y mostrar toda la palabra
        letterSpan.classList.add('opacity-0');
        textSpan.classList.remove('opacity-0');
        textSpan.classList.add('opacity-100');
      } else {
        // Volver al estado original
        letterSpan.classList.remove('opacity-0');
        textSpan.classList.remove('opacity-100');
        textSpan.classList.add('opacity-0');
      }
    });
  });
}


  // document.querySelectorAll('.mobile-nav li').forEach(li => {
  // li.addEventListener('click', () => {
  //   const span = li.querySelector('span');
  //   span.classList.toggle('opacity-100');
  //   // span.classList.toggle('-translate-x-12');
  // });
  // });

  // Móvil: abrir/cerrar menú
// const mobileNav = document.getElementById('mobileNav');
// const mobileNavList = mobileNav.querySelector('.mobile-nav');

// mobileNav.addEventListener('click', (e) => {
//   e.stopPropagation(); // evita cerrar por click en body
//   mobileNavList.classList.toggle('hidden');
// });

document.addEventListener('click', () => {
  if (!mobileNavList.classList.contains('hidden')) {
    mobileNavList.classList.add('hidden');
  }
});

  // modal logic
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const openBtn = document.getElementById('openFormBtn');
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('closeModal');

  function openModal() {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // envio del formulario con fetch al backend
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.textContent = '';
    feedback.classList.remove('text-red-500', 'text-green-500');

    const formData = new FormData(form);
    const payload = {
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      message: formData.get('message') || '',
    };

    if (!payload.email.includes('@')) {
      feedback.textContent = 'Pon un correo válido.';
      feedback.classList.add('text-red-500');
      return;
    }
    if (!payload.firstName || !payload.lastName || !payload.phone || !payload.message) {
      feedback.textContent = 'Rellena todos los campos.';
      feedback.classList.add('text-red-500');
      return;
    }

    try {
      const res = await fetch('https://yellow-square-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let resultText = '';
      try {
        const parsed = await res.json();
        resultText = parsed.message || '';
      } catch {
        resultText = await res.text(); // fallback si no es JSON
      }

      if (res.ok) {
        feedback.textContent = resultText || 'Enviado correctamente.';
        feedback.classList.add('text-[#FFFBB0]', 'text-bold');
        form.reset();
        setTimeout(closeModal, 1500);
      } else {
        feedback.textContent = resultText || 'Error al enviar.';
        feedback.classList.add('text-red-500', 'text-bold');
      }
    } catch (err) {
      console.error(err);
      feedback.textContent = 'Error de conexión.';
      feedback.classList.add('text-red-500', 'text-bold');
    }
  });
}
});

