/* =========================================================
   EDIT YOUR CONTENT HERE
   To add a project: copy one { ... } block and change it.
   Leave github / live as "" if you don't have that link.
   ========================================================= */

const projects = [
  {
    title: "Stock Forecasting & Portfolio Optimiser",
    status: "In progress",
    category: "Machine Learning",
    description:
      "Production-style ML app that forecasts stock prices with Facebook Prophet and builds an optimal portfolio using Markowitz optimisation. Being extended to cover the Dhaka Stock Exchange (DSE).",
    tech: ["Python", "Prophet", "Streamlit", "Pandas"],
    github: "https://github.com/sadmanmahmood3",
    live: "",
  },
  {
    title: "Satellite Collision Predictor",
    status: "Completed",
    category: "Machine Learning",
    description:
      "Predicts the risk of collisions between satellites in orbit. Built with a teammate.",
    tech: ["Python", "Machine Learning"],
    github: "https://github.com/sadmanmahmood3",
    live: "",
  },
  {
    title: "AROHA — Clothing Brand Website",
    status: "Live",
    category: "Web",
    description:
      "Full website for my own clothing brand (hoodies & punjabi), with a clean, premium look inspired by global streetwear brands. Deployed on Netlify.",
    tech: ["HTML", "CSS", "JavaScript", "Netlify"],
    github: "", // private repo
    live: "https://arohabd.netlify.app",
  },
  {
    title: "ClubHub",
    status: "In progress",
    category: "Web",
    description:
      "Club and event management web app for IUB students. Group project for CSE 451 (Software Engineering) — from SRS and Gantt chart through to implementation.",
    tech: ["Web App", "Team Project", "SRS"],
    github: "https://github.com/sadmanmahmood3",
    live: "",
  },
  {
    title: "Air Quality Classification",
    status: "In progress",
    category: "Machine Learning",
    description:
      "Classifies air quality levels from pollution and environmental readings using the Kaggle Air Quality & Pollution Assessment dataset.",
    tech: ["Python", "Google Colab", "scikit-learn"],
    github: "https://github.com/sadmanmahmood3",
    live: "",
  },
];

const skills = [
  { group: "Languages", items: ["Python", "Java", "SQL", "JavaScript"] },
  { group: "Web", items: ["HTML", "CSS", "Streamlit", "Netlify"] },
  { group: "ML & Data", items: ["Pandas", "Prophet", "scikit-learn", "Google Colab"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "Windows"] },
];

const typedWords = ["web apps.", "ML projects.", "things people use."];

/* =========================================================
   CODE BELOW — you don't need to change this
   ========================================================= */

// ---- Render skills ----
document.getElementById("skillsGrid").innerHTML = skills
  .map(
    (s) => `
    <div class="skill-card">
      <h4>${s.group}</h4>
      <div class="chips">${s.items.map((i) => `<span class="chip">${i}</span>`).join("")}</div>
    </div>`
  )
  .join("");

// ---- Render projects + filters ----
const grid = document.getElementById("projectsGrid");
const filtersEl = document.getElementById("filters");
const categories = ["All", ...new Set(projects.map((p) => p.category))];

function renderProjects(filter) {
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  grid.innerHTML = list
    .map(
      (p) => `
      <article class="project-card">
        <div class="project-top">
          <span class="folder">📁</span>
          <div class="project-links">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">Code ↗</a>` : ""}
            ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live ↗</a>` : ""}
          </div>
        </div>
        <h4>${p.title}</h4>
        <div class="status ${p.status === "Live" ? "live" : ""}">● ${p.status}</div>
        <p>${p.description}</p>
        <div class="chips">${p.tech.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
      </article>`
    )
    .join("");
}

filtersEl.innerHTML = categories
  .map((c, i) => `<button class="filter-btn ${i === 0 ? "active" : ""}" data-filter="${c}">${c}</button>`)
  .join("");
filtersEl.addEventListener("click", (e) => {
  if (!e.target.matches(".filter-btn")) return;
  filtersEl.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  e.target.classList.add("active");
  renderProjects(e.target.dataset.filter);
});
renderProjects("All");

// ---- Typing effect ----
const typedEl = document.getElementById("typed");
let wordIndex = 0, charIndex = 0, deleting = false;
function type() {
  const word = typedWords[wordIndex];
  typedEl.textContent = word.slice(0, charIndex);
  if (!deleting && charIndex < word.length) charIndex++;
  else if (deleting && charIndex > 0) charIndex--;
  else if (!deleting) { deleting = true; return setTimeout(type, 1400); }
  else { deleting = false; wordIndex = (wordIndex + 1) % typedWords.length; }
  setTimeout(type, deleting ? 45 : 90);
}
type();

// ---- Theme toggle (remembers your choice) ----
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) {}
document.getElementById("themeToggle").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---- Mobile menu ----
const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", () => navLinks.classList.remove("open"));

// ---- Fade-in sections + count-up numbers ----
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll("[data-count]").forEach((el) => {
        const target = +el.dataset.count;
        let n = 0;
        const step = setInterval(() => {
          el.textContent = ++n;
          if (n >= target) clearInterval(step);
        }, 150);
      });
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
