// This script adds structured data to improve SEO
document.addEventListener('DOMContentLoaded', function() {
  // Load structured data
  fetch('/structured-data.json')
    .then(response => response.json())
    .then(data => {
      // Create script element for structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      
      // Append to head
      document.head.appendChild(script);
    })
    .catch(error => console.error('Error loading structured data:', error));
});
