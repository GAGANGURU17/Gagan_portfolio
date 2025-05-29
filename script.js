// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Typed.js for typing animation
    const options = {
        strings: ['intelligent systems.', 'machine learning models.', 'data-driven solutions.', 'the future with AI.'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    };
    
    const typed = new Typed('.typed-text', options);
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.querySelectorAll('.bar').forEach(bar => {
            bar.classList.toggle('active');
        });
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            document.querySelectorAll('.bar').forEach(bar => {
                bar.classList.remove('active');
            });
        });
    });
    
    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillSection = document.querySelector('#skills');
    
    const showSkills = function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    };
    
    const skillObserver = new IntersectionObserver(showSkills, {
        threshold: 0.3
    });
    
    if (skillSection) {
        skillObserver.observe(skillSection);
    }
    
    // Update the form submission code in your script.js
    // Form submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Initialize EmailJS with your user ID
        emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS user ID
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message
            };
            
            // Register Service Worker for PWA
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(registration => {
                    console.log('ServiceWorker registration successful');
                  })
                  .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                  });
              });
            }
            
            // Send email using EmailJS
            emailjs.send('service_id', 'template_id', templateParams) // Replace with your service and template IDs
                .then(function() {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = `Thank you ${name}! Your message has been sent successfully.`;
                    
                    contactForm.reset();
                    contactForm.appendChild(successMessage);
                    
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, function(error) {
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Oops! Something went wrong. Please try again later.';
                    
                    contactForm.appendChild(errorMessage);
                    
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Remove error message after 5 seconds
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 5000);
                    
                    console.error('EmailJS error:', error);
                });
        });
    }
});

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Testimonial Slider
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.testimonial-dots');

let currentIndex = 0;

// Create dots
if (testimonialItems.length > 0 && dotsContainer) {
    testimonialItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateSlider() {
    testimonialItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIndex) {
            item.classList.add('active');
        }
    });
    
    // Update dots
    if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
        });
    }
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
    updateSlider();
}

if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Add this to your existing script.js file

