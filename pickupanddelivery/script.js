document.addEventListener('DOMContentLoaded', function() {
    // Load SVG definitions
    fetch('images.svg')
        .then(response => response.text())
        .then(svgContent => {
            document.querySelector('.svg-container').innerHTML = svgContent;
        })
        .catch(error => {
            console.error('Error loading SVG definitions:', error);
        });
    
    // Load decorative SVGs
    fetch('decorative.svg')
        .then(response => response.text())
        .then(svgContent => {
            // Append to the svg-container
            document.querySelector('.svg-container').innerHTML += svgContent;
        })
        .catch(error => {
            console.error('Error loading decorative SVGs:', error);
        });
    
    // Load hero background SVG
    fetch('hero-bg.svg')
        .then(response => response.text())
        .then(svgContent => {
            document.querySelector('.hero-bg').innerHTML = svgContent;
        })
        .catch(error => {
            console.error('Error loading hero background:', error);
        });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const details = document.getElementById('details').value;
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            alert(`Thank you for your quote request, ${name}! We will contact you shortly to discuss your ${service} needs.`);
            quoteForm.reset();
        });
    }
    
    // Mobile menu toggle (if needed for smaller screens)
    // This would require adding a hamburger menu button in the HTML
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Chat widget
    const chatWidget = document.querySelector('.chat-widget');
    const chatHeader = document.querySelector('.chat-header');
    const chatMessages = document.querySelector('.chat-messages');
    const questionButtons = document.querySelectorAll('.question-btn');
    const customQuestionBtn = document.querySelector('.custom-question');
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    
    // Predefined answers
    const answers = {
        "What areas do you service?": "We currently service Cape Coral, Florida and surrounding areas including Fort Myers, Sanibel Island, Pine Island, and North Fort Myers within a 30-mile radius.",
        
        "How much do you charge?": "Our rates depend on the service, distance, and item size. Please use our quote form for a precise estimate for your specific needs.",
        
        "How far in advance should I book?": "We recommend booking at least 48 hours in advance for standard deliveries. For larger items or busy periods, 3-5 days notice is preferred.",
        
        "Do you offer same-day service?": "Yes, we do offer same-day service for an additional fee, subject to availability. Please call us directly at 239-555-1234 for same-day requests.",
        
        "What's the largest item you can transport?": "We can transport most residential furniture and appliances. Our largest truck can accommodate items up to 8 feet tall, 9 feet long, and 4 feet wide."
    };
    
    // Toggle chat widget
    chatHeader.addEventListener('click', function() {
        chatWidget.classList.toggle('open');
    });
    
    // Handle question button clicks
    questionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.dataset.question;
            
            // Skip for custom question button
            if (this.classList.contains('custom-question')) {
                addMessage("For custom questions, please call us at 239-555-1234 or use our contact form above.", 'agent');
                
                // Scroll to contact section after a delay
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        window.scrollTo({
                            top: contactSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        chatWidget.classList.remove('open');
                    }
                }, 2000);
                return;
            }
            
            // Add user question to chat
            addMessage(question, 'user');
            
            // Add agent response after a short delay
            setTimeout(() => {
                addMessage(answers[question], 'agent');
                
                // Scroll to the bottom of chat messages
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 800);
        });
    });
    
    // Function to add a message to the chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const messagePara = document.createElement('p');
        messagePara.textContent = text;
        
        messageDiv.appendChild(messagePara);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Auto-open chat after 5 seconds if it hasn't been shown before
    setTimeout(() => {
        if (!sessionStorage.getItem('chatShown')) {
            chatWidget.classList.add('open');
            sessionStorage.setItem('chatShown', 'true');
        }
    }, 5000);
    
    // Dark Mode Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme !== 'dark') {
            newTheme = 'dark';
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update SVG colors if needed
        updateSvgColors(newTheme);
    });
    
    // Function to update SVG colors if needed
    function updateSvgColors(theme) {
        // This function can be expanded to modify SVG elements if needed
        // For example, you might want to change some colors in the hero-bg.svg
        // when in dark mode
    }
}); 