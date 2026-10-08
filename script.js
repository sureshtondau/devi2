const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  }
});

const countdownTarget = new Date("2026-10-11T00:00:00+05:30").getTime();
const countdownMessage = document.querySelector("#countdown-message");
const countdown = document.querySelector("#countdown");

function updateCountdown() {
  const remaining = countdownTarget - Date.now();

  if (remaining <= 0) {
    countdownMessage.textContent = "Navarathri is here — let’s celebrate";
    countdown.innerHTML = '<div class="countdown__live"><strong>Jai Mata Di!</strong><span>THE CELEBRATION BEGINS</span></div>';
    return;
  }

  const units = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000),
  };

  for (const [unit, value] of Object.entries(units)) {
    countdown.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, "0");
  }
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll(".value-card, .goddess-card, .schedule-card, .register-card").forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}
