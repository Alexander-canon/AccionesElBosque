export function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Handle mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span class="material-icons">menu</span>';
    navbar.appendChild(mobileMenuBtn);

    const navLinks = navbar.querySelector('.nav-links');
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Handle active link highlighting
    const currentPath = window.location.pathname;
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // Handle user menu
    const userMenu = navbar.querySelector('.user-menu');
    if (userMenu) {
        const loginBtn = userMenu.querySelector('.login-btn');
        const registerBtn = userMenu.querySelector('.register-btn');

        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('userToken');
        if (isLoggedIn) {
            loginBtn.textContent = 'Mi Cuenta';
            loginBtn.href = 'profile.html';
            registerBtn.style.display = 'none';
        }
    }
} 