// Select all buttons on the page
const buttons = document.querySelectorAll('button');

// Add hover animations
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = 'none';
    });
});
