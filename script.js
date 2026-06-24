/* =============================================
   WebInstant - script.js
============================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ── Navbar Scroll & Active ── */
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 20);
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navMenu.classList.toggle("open");
    });
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navMenu.classList.remove("open");
      });
    });
    // Close menu on outside click
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove("open");
        navMenu.classList.remove("open");
      }
    });
  }

  /* ── Active Nav Link (by page) ── */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
    if (link.dataset.page === currentPage) link.classList.add("active");
  });

  /* ── FAQ Accordion ── */
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  /* ── Scroll-reveal ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  /* ── Hero Image Slider ── */
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  if (slides.length > 0) {
    let current = 0;
    let autoSlide;

    const goTo = (index) => {
      slides[current].classList.remove("active");
      if (dots[current]) dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      if (dots[current]) dots[current].classList.add("active");
    };

    const startAuto = () => {
      clearInterval(autoSlide);
      autoSlide = setInterval(() => goTo(current + 1), 4000);
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goTo(current - 1);
        startAuto();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goTo(current + 1);
        startAuto();
      });
    }
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goTo(i);
        startAuto();
      });
    });

    // Touch/swipe support
    const sliderEl = document.querySelector(".hero-slider");
    if (sliderEl) {
      let touchStartX = 0;
      sliderEl.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].clientX;
        },
        { passive: true },
      );
      sliderEl.addEventListener(
        "touchend",
        (e) => {
          const diff = touchStartX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) {
            goTo(diff > 0 ? current + 1 : current - 1);
            startAuto();
          }
        },
        { passive: true },
      );
    }

    startAuto();
  }

  /* ── Contact Form ── */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name =
        contactForm.querySelector('[name="name"]')?.value.trim() || "";
      const service =
        contactForm.querySelector('[name="service"]')?.value || "";
      const message =
        contactForm.querySelector('[name="message"]')?.value.trim() || "";

      const waText = encodeURIComponent(
        `Hi WebInstant! 👋\n\nName: ${name}\nService: ${service || "Not specified"}\nMessage: ${message}`,
      );
      window.open(`https://wa.me/919871072210?text=${waText}`, "_blank");

      // Show success state
      const success = document.getElementById("formSuccess");
      if (success) {
        setTimeout(() => {
          contactForm.style.display = "none";
          success.classList.add("show");
        }, 400);
      }
    });
  }
});

/* ── WhatsApp helper (global) ── */
function openWhatsApp(message) {
  const text = encodeURIComponent(
    message || "Hi WebInstant! I would like to get a free quote.",
  );
  window.open(`https://wa.me/919871072210?text=${text}`, "_blank");
}
