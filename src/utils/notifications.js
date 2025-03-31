// Import constants
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from './constants';

// Notification types
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

// Notification positions
export const NOTIFICATION_POSITIONS = {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
    TOP_CENTER: 'top-center',
    BOTTOM_CENTER: 'bottom-center'
};

// Default notification options
const DEFAULT_OPTIONS = {
    position: NOTIFICATION_POSITIONS.TOP_RIGHT,
    duration: 5000,
    dismissible: true,
    showProgress: true,
    pauseOnHover: true,
    closeOnClick: true,
    maxNotifications: 5
};

// Notification class
class Notification {
    constructor(message, type = NOTIFICATION_TYPES.INFO, options = {}) {
        this.id = Date.now().toString();
        this.message = message;
        this.type = type;
        this.options = { ...DEFAULT_OPTIONS, ...options };
        this.element = null;
        this.progressBar = null;
        this.timeout = null;
    }

    // Create notification element
    createElement() {
        const notification = document.createElement('div');
        notification.className = `notification notification-${this.type}`;
        notification.setAttribute('data-id', this.id);

        const content = document.createElement('div');
        content.className = 'notification-content';

        const message = document.createElement('div');
        message.className = 'notification-message';
        message.textContent = this.message;

        content.appendChild(message);

        if (this.options.dismissible) {
            const closeButton = document.createElement('button');
            closeButton.className = 'notification-close';
            closeButton.innerHTML = '&times;';
            closeButton.onclick = () => this.dismiss();
            content.appendChild(closeButton);
        }

        notification.appendChild(content);

        if (this.options.showProgress) {
            const progress = document.createElement('div');
            progress.className = 'notification-progress';
            notification.appendChild(progress);
        }

        return notification;
    }

    // Show notification
    show() {
        this.element = this.createElement();
        const container = this.getContainer();
        container.appendChild(this.element);

        if (this.options.showProgress) {
            this.startProgress();
        }

        if (this.options.duration > 0) {
            this.timeout = setTimeout(() => this.dismiss(), this.options.duration);
        }

        if (this.options.pauseOnHover) {
            this.element.addEventListener('mouseenter', () => this.pause());
            this.element.addEventListener('mouseleave', () => this.resume());
        }

        if (this.options.closeOnClick) {
            this.element.addEventListener('click', () => this.dismiss());
        }
    }

    // Dismiss notification
    dismiss() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        if (this.element) {
            this.element.classList.add('notification-dismiss');
            setTimeout(() => {
                this.element.remove();
            }, 300);
        }
    }

    // Pause notification
    pause() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.progressBar) {
            this.progressBar.style.animationPlayState = 'paused';
        }
    }

    // Resume notification
    resume() {
        if (this.options.duration > 0) {
            this.timeout = setTimeout(() => this.dismiss(), this.options.duration);
        }
        if (this.progressBar) {
            this.progressBar.style.animationPlayState = 'running';
        }
    }

    // Start progress bar
    startProgress() {
        this.progressBar = this.element.querySelector('.notification-progress');
        this.progressBar.style.animation = `progress ${this.options.duration}ms linear`;
    }

    // Get container element
    getContainer() {
        let container = document.querySelector(`.notification-container-${this.options.position}`);
        if (!container) {
            container = document.createElement('div');
            container.className = `notification-container notification-container-${this.options.position}`;
            document.body.appendChild(container);
        }
        return container;
    }
}

// Notification manager class
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.options = { ...DEFAULT_OPTIONS };
    }

    // Set default options
    setOptions(options) {
        this.options = { ...this.options, ...options };
    }

    // Show success notification
    success(message, options = {}) {
        this.show(message, NOTIFICATION_TYPES.SUCCESS, options);
    }

    // Show error notification
    error(message, options = {}) {
        this.show(message, NOTIFICATION_TYPES.ERROR, options);
    }

    // Show warning notification
    warning(message, options = {}) {
        this.show(message, NOTIFICATION_TYPES.WARNING, options);
    }

    // Show info notification
    info(message, options = {}) {
        this.show(message, NOTIFICATION_TYPES.INFO, options);
    }

    // Show notification
    show(message, type = NOTIFICATION_TYPES.INFO, options = {}) {
        const notification = new Notification(message, type, { ...this.options, ...options });
        this.notifications.push(notification);

        // Remove oldest notification if max notifications reached
        if (this.notifications.length > this.options.maxNotifications) {
            const oldestNotification = this.notifications.shift();
            oldestNotification.dismiss();
        }

        notification.show();
    }

    // Dismiss all notifications
    dismissAll() {
        this.notifications.forEach(notification => notification.dismiss());
        this.notifications = [];
    }

    // Dismiss notification by id
    dismiss(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.dismiss();
            this.notifications = this.notifications.filter(n => n.id !== id);
        }
    }
}

// Create notification manager instance
const notificationManager = new NotificationManager();

// Export notification manager
export default notificationManager;

// Export helper functions
export const showSuccess = (message, options) => notificationManager.success(message, options);
export const showError = (message, options) => notificationManager.error(message, options);
export const showWarning = (message, options) => notificationManager.warning(message, options);
export const showInfo = (message, options) => notificationManager.info(message, options);
export const dismissAll = () => notificationManager.dismissAll();
export const dismiss = (id) => notificationManager.dismiss(id); 