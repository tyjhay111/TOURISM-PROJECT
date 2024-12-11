// 1. Form Validation: Make sure all fields in the Contact Us form are filled before submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
  
        // Simple form validation
        if (!name || !email || !message) {
          alert('Please fill out all fields.');
          event.preventDefault(); // Prevent form submission
        } else {
          alert('Thank you for contacting us!');
        }
      });
    }
  
    // 2. Smooth Scrolling for Anchor Links: Add smooth scrolling for in-page navigation
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // 3. Toggle Navbar on Small Screens (Mobile Responsiveness)
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
      navbarToggler.addEventListener('click', function() {
        const navbarMenu = document.getElementById('navbarNav');
        navbarMenu.classList.toggle('show'); // Toggle the 'show' class for mobile view
      });
    }
    
    // 4. Dynamic Content Example (Highlight Active Region)
    const regionLinks = document.querySelectorAll('.region-link');
    
    regionLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Remove 'active' class from all region links
        regionLinks.forEach(item => item.classList.remove('active'));
        // Add 'active' class to the clicked region link
        this.classList.add('active');
      });
    });
    
  });
  