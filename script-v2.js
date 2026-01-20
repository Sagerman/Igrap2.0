document.addEventListener('DOMContentLoaded', () => {
    
    /* MENÚ MÓVIL */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if(navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars'); icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
            }
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            if(icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
        });
    });

    /* SLIDER AUTOMÁTICO */
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function startAutoSlide() {
        if(slides.length > 0) { slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000); }
    }

    function stopAutoSlide() { clearInterval(slideInterval); }

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1); stopAutoSlide(); startAutoSlide();
        });
    }
    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1); stopAutoSlide(); startAutoSlide();
        });
    }
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index); stopAutoSlide(); startAutoSlide();
        });
    });

    startAutoSlide();

    /* FUNCIONALIDAD BOLETÍN */
    const btnSubscribe = document.getElementById('btnSubscribe');
    if(btnSubscribe) {
        btnSubscribe.addEventListener('click', () => {
            const email = document.getElementById('newsletterEmail').value;
            if(email.includes('@')) {
                alert('¡Gracias por suscribirte! Te enviaremos novedades pronto.');
                document.getElementById('newsletterEmail').value = '';
            } else {
                alert('Por favor ingresa un correo válido.');
            }
        });
    }

    /* FUNCIONALIDAD FORMULARIO DE CONTACTO (SIMULACIÓN) */
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            
            // Simular envío
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                alert('Gracias por escribirnos. Pronto te contactaremos al WhatsApp o Correo.');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
            }, 1500);
        });
    }

    /* --- LÓGICA DE BOTONES DEMO (CAMBIO DE TEXTO) --- */
    const topicBtns = document.querySelectorAll('.topic-btn');
    const msgArea = document.getElementById('mensaje');

    if(topicBtns.length > 0 && msgArea) {
        topicBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Quitar clase 'active' (naranja) a todos
                topicBtns.forEach(b => b.classList.remove('active'));
                
                // 2. Poner clase 'active' al que clickeaste
                btn.classList.add('active');
                
                // 3. Tomar el texto guardado en 'data-msg' y ponerlo en el textarea
                const textToFill = btn.getAttribute('data-msg');
                msgArea.value = textToFill;
                
                // 4. Efecto visual pequeño (flash borde naranja)
                msgArea.style.borderColor = '#ffa10b';
                setTimeout(() => msgArea.style.borderColor = '#eee', 300);
            });
        });
    }
});

/* --- FUNCIONALIDAD PÁGINA PRODUCTO (CARRUSEL Y ACORDEÓN) --- */
    
    // 1. Galería de Imágenes (Carrusel)
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumb-img');

    if(mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // a. Quitar clase active de todas
                thumbnails.forEach(t => t.classList.remove('active-thumb'));
                // b. Poner clase active a la clickeada
                this.classList.add('active-thumb');
                // c. Cambiar la imagen principal con efecto
                const newSrc = this.src;
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = '1';
                }, 200);
            });
        });
    }

    // 2. Funcionalidad Acordeón (Recomendaciones)
    const accordions = document.querySelectorAll('.accordion-header');
    if(accordions.length > 0) {
        accordions.forEach(acc => {
            acc.addEventListener('click', function() {
                const item = this.parentElement;
                item.classList.toggle('active');
                const content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                // Cerrar otros (opcional)
                accordions.forEach(otherAcc => {
                    if(otherAcc !== this && otherAcc.parentElement.classList.contains('active')) {
                         otherAcc.parentElement.classList.remove('active');
                         otherAcc.nextElementSibling.style.maxHeight = null;
                    }
                });
            });
        });
    }

/* =========================================
   LÓGICA DEL BUSCADOR PREDICTIVO
   ========================================= */
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchForm = document.getElementById('searchForm');

// 1. BASE DE DATOS DE TU SITIO (Agrega aquí todo lo que quieras que sea buscable)
const siteContent = [
    { title: "Impresoras Eco Inkall", subtitle: "Maquinaria XP600 / i3200", url: "impresoras.html", keywords: "impresora, maquina, plotter, eco solvente, inkall" },
    { title: "Vinilos Adhesivos", subtitle: "Alta adherencia y blancura", url: "vinil.html", keywords: "vinil, vinilo, adhesivo, blanco, mate, brillante" },
    { title: "Laminados", subtitle: "Protección UV Mate/Brillante", url: "laminados.html", keywords: "laminado, frio, proteccion, uv" },
    { title: "Display Roll Screen", subtitle: "Estructuras portátiles", url: "display.html", keywords: "display, roll up, banner, parante, publicidad" },
    { title: "Catálogo de Productos", subtitle: "Ver todas las categorías", url: "productos.html", keywords: "productos, catalogo, lista, todo" },
    { title: "Contacto / Ubicación", subtitle: "Dirección y Teléfonos", url: "contacto.html", keywords: "contacto, direccion, telefono, whatsapp, ubicacion" },
    { title: "Nosotros", subtitle: "Conoce a IGRAP", url: "nosotros.html", keywords: "nosotros, empresa, historia, equipo" },
    { title: "Preguntas Frecuentes", subtitle: "Envíos, garantías y pagos", url: "preguntas-frecuentes.html", keywords: "faq, preguntas, dudas, envios, pago" }
];

if(searchInput && searchResults) {

    // Escuchar cuando el usuario escribe
    searchInput.addEventListener('keyup', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        // Limpiar resultados anteriores
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');

        if(query.length > 0) {
            // Filtrar contenido
            const filteredData = siteContent.filter(item => {
                return item.title.toLowerCase().includes(query) || 
                       item.keywords.includes(query);
            });

            if(filteredData.length > 0) {
                searchResults.classList.add('active');
                
                // Generar HTML de los resultados
                filteredData.forEach(item => {
                    const link = document.createElement('a');
                    link.href = item.url;
                    link.className = 'search-item';
                    link.innerHTML = `
                        <i class="fas fa-arrow-right"></i>
                        <div>
                            <span class="search-item-title">${item.title}</span>
                            <span class="search-item-subtitle">${item.subtitle}</span>
                        </div>
                    `;
                    searchResults.appendChild(link);
                });
            } else {
                // Mensaje si no hay resultados
                searchResults.classList.add('active');
                searchResults.innerHTML = `
                    <div class="search-item" style="pointer-events: none; justify-content: center; color: #888;">
                        <span>No encontramos resultados</span>
                    </div>
                `;
            }
        }
    });

    // Ocultar resultados si hago click fuera
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Evitar que el formulario se envíe y recargue la página
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Si hay resultados visibles, ir al primero al dar Enter
        const firstResult = searchResults.querySelector('.search-item');
        if(firstResult) {
            window.location.href = firstResult.href;
        }
    });
}    