const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();

// Lightweight 3D tilt: visual only, disabled for touch / reduced motion.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;
if (!reduceMotion && finePointer) {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const r = card.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1200px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-3px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

// Ambient canvas particles. Kept subtle so the portfolio still reads as professional.
const canvas = document.getElementById("spaceCanvas");
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  let points = [];
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    points = Array.from({ length: Math.min(75, Math.floor(innerWidth / 18)) }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.2 + .25,
      vx: (Math.random() - .5) * .08,
      vy: (Math.random() - .5) * .08,
      a: Math.random() * .35 + .08
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    points.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = innerWidth; if (p.x > innerWidth) p.x = 0;
      if (p.y < 0) p.y = innerHeight; if (p.y > innerHeight) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(164, 200, 225, ${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  resize(); draw();
  addEventListener("resize", resize, { passive: true });
}

const projectData = {
  almalaki: {
    category: "Real Client • Full Stack Commerce Platform",
    title: "AlMalaki Fresh",
    image: "assets/projects/almalaki-mobile-admin.png",
    imageAlt: "AlMalaki Fresh mobile application and administration dashboard",
    intro: "A multilingual commerce platform for a Qatar-based client, combining a Node.js backend, React administration dashboard and an existing React Native / Expo mobile application.",
    context: "The backend follows a monolithic architecture organized around business modules such as authentication, catalogue, customers, orders, payments and delivery. My main ownership was backend development and the web administration dashboard. The mobile application was an existing codebase where I made targeted integration and iOS-related adjustments.",
    contribution: [
      "Designed and developed REST APIs with Node.js, Express, Prisma and PostgreSQL.",
      "Built the React administration dashboard for catalogue, customers, orders, payments and delivery settings.",
      "Integrated Tap Payments and worked through real payment-flow constraints including 3-D Secure, status handling and keeping order/payment states consistent.",
      "Added reliability logic around ordering and payment processing, including idempotency-oriented handling for repeated requests.",
      "Contributed targeted API integration and UI/behavior adjustments to the React Native / Expo mobile application, particularly for iOS-related differences.",
      "Containerized the development environment with Docker."
    ],
    tags: ["Node.js", "Express.js", "React", "React Native", "Expo", "Prisma", "PostgreSQL", "Tap Payments", "Docker", "REST APIs"],
    result: "This project is my strongest proof of full-stack delivery in a real client context: backend ownership, an operational admin interface, third-party payment integration and adaptation to an existing mobile codebase."
  },
  moutouri: {
    category: "Freelance • Full Stack Marketplace",
    title: "Moutouri",
    image: "assets/projects/moutouri-marketplace-cover.jpg",
    imageAlt: "Moutouri motorcycle marketplace interface",
    intro: "A marketplace platform for motorcycles and spare parts, designed for sellers, shops and end users.",
    context: "The product required public listings as well as role-based workflows for registered users and shop owners. The project gave me early hands-on experience owning both frontend and backend concerns in a complete web product.",
    contribution: [
      "Built React.js interfaces for marketplace browsing and management dashboards.",
      "Developed Node.js / Express REST APIs.",
      "Implemented JWT-based authentication and role-aware access.",
      "Structured MongoDB data for users, shops, products and listings.",
      "Implemented shop registration, product publishing, categories and listing workflows."
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs"],
    result: "Moutouri was one of my first full-stack experiences and helped me learn how product flows, authentication, data modeling and UI behavior connect across a real application."
  },
  biat: {
    category: "Final-Year Engineering Project • Banking Microservices",
    title: "BIAT-IT Banking Platform",
    image: "assets/projects/architecture-clean.png",
    imageAlt: "BIAT microservices architecture",
    intro: "My final-year engineering project focused on modernizing a banking customer onboarding platform using Spring Boot microservices, Angular and WSO2 API Manager.",
    context: "The architecture separated banking capabilities into services for onboarding and related banking workflows. Angular consumed secured APIs through WSO2 API Manager and Spring Cloud Gateway, with Eureka and Config Server supporting the distributed architecture.",
    contribution: [
      "Designed and implemented Spring Boot services for banking workflows and integrated them with Angular interfaces.",
      "Worked with WSO2 API Manager to publish and manage APIs in a centralized API layer.",
      "Used Spring Cloud Gateway, Eureka and Config Server for routing, discovery and centralized configuration.",
      "Worked with JWT / OAuth2 concepts, REST API integration and banking-specific business flows.",
      "Participated in delivery automation with Docker, Jenkins, SonarQube and Nexus.",
      "Worked on asynchronous notification flows and supporting service integrations."
    ],
    tags: ["Java", "Spring Boot", "Angular", "WSO2 API Manager", "Spring Cloud Gateway", "Eureka", "MySQL", "Docker", "Jenkins"],
    result: "The PFE gave me enterprise-scale exposure to microservices, API management and deployment tooling while strengthening my Java / Spring Boot and Angular foundation."
  }
};

const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalIntro = document.getElementById("modalIntro");
const modalContext = document.getElementById("modalContext");
const modalContribution = document.getElementById("modalContribution");
const modalTags = document.getElementById("modalTags");
const modalResult = document.getElementById("modalResult");

function openProjectModal(key) {
  const project = projectData[key];
  if (!project || !modal) return;
  modalImage.src = project.image;
  modalImage.alt = project.imageAlt;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalIntro.textContent = project.intro;
  modalContext.textContent = project.context;
  modalResult.textContent = project.result;
  modalContribution.innerHTML = "";
  project.contribution.forEach((line) => {
    const li = document.createElement("li"); li.textContent = line; modalContribution.appendChild(li);
  });
  modalTags.innerHTML = "";
  project.tags.forEach((tag) => {
    const span = document.createElement("span"); span.textContent = tag; modalTags.appendChild(span);
  });
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-lock");
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-lock");
}

document.querySelectorAll("[data-project]").forEach((el) => {
  el.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    openProjectModal(el.dataset.project);
  });
});
document.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeProjectModal));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeProjectModal(); });

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");
const syncThemeIcon = () => {
  if (!themeToggle) return;
  themeToggle.textContent = document.body.classList.contains("light-theme") ? "☾" : "☀";
};
syncThemeIcon();
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    syncThemeIcon();
  });
}
