document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".seccion");
    const image = document.querySelector("#yssImgSize");
    const navLinks = document.querySelectorAll("ul li a"); // Selecciona todos los enlaces dentro del ul
    let currentSectionIndex = 0;

    sections[currentSectionIndex].classList.add("active");

    function smoothScrollTo(targetY) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 800; // Duración en milisegundos
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1); // Normaliza el progreso

            // Ecuación de interpolación (easeInOut)
            const ease = 0.5 - Math.cos(progress * Math.PI) / 2; 
            window.scrollTo(0, startY + distance * ease); // Desplazamiento

            if (elapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    function scrollToSection(index) {
        sections[currentSectionIndex].classList.remove("active");
        currentSectionIndex = index;
        sections[currentSectionIndex].classList.add("active");
        smoothScrollTo(sections[currentSectionIndex].offsetTop);
    }

    window.addEventListener("wheel", function (event) {
            if (document.body.classList.contains('overflow-hidden')) {
            return; // Si hay overlay activo, no hace scroll del fondo
            }

            if (event.deltaY > 0) {
                if (currentSectionIndex < sections.length - 1) {
                    scrollToSection(currentSectionIndex + 1);
                }
            } else {
                if (currentSectionIndex > 0) {
                    scrollToSection(currentSectionIndex - 1);
                }
            }
    });

    // Maneja clics en enlaces de navegación
    navLinks.forEach((link, index) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Previene el comportamiento por defecto del enlace
            scrollToSection(index); // Desplázate a la sección correspondiente
        });
    });

    // Cambia el color del texto de los enlaces al entrar en section2
    window.addEventListener("scroll", function () {
        if (sections[currentSectionIndex].id !== "section1") {
            applyNavLinkColor(navLinks, "#DBDA17"); // Cambia el color del texto de los enlaces
            applyAnimation(image);
        } else {
            resetNavLinkColor(navLinks); // Restablece el color del texto de los enlaces
            resetAnimation(image);
        }
    });

    function applyAnimation(image) {
        image.style.animation = "easyOut 4s forwards";
        image.style.filter = "brightness(0.7)";
        image.style.width = "20%";
    }

    function resetAnimation(image) {
        image.style.animation = "none";
        image.style.width = "50%";
        image.style.filter = "brightness(1)";
    }

    function applyNavLinkColor(links, color) {
        links.forEach(link => {
            link.style.color = color; // Cambia el color de cada enlace
            link.style.transition = "color 0.5s ease"; // Añadir transición suave
        });
    }

    function resetNavLinkColor(links) {
        links.forEach(link => {
            link.style.color = ""; // Vuelve al color original
        });
    }

    // Agregar la definición de la animación al estilo del documento
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes easyOut {
            0% {
                width: 50%;
                filter: brightness(1);
            }
            100% {
                width: 20%;
                filter: brightness(0.7);
            }
        }
    `;
    document.head.appendChild(style);
});

