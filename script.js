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
