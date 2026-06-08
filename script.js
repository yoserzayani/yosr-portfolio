// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Reveal on scroll
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// 3D tilt interaction
const tiltItems = document.querySelectorAll(".portrait-card, .project-card, .skill-card");

tiltItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const box = item.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    const rotateX = ((y / box.height) - 0.5) * -9;
    const rotateY = ((x / box.width) - 0.5) * 9;

    item.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});




// Project detail modal
const projectData = {
  biat: {
    category: "Banking • Microservices • System Design",
    title: "Open Banking Platform — BIAT",
    image: "assets/projects/architecture-clean.png",
    imageAlt: "Physical architecture diagram of the BIAT microservices platform",
    intro: "A secure banking web platform designed around microservices, API management and modern DevOps practices.",
    context: "The project modernizes the customer onboarding and banking request process. It includes account opening, credit requests, card requests, appointments, notifications and document-related flows.",
    contribution: [
      "Designed and implemented Spring Boot microservices connected to an Angular frontend.",
      "Integrated WSO2 API Manager and an API Gateway to centralize access to backend services.",
      "Worked on security with JWT, REST API routing, service discovery and configuration management.",
      "Added advanced features such as OCR, electronic signature, email notifications and document handling.",
      "Prepared the project for deployment using Docker, Jenkins, SonarQube and Nexus."
    ],
    tags: ["Spring Boot", "Angular", "WSO2", "API Gateway", "Eureka", "Docker", "Jenkins", "MySQL"],
    result: "The architecture demonstrates my ability to work beyond simple CRUD: API management, microservices communication, security, monitoring and deployment are all part of the solution."
  },
  wso2: {
    category: "API Management • Publishing • Security",
    title: "WSO2 API Manager Integration",
    image: "assets/projects/wso2-clean.png",
    imageAlt: "WSO2 API Manager publisher showing banking APIs",
    intro: "A centralized API management layer used to publish, secure and organize banking APIs.",
    context: "The banking platform exposes several APIs such as customer, card, credit, account opening and appointment services. These APIs need to be managed in a consistent and secure way.",
    contribution: [
      "Published APIs in WSO2 API Manager Publisher.",
      "Organized API contexts and versions for backend services.",
      "Connected WSO2 with backend services through the gateway layer.",
      "Worked with API lifecycle concepts such as published and pre-released states.",
      "Handled security and access concerns around API consumption."
    ],
    tags: ["WSO2 API Manager", "REST APIs", "OAuth2", "API Gateway", "Microservices"],
    result: "This part highlights my understanding of enterprise API exposure, governance and security."
  },
  pipeline: {
    category: "DevOps • CI/CD • Automation",
    title: "Jenkins CI/CD Pipeline",
    image: "assets/projects/pipeline-clean.png",
    imageAlt: "Jenkins pipeline stages showing CI/CD build",
    intro: "A CI/CD pipeline that automates build, test, quality analysis, Docker packaging and deployment steps.",
    context: "For a microservices project, manual deployment can quickly become slow and risky. The goal was to automate repetitive delivery steps and reduce deployment errors.",
    contribution: [
      "Configured Jenkins pipeline stages for checkout, backend and frontend build.",
      "Integrated Docker image creation and Docker Compose execution.",
      "Added testing and coverage steps with JaCoCo.",
      "Added SonarQube analysis for code quality checks.",
      "Prepared deployment steps with Nexus and post-build actions."
    ],
    tags: ["Jenkins", "Docker", "Docker Compose", "JaCoCo", "SonarQube", "Nexus", "JUnit"],
    result: "The pipeline demonstrates practical DevOps skills and the ability to prepare a project for professional delivery."
  },
  moutouri: {
    category: "Marketplace • Full Stack Web Application",
    title: "Moutouri Marketplace",
    image: "assets/projects/moutouri-marketplace-cover.jpg",
    imageAlt: "Moutouri motorcycle marketplace interface",
    intro: "A marketplace platform for used motorcycles and motorcycle parts, with shop accounts and product publication features.",
    context: "The platform helps motorcycle shops and sellers publish products, manage listings and make their offers visible to users through a clean marketplace interface.",
    contribution: [
      "Built frontend interfaces with React.js.",
      "Developed backend APIs with Node.js and Express.js.",
      "Structured MongoDB collections for users, shops, products and listings.",
      "Integrated role-based features for shop owners and users.",
      "Worked on product listing, search, categories and publication flow."
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Marketplace"],
    result: "This project shows my ability to build a real full stack product with business logic, roles and user-facing features."
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

function openProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  modalImage.src = project.image;
  modalImage.alt = project.imageAlt;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalIntro.textContent = project.intro;
  modalContext.textContent = project.context;
  modalResult.textContent = project.result;

  modalContribution.innerHTML = "";
  project.contribution.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalContribution.appendChild(li);
  });

  modalTags.innerHTML = "";
  project.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    modalTags.appendChild(span);
  });

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-lock");
}

function closeProjectModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-lock");
}

document.querySelectorAll(".clickable-project").forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card.dataset.project));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeProjectModal();
  }
});
