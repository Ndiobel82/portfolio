document.addEventListener("DOMContentLoaded", function () {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("primaryNav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  function closeMenu() {
    if (!nav || !menuToggle) {
      return;
    }
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    if (!nav || !menuToggle) {
      return;
    }
    nav.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  const sections = ["accueil", "projets", "parcours", "contact"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          const targetId = entry.target.id;
          navLinks.forEach(function (link) {
            const isActive = link.getAttribute("href") === "#" + targetId;
            link.classList.toggle("active", isActive);
            if (isActive) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-32% 0px -52% 0px",
        threshold: 0.12
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const galleryItems = document.querySelectorAll(".gallery-item");

  function closeLightbox() {
    if (!lightbox || !lightboxImage) {
      return;
    }
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.style.overflow = "";
  }

  function openLightbox(source, altText) {
    if (!lightbox || !lightboxImage || !source) {
      return;
    }
    lightboxImage.src = source;
    lightboxImage.alt = altText || "Aperçu de l'image";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  if (galleryItems.length && lightbox && lightboxClose) {
    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        openLightbox(item.dataset.image, item.dataset.alt);
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }
});
