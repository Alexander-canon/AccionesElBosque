// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes comunes
    initializeNavbar();
    
    // Inicializar componentes específicos de la página
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
            initializeDashboard();
            break;
        case 'trading.html':
            initializeTrading();
            break;
        case 'portfolio.html':
            initializePortfolio();
            break;
        case 'notifications.html':
            initializeNotifications();
            break;
        case 'admin.html':
            initializeAdmin();
            break;
        case 'login.html':
            initializeLogin();
            break;
        case 'register.html':
            initializeRegister();
            break;
    }
});

// Función para inicializar la barra de navegación
function initializeNavbar() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Función para inicializar el dashboard
function initializeDashboard() {
    // Actualizar datos de mercado
    updateMarketData();
    
    // Actualizar cada 30 segundos
    setInterval(updateMarketData, 30000);
}

// Función para actualizar datos de mercado
async function updateMarketData() {
    try {
        const marketData = await tradingApi.getMarketOverview();
        // Actualizar la UI con los datos del mercado
        updateMarketUI(marketData);
    } catch (error) {
        console.error('Error updating market data:', error);
    }
}

// Función para actualizar la UI con datos de mercado
function updateMarketUI(marketData) {
    // Implementar actualización de la UI
    console.log('Updating market UI with:', marketData);
}

// Exportar funciones necesarias
window.initializeDashboard = initializeDashboard;
window.initializeTrading = initializeTrading;
window.initializePortfolio = initializePortfolio;
window.initializeNotifications = initializeNotifications;
window.initializeAdmin = initializeAdmin;
window.initializeLogin = initializeLogin;
window.initializeRegister = initializeRegister; 