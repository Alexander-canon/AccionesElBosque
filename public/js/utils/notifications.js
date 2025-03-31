// Notifications Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tabs
    const tabs = document.querySelectorAll('.tab-btn');
    const notificationsList = document.querySelector('.notifications-list');

    // Sample notifications data (in a real app, this would come from an API)
    const notifications = {
        all: [
            {
                type: 'trading',
                title: 'Orden Ejecutada: AAPL',
                time: 'Hace 5 minutos',
                message: 'Tu orden de compra de 10 acciones de AAPL se ha ejecutado exitosamente a $150.25.',
                unread: true
            },
            {
                type: 'alert',
                title: 'Alerta de Precio: GOOGL',
                time: 'Hace 1 hora',
                message: 'GOOGL ha alcanzado tu precio objetivo de $2,750.00.',
                unread: false
            },
            {
                type: 'system',
                title: 'Actualización del Sistema',
                time: 'Hace 2 horas',
                message: 'Nueva actualización disponible con mejoras en el rendimiento y nuevas funcionalidades.',
                unread: true
            }
        ],
        trading: [],
        alerts: [],
        system: []
    };

    // Filter notifications by type
    notifications.trading = notifications.all.filter(n => n.type === 'trading');
    notifications.alerts = notifications.all.filter(n => n.type === 'alert');
    notifications.system = notifications.all.filter(n => n.type === 'system');

    // Tab click handler
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Update notifications list
            const type = tab.dataset.tab;
            renderNotifications(type);
        });
    });

    // Render notifications
    function renderNotifications(type) {
        notificationsList.innerHTML = '';
        notifications[type].forEach(notification => {
            const notificationElement = createNotificationElement(notification);
            notificationsList.appendChild(notificationElement);
        });
    }

    // Create notification element
    function createNotificationElement(notification) {
        const div = document.createElement('div');
        div.className = `notification-item${notification.unread ? ' unread' : ''}`;
        
        let iconName;
        switch(notification.type) {
            case 'trading':
                iconName = 'trending_up';
                break;
            case 'alert':
                iconName = 'notifications_active';
                break;
            case 'system':
                iconName = 'system_update';
                break;
        }

        div.innerHTML = `
            <span class="material-icons notification-icon ${notification.type}">${iconName}</span>
            <div class="notification-content">
                <div class="notification-header">
                    <h3>${notification.title}</h3>
                    <span class="notification-time">${notification.time}</span>
                </div>
                <p>${notification.message}</p>
            </div>
        `;

        return div;
    }

    // Mark all as read button handler
    const markReadBtn = document.querySelector('.btn-mark-read');
    markReadBtn.addEventListener('click', () => {
        const unreadNotifications = document.querySelectorAll('.notification-item.unread');
        unreadNotifications.forEach(notification => {
            notification.classList.remove('unread');
        });
        
        // Update notifications data
        notifications.all.forEach(notification => notification.unread = false);
        notifications.trading.forEach(notification => notification.unread = false);
        notifications.alerts.forEach(notification => notification.unread = false);
        notifications.system.forEach(notification => notification.unread = false);
    });

    // Filter button handler (to be implemented with a modal or dropdown)
    const filterBtn = document.querySelector('.btn-filter');
    filterBtn.addEventListener('click', () => {
        // TODO: Implement filter functionality
        console.log('Filter button clicked');
    });

    // Initial render
    renderNotifications('all');
}); 