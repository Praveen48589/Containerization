// ===== SECTION FADE-IN =====
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    { threshold: 0.15 }
);

sections.forEach(section => observer.observe(section));


// ===== HERO TYPING EFFECT =====
const textArray = [
    "DevOps & Cloud Engineer",
    "AWS | Docker | Terraform",
    "Linux & Automation Specialist",
    "CI/CD & Cloud Infrastructure"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {
    if (!typingElement) return;

    if (!isDeleting) {
        currentText = textArray[index].substring(0, charIndex++);
    } else {
        currentText = textArray[index].substring(0, charIndex--);
    }

    typingElement.textContent = currentText;

    if (!isDeleting && charIndex === textArray[index].length) {
        setTimeout(() => isDeleting = true, 1200);
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % textArray.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

