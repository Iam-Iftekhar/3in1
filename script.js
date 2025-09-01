// Simple script for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation for section titles
const sectionTitles = document.querySelectorAll('main h3');
sectionTitles.forEach(title => {
    title.addEventListener('mouseenter', () => {
        title.classList.add('animate-pulse');
    });
    title.addEventListener('mouseleave', () => {
        title.classList.remove('animate-pulse');
    });
});