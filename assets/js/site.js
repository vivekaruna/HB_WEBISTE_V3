// Hillboy Engineering - Site Logic

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
  }

  // Close menu when a link is clicked (mobile)
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Carousel Logic
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel__slide');
  const prevBtn = document.querySelector('.carousel__nav--prev');
  const nextBtn = document.querySelector('.carousel__nav--next');

  if (carousel && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    const updateCarousel = () => {
      carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    };

    const startAutoSlide = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 4000); // 4 seconds
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
      });
    }

    // Initialize auto-slide
    startAutoSlide();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', startAutoSlide);
  }

  // Form Handling
  const form = document.querySelector('form[data-remote]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const submitBtn = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);

      if (status) {
        status.textContent = 'Processing...';
        status.style.display = 'block';
        status.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          if (status) {
            status.textContent = 'Thank you! Your inquiry has been sent.';
            status.style.color = '#25d366';
          }
          form.reset();
        } else {
          throw new Error();
        }
      } catch (err) {
        if (status) {
          status.textContent = 'Oops! Something went wrong. Please try again.';
          status.style.color = '#ff4d4d';
        }
      }
    });
  }

  // Active Link on Scroll
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
});
