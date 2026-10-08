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

const galleryAlbums = window.NAVARATRI_GALLERY;
const galleryYears = document.querySelector("#gallery-years");
const galleryPanel = document.querySelector("#gallery-panel");
const galleryGrid = document.querySelector("#gallery-grid");
const galleryEmpty = document.querySelector(".gallery__empty");
const galleryEmptyTitle = document.querySelector("#gallery-empty-title");
const galleryEmptyCopy = document.querySelector("#gallery-empty-copy");

const years = Object.keys(galleryAlbums).sort((a, b) => b.localeCompare(a));

for (const year of years) {
  const tab = document.createElement("button");
  tab.className = "gallery__year";
  tab.type = "button";
  tab.id = `gallery-tab-${year}`;
  tab.setAttribute("role", "tab");
  tab.setAttribute("aria-controls", "gallery-panel");
  tab.dataset.galleryYear = year;
  tab.textContent = year;
  galleryYears.append(tab);
}

const galleryTabs = galleryYears.querySelectorAll("[data-gallery-year]");
const initialYear = years.includes("2026") ? "2026" : years[0];

if (initialYear) {
  const initialTab = document.querySelector(`#gallery-tab-${initialYear}`);
  initialTab.setAttribute("aria-selected", "true");
  initialTab.tabIndex = 0;
}

function showGalleryYear(year) {
  const photos = galleryAlbums[year];
  galleryPanel.setAttribute("aria-labelledby", `gallery-tab-${year}`);
  galleryEmpty.hidden = photos.length > 0;
  galleryGrid.replaceChildren();

  if (photos.length === 0) {
    galleryEmptyTitle.textContent = `The ${year} album is waiting for its first photos.`;
    galleryEmptyCopy.textContent = `Add photos to the images/${year}/ folder and publish the update to see them here.`;
    return;
  }

  for (const photo of photos) {
    const figure = document.createElement("figure");
    figure.className = "gallery-photo";

    const image = document.createElement("img");
    image.src = `images/${year}/${photo.file}`;
    image.alt = photo.alt;
    image.loading = "lazy";
    image.addEventListener("error", () => {
      figure.classList.add("gallery-photo--missing");
      image.alt = "";
      const message = document.createElement("span");
      message.className = "gallery-photo__error";
      message.textContent = `Image not found: ${photo.file}`;
      figure.append(message);
    }, { once: true });

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;
    const label = document.createElement("span");
    label.textContent = photo.label;
    caption.append(label);

    figure.append(image, caption);
    galleryGrid.append(figure);
  }
}

for (const tab of galleryTabs) {
  tab.addEventListener("click", () => {
    for (const otherTab of galleryTabs) {
      const isSelected = otherTab === tab;
      otherTab.setAttribute("aria-selected", String(isSelected));
      otherTab.tabIndex = isSelected ? 0 : -1;
    }
    showGalleryYear(tab.dataset.galleryYear);
  });

  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const tabs = [...galleryTabs];
    const currentIndex = tabs.indexOf(tab);
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = tabs[(currentIndex + offset + tabs.length) % tabs.length];
    nextTab.focus();
    nextTab.click();
  });
}

if (initialYear) showGalleryYear(initialYear);

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
