// Chiffres animés
function animateCounter(el) {
    const target = +el.getAttribute("data-target");
    let count = 0;

    const update = () => {
        count += Math.ceil(target / 500); // durée ~1s
        if(count < target) {
            el.textContent = count.toLocaleString() + "+";
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString() + "+";
        }
    };

    update();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".stat-number").forEach(num => animateCounter(num));
});

// Loader full-screen
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;
    const MIN_DELAY = 1000;
    const elapsed = performance.now();
    const delay = Math.max(MIN_DELAY - elapsed, 0);

    setTimeout(() => {
        loader.classList.add("loader--hide");
        setTimeout(() => loader.remove(), 700);
    }, delay);
});

// Animation sections depuis le bas
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    if (!sections.length) return;

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });

    sections.forEach((section) => {
        section.classList.add("section-scroll");
        sectionObserver.observe(section);
    });
});

// ===============================
// Roadmap Reveal Animation
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    
    const items = document.querySelectorAll(".timeline-item");
    const cards = document.querySelectorAll(".roadmap-card");

    function triggerAnimation() {
        const triggerPoint = window.innerHeight * 0.85;

        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();

            // élément atteint le point de déclenchement
            if (rect.top < triggerPoint) {
                
                // Active l'item timeline
                item.classList.add("fade-up");
                item.classList.add("active");

                // Active la carte correspondante
                if (cards[index]) {
                    cards[index].classList.add("fade-up");
                }
            }
        });
    }

    // Déclenche lors du scroll
    window.addEventListener("scroll", triggerAnimation);

    // Déclenche au chargement pour les éléments déjà visibles
    triggerAnimation();
});



// ===============================
// Intersection Observer pour les reveals
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => obs.observe(el));
});



// === Popup Logic (multiple buttons allowed) ===
const joinDaoButtons = document.querySelectorAll(".joinDaoBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

// Open popup from any button
joinDaoButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    popup.classList.add("active");
  });
});

// Close popup
if (closePopup) {
  closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
  });
}

// Close when clicking overlay
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.classList.remove("active");
});
