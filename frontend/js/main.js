// ---------------// frontend/js/main.js----------------

document.addEventListener("DOMContentLoaded", () => {
  // logo shrink on scroll
  const logo = document.querySelector(".logo");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      logo.classList.replace("w-32", "w-20");
    } else {
      logo.classList.replace("w-20", "w-32");
    }
  });

  // slider
  const slider = document.getElementById("testimonialSlider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentSlide = 0;
  const totalSlides = slider ? slider.children.length : 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (totalSlides === 0) return;
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (totalSlides === 0) return;
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    });
  }

  //movil
  const mobileNav = document.querySelector(".mobile-nav");
  let navOpen = false;

  if (mobileNav) {
    mobileNav.addEventListener("click", () => {
      navOpen = !navOpen;

      mobileNav.querySelectorAll("li a").forEach((a) => {
        const spans = a.querySelectorAll("span");
        const letterSpan = spans[0]; // primera letra
        const textSpan = spans[1]; // palabra completa

        if (navOpen) {
          letterSpan.classList.add("opacity-0");
          textSpan.classList.remove("opacity-0");
          textSpan.classList.add("opacity-100");
        } else {
          letterSpan.classList.remove("opacity-0");
          textSpan.classList.remove("opacity-100");
          textSpan.classList.add("opacity-0");
        }
      });
    });
  }

  // comportamiento de mini nav
  const miniNav = document.getElementById("miniNav");
  const fullNav = document.getElementById("fullNav");
  const closeNav = document.getElementById("closeNav");

  // Abrir fullNav y ocultar miniNav
  miniNav.addEventListener("click", (e) => {
    e.stopPropagation();
    miniNav.parentElement.classList.add("hidden"); // oculta todo el contenedor del miniNav
    fullNav.classList.remove("hidden"); // muestra fullNav
  });

  // Cerrar fullNav al hacer clic fuera y mostrar miniNav otra vez
  document.addEventListener("click", (e) => {
    if (!fullNav.contains(e.target) && !miniNav.contains(e.target)) {
      fullNav.classList.add("hidden");
      miniNav.parentElement.classList.remove("hidden");
    }
  });

  // Cerrar fullNav con el botón
  closeNav.addEventListener("click", (e) => {
    e.stopPropagation();
    fullNav.classList.add("hidden");
    miniNav.parentElement.classList.remove("hidden");
  });

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

  // document.addEventListener('click', () => {
  //   if (!mobileNavList.classList.contains('hidden')) {
  //     mobileNavList.classList.add('hidden');
  //   }
  // });

  // modal logic
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");
  const openBtn = document.getElementById("openFormBtn");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("closeModal");

  function openModal() {
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }

  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // envio del formulario con fetch al backend
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      feedback.textContent = "";
      feedback.classList.remove("text-red-500", "text-green-500");

      const formData = new FormData(form);
      const payload = {
        firstName: formData.get("firstName") || "",
        lastName: formData.get("lastName") || "",
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        message: formData.get("message") || "",
      };

      if (!payload.email.includes("@")) {
        feedback.textContent = "Pon un correo válido.";
        feedback.classList.add("text-red-500");
        return;
      }
      if (
        !payload.firstName ||
        !payload.lastName ||
        !payload.phone ||
        !payload.message
      ) {
        feedback.textContent = "Rellena todos los campos.";
        feedback.classList.add("text-red-500");
        return;
      }

      try {
        const res = await fetch(
          "https://yellow-square-backend.onrender.com/api/contact",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        let resultText = "";
        try {
          const parsed = await res.json();
          resultText = parsed.message || "";
        } catch {
          resultText = await res.text(); // fallback si no es JSON
        }

        if (res.ok) {
          feedback.textContent = resultText || "Enviado correctamente.";
          feedback.classList.add("text-[#FFFBB0]", "text-bold");
          form.reset();
          setTimeout(closeModal, 1500);
        } else {
          feedback.textContent = resultText || "Error al enviar.";
          feedback.classList.add("text-red-500", "text-bold");
        }
      } catch (err) {
        console.error(err);
        feedback.textContent = "Error de conexión.";
        feedback.classList.add("text-red-500", "text-bold");
      }
    });
  }
});

//  <!-- NAV PARA PANTALLAS MEDIANAS Y PEQUEÑAS (visible solo en md y menores) -->
//         <div class="w-1/3 flex lg:hidden items-end justify-end relative ">
//           <nav class="mobile-nav flex flex-col items-center justify-center w-16 h-56 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md shadow-md  active:shadow-blue-200 transition-all duration-300 ease-in-out">
//             <ul class="flex flex-col space-y-4 text-black font-medium text-xl">
//               <li class=" relative flex items-center">
//                 <a href="#home" class="flex items-center">
//                   <span class="text-2xl z-10 transition-transform duration-300">H</span>
//                   <span class="absolute left-full pr-2 text-2xl whitespace-nowrap rounded-full  opacity-0 transition-opacity duration-300 -translate-x-12 z-10 pointer-events-none">
//                     Home
//                   </span>
//                 </a>
//               </li>
//               <li class=" relative flex items-center">
//                 <a href="#services" class="flex items-center">
//                   <span class="text-2xl z-10 transition-transform duration-300">S</span>
//                   <span class="absolute left-full -ml-16 pr-2 text-2xl whitespace-nowrap rounded-full  opacity-0 transition-opacity duration-300 -translate-x-12 z-10 pointer-events-none">
//                     Servicios
//                   </span>
//                 </a>
//               </li>
//               <li class=" relative flex items-center">
//                 <a href="#portfolio-us" class="flex items-center">
//                   <span class="text-2xl z-10 transition-transform duration-300">P</span>
//                   <span class="absolute left-full -ml-20 pr-2 text-2xl whitespace-nowrap rounded-full  opacity-0 transition-opacity duration-300 -translate-x-12 z-10 pointer-events-none">
//                     Portafolio
//                   </span>
//                 </a>
//               </li>
//               <li class=" relative flex items-center">
//                 <a href="#call-us" class="flex items-center">
//                   <span class="flex items-centertext-2xl z-10 transition-transform duration-300">C</span>
//                   <span class="absolute left-full -ml-12 pr-2 text-2xl whitespace-nowrap rounded-full opacity-0 transition-opacity duration-300 -translate-x-12 z-10 pointer-events-none">
//                     Contacto
//                   </span>
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         </div>

// <!-- NAV PARA PANTALLAS MEDIANAS Y PEQUEÑAS (visible solo en md y menores) -->
//         <div class="w-1/3 flex lg:hidden items-end justify-end relative ">
//           <nav class="mobile-nav flex flex-col items-center justify-center w-16 h-56 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md shadow-md focus:outline-2 focus:outline-offset-2 active:translate-1 hover:shadow-blue-200 transition-all duration-300 ease-in-out">
//             <ul class="flex flex-col space-y-4 text-black font-medium text-xl">
//               <li class=" relative flex items-center">
//                 <span class="flex items-center text-2xl z-10 transition-transform duration-300">H</span>
//               </li>
//               <li class=" relative flex items-center">
//                   <span class="flex items-center text-2xl z-10 transition-transform duration-300">S</span>
//                 </a>
//               </li>
//               <li class=" relative flex items-center">
//                   <span class="text-2xl z-10 transition-transform duration-300">P</span>
//               </li>
//               <li class=" relative flex items-center">
//                   <span class="flex items-centertext-2xl z-10 transition-transform duration-300">C</span>
//               </li>
//             </ul>
//           </nav>
//         </div>