// Testimonials Management - Advanced UI
window.onload = function() {
    // Add modal HTML to the page
    const modalHTML = `
        <div id="testimonialModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <form id="testimonialForm" class="testimonial-form">
                    <h3>Add New Testimonial</h3>
                    <div class="form-group">
                        <label for="authorName">Author Name</label>
                        <input type="text" id="authorName" placeholder="Author Name" required>
                    </div>
                    <div class="form-group">
                        <label for="authorPosition">Position & Company</label>
                        <input type="text" id="authorPosition" placeholder="Position & Company" required>
                    </div>
                    <div class="form-group">
                        <label for="authorAvatar">Avatar URL</label>
                        <input type="text" id="authorAvatar" placeholder="Avatar URL (optional)">
                    </div>
                    
                    <!-- Star Rating -->
                    <div class="rating-select">
                        <input type="radio" id="star5" name="rating" value="5">
                        <label for="star5" class="fas fa-star"></label>
                        <input type="radio" id="star4" name="rating" value="4">
                        <label for="star4" class="fas fa-star"></label>
                        <input type="radio" id="star3" name="rating" value="3" checked>
                        <label for="star3" class="fas fa-star"></label>
                        <input type="radio" id="star2" name="rating" value="2">
                        <label for="star2" class="fas fa-star"></label>
                        <input type="radio" id="star1" name="rating" value="1">
                        <label for="star1" class="fas fa-star"></label>
                    </div>
                    
                    <!-- Category Selection -->
                    <div class="category-select">
                        <button type="button" class="category-option selected" data-category="work">Work</button>
                        <button type="button" class="category-option" data-category="academic">Academic</button>
                        <button type="button" class="category-option" data-category="project">Project</button>
                    </div>
                    
                    <div class="form-group">
                        <label for="testimonialText">Testimonial Text</label>
                        <textarea id="testimonialText" placeholder="Testimonial Text" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="testimonialTags">Tags (comma separated)</label>
                        <input type="text" id="testimonialTags" placeholder="e.g. Machine Learning, Data Science">
                    </div>
                    
                    <button type="submit" class="submit-btn">Add Testimonial</button>
                </form>
            </div>
        </div>
    `;
    
    // Append modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal elements
    const modal = document.getElementById('testimonialModal');
    const addBtn = document.getElementById('addTestimonialBtn');
    const closeBtn = document.querySelector('.close-modal');
    const testimonialForm = document.getElementById('testimonialForm');
    const testimonialGrid = document.querySelector('.testimonial-grid');
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselDots = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // View toggle functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    const views = document.querySelectorAll('.view');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected view
            views.forEach(view => {
                view.classList.remove('active');
                if (view.classList.contains('testimonial-' + viewType)) {
                    view.classList.add('active');
                }
            });
            
            // Initialize carousel if carousel view is selected
            if (viewType === 'carousel') {
                initCarousel();
            }
        });
    });
    
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter testimonials
            testimonialCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Reinitialize carousel if in carousel view
            if (document.querySelector('.testimonial-carousel').classList.contains('active')) {
                setTimeout(initCarousel, 350);
            }
        });
    });
    
    // Category selection in form
    const categoryOptions = document.querySelectorAll('.category-option');
    let selectedCategory = 'work';
    
    categoryOptions.forEach(option => {
        option.addEventListener('click', function() {
            categoryOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            selectedCategory = this.getAttribute('data-category');
        });
    });
    
    // Load testimonials from localStorage
    loadTestimonials();
    
    // Initialize carousel
    function initCarousel() {
        if (!carouselTrack) return;
        
        // Clear existing carousel content
        carouselTrack.innerHTML = '';
        if (carouselDots) carouselDots.innerHTML = '';
        
        // Get visible testimonials based on current filter
        const visibleTestimonials = Array.from(testimonialCards).filter(card => 
            card.style.display !== 'none'
        );
        
        // Clone testimonials for carousel
        visibleTestimonials.forEach((card, index) => {
            const clone = card.cloneNode(true);
            clone.style.display = 'flex';
            clone.style.opacity = '1';
            clone.style.transform = 'scale(1)';
            carouselTrack.appendChild(clone);
            
            // Create dot
            if (carouselDots) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                carouselDots.appendChild(dot);
            }
        });
        
        // Set initial position
        currentSlide = 0;
        updateCarousel();
    }
    
    // Carousel navigation
    let currentSlide = 0;
    
    function updateCarousel() {
        if (!carouselTrack) return;
        
        const slides = carouselTrack.querySelectorAll('.testimonial-card');
        if (slides.length === 0) return;
        
        // Update track position
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        if (carouselDots) {
            const dots = carouselDots.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }
    
    function goToSlide(index) {
        const slides = carouselTrack ? carouselTrack.querySelectorAll('.testimonial-card') : [];
        if (slides.length === 0) return;
        
        currentSlide = index;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        if (currentSlide >= slides.length) currentSlide = 0;
        
        updateCarousel();
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
    
    // Auto slide
    let slideInterval = setInterval(() => {
        if (document.querySelector('.testimonial-carousel').classList.contains('active')) {
            goToSlide(currentSlide + 1);
        }
    }, 5000);
    
    // Pause auto slide on hover
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialCarousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                if (document.querySelector('.testimonial-carousel').classList.contains('active')) {
                    goToSlide(currentSlide + 1);
                }
            }, 5000);
        });
    }
    
    // Open modal when add button is clicked
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            modal.classList.add('active');
        });
    }
    
    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Handle form submission
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('authorName').value;
            const position = document.getElementById('authorPosition').value;
            const avatar = document.getElementById('authorAvatar').value || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;
            const text = document.getElementById('testimonialText').value;
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const tags = document.getElementById('testimonialTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
            
            // Create new testimonial object
            const testimonial = {
                id: Date.now(),
                name,
                position,
                avatar,
                text,
                rating,
                category: selectedCategory,
                tags
            };
            
            // Save to localStorage
            saveTestimonial(testimonial);
            
            // Add to page
            addTestimonialToPage(testimonial);
            
            // Reset form and close modal
            testimonialForm.reset();
            document.querySelector('.category-option[data-category="work"]').classList.add('selected');
            selectedCategory = 'work';
            modal.classList.remove('active');
            
            // Reinitialize carousel if in carousel view
            if (document.querySelector('.testimonial-carousel').classList.contains('active')) {
                setTimeout(initCarousel, 350);
            }
        });
    }
    
    // Add event delegation for edit/delete buttons
    if (testimonialGrid) {
        testimonialGrid.addEventListener('click', function(e) {
            // Check if edit button was clicked
            if (e.target.classList.contains('edit-testimonial') || e.target.parentElement.classList.contains('edit-testimonial')) {
                const card = e.target.closest('.testimonial-card');
                const id = card.getAttribute('data-testimonial-id');
                editTestimonial(id);
            }
            
            // Check if delete button was clicked
            if (e.target.classList.contains('delete-testimonial') || e.target.parentElement.classList.contains('delete-testimonial')) {
                const card = e.target.closest('.testimonial-card');
                const id = card.getAttribute('data-testimonial-id');
                deleteTestimonial(id);
            }
        });
    }
    
    // Function to save testimonial to localStorage
    function saveTestimonial(testimonial) {
        let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials.push(testimonial);
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }
    
    // Function to load testimonials from localStorage
    function loadTestimonials() {
        if (!testimonialGrid) return;
        
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        
        // If there are stored testimonials, clear the default ones
        if (testimonials.length > 0) {
            testimonialGrid.innerHTML = '';
            testimonials.forEach(testimonial => {
                addTestimonialToPage(testimonial);
            });
        } else {
            // Add edit/delete buttons to default testimonials
            document.querySelectorAll('.testimonial-card').forEach(card => {
                addAdminControls(card);
            });
        }
        
        // Initialize carousel
        if (document.querySelector('.testimonial-carousel').classList.contains('active')) {
            initCarousel();
        }
    }
    
    // Function to add testimonial to page
    function addTestimonialToPage(testimonial) {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.setAttribute('data-testimonial-id', testimonial.id);
        testimonialCard.setAttribute('data-category', testimonial.category || 'work');
        testimonialCard.setAttribute('data-aos', 'fade-up');
        
        // Create rating stars
        let ratingStars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= testimonial.rating) {
                ratingStars += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= testimonial.rating) {
                ratingStars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                ratingStars += '<i class="far fa-star"></i>';
            }
        }
        
        // Create tags
        let tagsHTML = '';
        if (testimonial.tags && testimonial.tags.length > 0) {
            testimonial.tags.forEach(tag => {
                tagsHTML += `<span class="tag">${tag}</span>`;
            });
        }
        
        testimonialCard.innerHTML = `
            <div class="testimonial-quote"><i class="fas fa-quote-left"></i></div>
            <div class="testimonial-content">
                <p>"${testimonial.text}"</p>
            </div>
            <div class="testimonial-rating">
                ${ratingStars}
            </div>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}">
                </div>
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.position}</p>
                </div>
            </div>
            <div class="testimonial-tags">
                ${tagsHTML}
            </div>
        `;
        
        // Add admin controls
        addAdminControls(testimonialCard);
        
        // Add to grid
        testimonialGrid.appendChild(testimonialCard);
    }
    
    // Function to add admin controls to testimonial card
    function addAdminControls(card) {
        const controls = document.createElement('div');
        controls.className = 'testimonial-admin-controls';
        controls.innerHTML = `
            <button class="edit-testimonial" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="delete-testimonial" title="Delete"><i class="fas fa-trash"></i></button>
        `;
        card.appendChild(controls);
    }
    
    // Function to edit testimonial
    function editTestimonial(id) {
        const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        const testimonial = testimonials.find(t => t.id == id) || {};
        
        // Populate form with testimonial data
        if (document.getElementById('authorName')) {
            document.getElementById('authorName').value = testimonial.name || '';
        }
        if (document.getElementById('authorPosition')) {
            document.getElementById('authorPosition').value = testimonial.position || '';
        }
        if (document.getElementById('authorAvatar')) {
            document.getElementById('authorAvatar').value = testimonial.avatar || '';
        }
        if (document.getElementById('testimonialText')) {
            document.getElementById('testimonialText').value = testimonial.text || '';
        }
        if (document.getElementById('testimonialTags')) {
            document.getElementById('testimonialTags').value = testimonial.tags ? testimonial.tags.join(', ') : '';
        }
        
        // Set rating
        const rating = testimonial.rating || 3;
        document.querySelector(`input[name="rating"][value="${rating}"]`).checked = true;
        
        // Set category
        categoryOptions.forEach(option => {
            option.classList.toggle('selected', option.getAttribute('data-category') === (testimonial.category || 'work'));
        });
        selectedCategory = testimonial.category || 'work';
        
        // Change form submit button text
        const submitBtn = testimonialForm.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.textContent = 'Update Testimonial';
        }
        
        // Add data-edit-id to form
        testimonialForm.setAttribute('data-edit-id', id);
        
        // Open modal
        modal.classList.add('active');
        
        // Update form submission handler
        const oldSubmitHandler = testimonialForm.onsubmit;
        testimonialForm.onsubmit = function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('authorName').value;
            const position = document.getElementById('authorPosition').value;
            const avatar = document.getElementById('authorAvatar').value || testimonial.avatar;
            const text = document.getElementById('testimonialText').value;
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const tags = document.getElementById('testimonialTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
            
            // Update testimonial in localStorage
            const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
            const index = testimonials.findIndex(t => t.id == id);
            
            if (index !== -1) {
                testimonials[index] = {
                    ...testimonials[index],
                    name,
                    position,
                    avatar,
                    text,
                    rating,
                    category: selectedCategory,
                    tags
                };
                localStorage.setItem('testimonials', JSON.stringify(testimonials));
                
                // Update on page
                const card = document.querySelector(`.testimonial-card[data-testimonial-id="${id}"]`);
                if (card) {
                    card.setAttribute('data-category', selectedCategory);
                    
                    // Create rating stars
                    let ratingStars = '';
                    for (let i = 1; i <= 5; i++) {
                        if (i <= rating) {
                            ratingStars += '<i class="fas fa-star"></i>';
                        } else if (i - 0.5 <= rating) {
                            ratingStars += '<i class="fas fa-star-half-alt"></i>';
                        } else {
                            ratingStars += '<i class="far fa-star"></i>';
                        }
                    }
                    
                    // Create tags
                    let tagsHTML = '';
                    if (tags && tags.length > 0) {
                        tags.forEach(tag => {
                            tagsHTML += `<span class="tag">${tag}</span>`;
                        });
                    }
                    
                    card.querySelector('.testimonial-content p').textContent = `"${text}"`;
                    card.querySelector('.testimonial-rating').innerHTML = ratingStars;
                    card.querySelector('.author-info h4').textContent = name;
                    card.querySelector('.author-info p').textContent = position;
                    card.querySelector('.author-avatar img').src = avatar;
                    card.querySelector('.author-avatar img').alt = name;
                    card.querySelector('.testimonial-tags').innerHTML = tagsHTML;
                }
            }
            
            // Reset form and close modal
            testimonialForm.reset();
            document.querySelector('.category-option[data-category="work"]').classList.add('selected');
            selectedCategory = 'work';
            modal.classList.remove('active');
            
            // Reset form submit handler and button text
            testimonialForm.onsubmit = oldSubmitHandler;
            if (submitBtn) {
                submitBtn.textContent = 'Add Testimonial';
            }
            testimonialForm.removeAttribute('data-edit-id');
            
            // Reinitialize carousel if in carousel view
            if (document.querySelector('.testimonial-carousel').classList.contains('active')) {
                setTimeout(initCarousel, 350);
            }
        };
    }
    
    // Function to delete testimonial
    function deleteTestimonial(id) {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            // Remove from localStorage
            let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
            testimonials = testimonials.filter(t => t.id != id);
            localStorage.setItem('testimonials', JSON.stringify(testimonials));
            
            // Remove from page
            const card = document.querySelector(`.testimonial-card[data-testimonial-id="${id}"]`);
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.remove();
                    
                    // Reinitialize carousel if in carousel view
                    if (document.querySelector('.testimonial-carousel').classList.contains('active')) {
                        setTimeout(initCarousel, 350);
                    }
                }, 300);
            }
        }
    }
};