// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
  });
}

// Close menu when a link is clicked
if (navMenu) {
  navMenu.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Lightbox functionality
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxCaption = document.querySelector('.lightbox__caption');
const lightboxClose = document.querySelector('.lightbox__close');

function openLightbox(src, label) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  lightboxImage.src = src;
  lightboxImage.alt = label;
  lightboxCaption.textContent = label;
  lightbox.classList.add('active');
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightboxImage.src = '';
}

document.querySelectorAll('[data-lightbox]').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    openLightbox(item.href, item.dataset.caption || 'Gallery image');
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

// Form handling with Formspree
const forms = document.querySelectorAll('form[data-remote]');
forms.forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    const data = new FormData(form);
    if (!status) return;
    status.textContent = 'Sending request...';
    status.classList.add('active');
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        status.textContent = 'Your inquiry has been sent successfully. We will contact you soon.';
        form.reset();
      } else {
        status.textContent = 'Submission completed in the browser. Please update the form action URL to a valid Formspree endpoint.';
      }
    } catch (error) {
      status.textContent = 'Unable to submit form from this page. Replace the placeholder endpoint or use a valid form integration URL.';
    }
  });
});

// Carousel functionality
const carousel = document.querySelector('.carousel');
const carouselPrevBtn = document.querySelector('.carousel__nav--prev');
const carouselNextBtn = document.querySelector('.carousel__nav--next');

if (carousel) {
  const slides = carousel.querySelectorAll('.carousel__slide');
  let currentSlideIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove('active');
    });
    if (index >= slides.length) {
      currentSlideIndex = 0;
    } else if (index < 0) {
      currentSlideIndex = slides.length - 1;
    } else {
      currentSlideIndex = index;
    }
    slides[currentSlideIndex].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    showSlide(currentSlideIndex - 1);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  // Show first slide and start auto-slide
  if (slides.length > 0) {
    showSlide(0);
    startAutoSlide();
  }
}

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const link = document.querySelector(`.nav__link[href="#${section.id}"]`);
    if (link) {
      if (rect.top >= -100 && rect.top < window.innerHeight / 2) {
        document.querySelectorAll('.nav__link').forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// Set initial active link
document.querySelectorAll('.nav__link').forEach((link) => {
  if (link.getAttribute('href') === '#home') {
    link.classList.add('active');
  }
});

