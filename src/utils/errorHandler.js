// Import constants
import { ERROR_MESSAGES } from './constants';

// Custom error class
export class AppError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Error codes
export const ERROR_CODES = {
    NETWORK_ERROR: 'NETWORK_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    SERVER_ERROR: 'SERVER_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
    ORDER_REJECTED: 'ORDER_REJECTED',
    SESSION_EXPIRED: 'SESSION_EXPIRED'
};

// Handle API errors
export function handleApiError(error) {
    if (error.response) {
        // Server responded with error
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
            case 400:
                throw new AppError(
                    data.message || ERROR_MESSAGES.VALIDATION_ERROR,
                    ERROR_CODES.VALIDATION_ERROR,
                    data.errors
                );
            case 401:
                throw new AppError(
                    ERROR_MESSAGES.UNAUTHORIZED,
                    ERROR_CODES.UNAUTHORIZED
                );
            case 403:
                throw new AppError(
                    ERROR_MESSAGES.FORBIDDEN,
                    ERROR_CODES.FORBIDDEN
                );
            case 404:
                throw new AppError(
                    ERROR_MESSAGES.NOT_FOUND,
                    ERROR_CODES.NOT_FOUND
                );
            case 500:
                throw new AppError(
                    ERROR_MESSAGES.SERVER_ERROR,
                    ERROR_CODES.SERVER_ERROR
                );
            default:
                throw new AppError(
                    data.message || ERROR_MESSAGES.SERVER_ERROR,
                    ERROR_CODES.SERVER_ERROR
                );
        }
    } else if (error.request) {
        // Request made but no response
        throw new AppError(
            ERROR_MESSAGES.NETWORK_ERROR,
            ERROR_CODES.NETWORK_ERROR
        );
    } else {
        // Error in request setup
        throw new AppError(
            error.message || ERROR_MESSAGES.SERVER_ERROR,
            ERROR_CODES.SERVER_ERROR
        );
    }
}

// Handle validation errors
export function handleValidationError(errors) {
    throw new AppError(
        ERROR_MESSAGES.VALIDATION_ERROR,
        ERROR_CODES.VALIDATION_ERROR,
        errors
    );
}

// Handle order errors
export function handleOrderError(error) {
    if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new AppError(
            ERROR_MESSAGES.INSUFFICIENT_FUNDS,
            ERROR_CODES.INSUFFICIENT_FUNDS
        );
    } else if (error.code === 'ORDER_REJECTED') {
        throw new AppError(
            ERROR_MESSAGES.ORDER_REJECTED,
            ERROR_CODES.ORDER_REJECTED
        );
    } else {
        throw error;
    }
}

// Handle session errors
export function handleSessionError(error) {
    if (error.code === 'SESSION_EXPIRED') {
        // Clear session data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        
        // Redirect to login
        window.location.href = '/login.html';
    }
    throw error;
}

// Error logging
export function logError(error, context = {}) {
    console.error('Error:', {
        message: error.message,
        code: error.code,
        stack: error.stack,
        context
    });

    // TODO: Send error to error tracking service
    // if (process.env.NODE_ENV === 'production') {
    //     sendErrorToTrackingService(error, context);
    // }
}

// Error notification
export function showErrorNotification(error) {
    // TODO: Implement notification system
    // const notification = {
    //     type: 'error',
    //     message: error.message,
    //     duration: 5000
    // };
    // showNotification(notification);
}

// Global error handler
export function setupGlobalErrorHandler() {
    window.onerror = function(message, source, lineno, colno, error) {
        logError(error, {
            message,
            source,
            lineno,
            colno
        });
        return false;
    };

    window.onunhandledrejection = function(event) {
        logError(event.reason);
        return false;
    };
}

// Error boundary component
export function withErrorBoundary(WrappedComponent) {
    return class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false, error: null };
        }

        static getDerivedStateFromError(error) {
            return { hasError: true, error };
        }

        componentDidCatch(error, errorInfo) {
            logError(error, errorInfo);
        }

        render() {
            if (this.state.hasError) {
                return (
                    <div className="error-boundary">
                        <h2>Something went wrong</h2>
                        <p>{this.state.error?.message}</p>
                        <button onClick={() => window.location.reload()}>
                            Reload Page
                        </button>
                    </div>
                );
            }

            return <WrappedComponent {...this.props} />;
        }
    };
}

// Error retry wrapper
export function withRetry(fn, maxRetries = 3, delay = 1000) {
    return async function(...args) {
        let lastError;
        
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await fn(...args);
            } catch (error) {
                lastError = error;
                if (i < maxRetries - 1) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        throw lastError;
    };
} 