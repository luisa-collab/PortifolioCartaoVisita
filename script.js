document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURAÇÃO DA TROCA DE TEMA (LIGHT/DARK) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const toggleIcon = themeToggleBtn.querySelector('i');
    

    // Verifica se já existe um tema salvo no navegador
    const savedTheme = localStorage.getItem('theme');
    
    // COMO O PADRÃO É LIGHT, SÓ MUDAMOS SE ESTIVER SALVO 'DARK'
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        toggleIcon.classList.remove('fa-sun');
        toggleIcon.classList.add('fa-moon');
    }

    // Evento de clique
    themeToggleBtn.addEventListener('click', () => {
        // Alterna a classe dark-theme
        body.classList.toggle('dark-theme');

        // Se a classe dark-theme estiver presente, salvamos 'dark'
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        } else {
            // Se não, salvamos 'light'
            localStorage.setItem('theme', 'light');
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        }
    });

    // --- 2. CONFIGURAÇÃO DO CARROSSEL DE TECNOLOGIAS (SWIPER) ---
    // Corrigido: Removidas duplicatas que quebravam o layout
    const swiper = new Swiper('.swiper', {
        speed: 800, 
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        grabCursor: true, // Mostra mãozinha
        centerInsufficientSlides: true,

        // Quantidade Padrão (Mobile pequeno)
        slidesPerView: 3, 
        spaceBetween: 10,

        // PONTOS DE QUEBRA (Responsividade)
        breakpoints: {
            480: { slidesPerView: 4, spaceBetween: 15 },
            640: { slidesPerView: 5, spaceBetween: 20 },
            768: { slidesPerView: 6, spaceBetween: 25 }, 
            1024: { slidesPerView: 8, spaceBetween: 30 }, // PC: Mostra 8 ícones pequenos
            1280: { slidesPerView: 10, spaceBetween: 30 }
        }
    });

    // --- 3. EFEITO FLASHLIGHT (LANTERNA) NOS PROJETOS ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

});

// --- 3. EFEITO 3D TILT NOS CARDS (REDFLAGS VIVAS) ---
    const cards = document.querySelectorAll('.redflag-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calcula o centro do card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Matemática para rotacionar baseado na posição do mouse
            // Multiplicamos por valores pequenos para não girar demais
            const rotateX = ((y - centerY) / centerY) * -10; // Gira no eixo X
            const rotateY = ((x - centerX) / centerX) * 10;  // Gira no eixo Y

            // Aplica a transformação
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        // Quando o mouse sai, o card volta ao normal suavemente
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    /* INICIALIZAR SWIPER (CARROSSEL DE PRINTS) */
var swiperCert = new Swiper(".myCertSwiper", {
    loop: true,        // Roda infinito
    grabCursor: true,  // Mãozinha
    
    // Configuração de quantos aparecem na tela
    breakpoints: {
        // Celular
        0: {
            slidesPerView: 1.2, // Mostra 1 e um pedacinho do próximo
            spaceBetween: 10,
        },
        // Tablet
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        // Notebook e PC (AQUI SÃO 5 ITENS)
        1024: {
            slidesPerView: 5, 
            spaceBetween: 20, 
        },
        // Monitores Gigantes (Full HD / 4K)
        1600: {
            slidesPerView: 5, 
            spaceBetween: 40, /* Mais espaço entre eles */
        }
    },
});