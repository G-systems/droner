// Universal banner scroll function
function scrollToNextSection(event) {
  if (event) {
    event.preventDefault();
  }
  
  const bannerSection = document.querySelector('.top-image-section');
  if (!bannerSection) return;
  
  const nextSection = bannerSection.nextElementSibling;
  if (nextSection) {
    // Calculate offset for fixed navbar
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    const elementPosition = nextSection.offsetTop - navbarHeight - 20; // 20px extra margin
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add click event listener to learn more buttons
  const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
  learnMoreButtons.forEach(button => {
    if (!button.onclick) { // Only add if no onclick already exists
      button.addEventListener('click', scrollToNextSection);
    }
  });
});
