// Variables globales
let currentSlide = 0;
const totalSlides = 5;
let autoPlayInterval;
let isAutoPlaying = false;

// Elementos del DOM
const welcomeScreen = document.getElementById('welcomeScreen');
const presentation = document.getElementById('presentation');
const navigation = document.getElementById('navigation');
const progress = document.getElementById('progress');
const slides = document.querySelectorAll('.slide');

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    updateProgress();
});

// Función para iniciar la presentación
function startPresentation() {
    welcomeScreen.classList.remove('active');
    
    setTimeout(() => {
        presentation.classList.add('active');
        navigation.classList.add('active');
        startAutoPlay();
        playSlideAnimation(0);
    }, 800);
}

// Función para reiniciar la presentación
function restartPresentation() {
    stopAutoPlay();
    currentSlide = 0;
    
    // Ocultar presentación y navegación
    presentation.classList.remove('active');
    navigation.classList.remove('active');
    
    // Resetear slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    setTimeout(() => {
        welcomeScreen.classList.add('active');
        updateProgress();
    }, 500);
}

// Función para ir al siguiente slide
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        changeSlide(currentSlide + 1);
    }
}

// Función para ir al slide anterior
function previousSlide() {
    if (currentSlide > 0) {
        changeSlide(currentSlide - 1);
    }
}

// Función para cambiar de slide
function changeSlide(newSlide) {
    if (newSlide >= 0 && newSlide < totalSlides) {
        // Remover clase active del slide actual
        slides[currentSlide].classList.remove('active');
        
        // Actualizar slide actual
        currentSlide = newSlide;
        
        // Agregar clase active al nuevo slide
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            playSlideAnimation(currentSlide);
        }, 300);
        
        // Actualizar progreso
        updateProgress();
        
        // Actualizar botones de navegación
        updateNavigationButtons();
        
        // Reiniciar autoplay si está activo
        if (isAutoPlaying) {
            restartAutoPlay();
        }
    }
}

// Función para reproducir animación del slide
function playSlideAnimation(slideIndex) {
    const slide = slides[slideIndex];
    const flowerIcon = slide.querySelector('.flower-icon');
    const title = slide.querySelector('h2');
    const paragraph = slide.querySelector('p');
    
    // Animar icono de flor
    if (flowerIcon) {
        flowerIcon.style.animation = 'none';
        setTimeout(() => {
            flowerIcon.style.animation = 'rotate 4s ease-in-out infinite';
        }, 100);
    }
    
    // Animar aparición del texto
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        setTimeout(() => {
            title.style.transition = 'all 0.6s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (paragraph) {
        paragraph.style.opacity = '0';
        paragraph.style.transform = 'translateY(20px)';
        setTimeout(() => {
            paragraph.style.transition = 'all 0.8s ease';
            paragraph.style.opacity = '1';
            paragraph.style.transform = 'translateY(0)';
        }, 400);
    }
}

// Función para actualizar la barra de progreso
function updateProgress() {
    const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
    progress.style.width = progressPercentage + '%';
}

// Función para actualizar botones de navegación
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

// Función para iniciar auto-play
function startAutoPlay() {
    isAutoPlaying = true;
    autoPlayInterval = setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            nextSlide();
        } else {
            stopAutoPlay();
        }
    }, 6000); // Cambiar cada 6 segundos
}

// Función para detener auto-play
function stopAutoPlay() {
    isAutoPlaying = false;
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

// Función para reiniciar auto-play
function restartAutoPlay() {
    stopAutoPlay();
    if (currentSlide < totalSlides - 1) {
        startAutoPlay();
    }
}

// Función para inicializar partículas flotantes
function initializeParticles() {
    const particlesContainer = document.querySelector('.particles');
    const flowers = ['🌻', '🌼', '🌸', '🌹', '🌷', '🌺', '🌳'];
    
    // Crear partículas iniciales
    for (let i = 0; i < 6; i++) {
        createFloatingParticle(particlesContainer, flowers);
    }
    
    // Crear nuevas partículas cada cierto tiempo
    setInterval(() => {
        createFloatingParticle(particlesContainer, flowers);
    }, 3000);
}

// Función para crear una partícula flotante
function createFloatingParticle(container, flowers) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.fontSize = Math.random() * 20 + 15 + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100vh';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.6';
    particle.style.zIndex = '1';
    particle.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    
    // Animación de flotación
    particle.style.animation = `floatUp ${Math.random() * 10 + 15}s linear forwards`;
    
    container.appendChild(particle);
    
    // Remover partícula después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 25000);
}

// Agregar estilo para la animación de flotación
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Controles de teclado
document.addEventListener('keydown', function(e) {
    if (presentation.classList.contains('active')) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'Escape':
                e.preventDefault();
                restartPresentation();
                break;
            case 'Home':
                e.preventDefault();
                changeSlide(0);
                break;
            case 'End':
                e.preventDefault();
                changeSlide(totalSlides - 1);
                break;
        }
    } else if (welcomeScreen.classList.contains('active')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            startPresentation();
        }
    }
});

// Efecto de hover en los slides
slides.forEach((slide, index) => {
    slide.addEventListener('mouseenter', function() {
        stopAutoPlay();
    });
    
    slide.addEventListener('mouseleave', function() {
        if (currentSlide < totalSlides - 1) {
            startAutoPlay();
        }
    });
});

// Efecto de clic en cualquier parte del slide para avanzar
slides.forEach((slide, index) => {
    slide.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON') {
            nextSlide();
        }
    });
});

// Prevenir comportamiento por defecto en botones
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Función para crear efecto de corazones ocasional
function createHeartEffect() {
    const hearts = ['💛', '💚', '🧡', '💝', '💖'];
    const heart = document.createElement('div');
    heart.style.position = 'fixed';
    heart.style.fontSize = '30px';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = '100vh';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '2';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.animation = 'floatUp 8s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 8000);
}

// Crear efecto de corazones cada 10 segundos
setInterval(createHeartEffect, 10000);

// Inicializar botones de navegación al cargar
document.addEventListener('DOMContentLoaded', function() {
    updateNavigationButtons();
});