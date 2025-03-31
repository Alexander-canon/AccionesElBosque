// API endpoints
export const API_ENDPOINTS = {
    BASE_URL: 'https://api.tradingapp.com/v1',
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        REGISTER: '/auth/register'
    },
    TRADING: {
        MARKET_OVERVIEW: '/market/overview',
        SYMBOL_INFO: '/market/symbols',
        PRICE_HISTORY: '/market/history',
        ORDER_BOOK: '/market/orderbook',
        TRADE_HISTORY: '/market/trades',
        MARKET_DEPTH: '/market/depth'
    },
    PORTFOLIO: {
        SUMMARY: '/portfolio/summary',
        HOLDINGS: '/portfolio/holdings',
        PERFORMANCE: '/portfolio/performance',
        TRANSACTIONS: '/portfolio/transactions',
        ALLOCATION: '/portfolio/allocation'
    },
    WATCHLIST: {
        LIST: '/watchlist',
        ADD: '/watchlist/add',
        REMOVE: '/watchlist/remove'
    },
    PAYMENTS: {
        BALANCE: '/payments/balance',
        TRANSACTIONS: '/payments/transactions',
        DEPOSIT: '/payments/deposit',
        WITHDRAW: '/payments/withdraw',
        METHODS: '/payments/methods'
    }
};

// Time intervals
export const TIME_INTERVALS = {
    ONE_MINUTE: '1m',
    FIVE_MINUTES: '5m',
    FIFTEEN_MINUTES: '15m',
    THIRTY_MINUTES: '30m',
    ONE_HOUR: '1h',
    FOUR_HOURS: '4h',
    ONE_DAY: '1d',
    ONE_WEEK: '1w',
    ONE_MONTH: '1M'
};

// Order types
export const ORDER_TYPES = {
    MARKET: 'market',
    LIMIT: 'limit',
    STOP: 'stop',
    STOP_LIMIT: 'stop_limit'
};

// Order sides
export const ORDER_SIDES = {
    BUY: 'buy',
    SELL: 'sell'
};

// Order status
export const ORDER_STATUS = {
    PENDING: 'pending',
    FILLED: 'filled',
    PARTIALLY_FILLED: 'partially_filled',
    CANCELLED: 'cancelled',
    REJECTED: 'rejected'
};

// Notification types
export const NOTIFICATION_TYPES = {
    ORDER: 'order',
    PRICE_ALERT: 'price_alert',
    SYSTEM: 'system',
    NEWS: 'news'
};

// Chart types
export const CHART_TYPES = {
    CANDLESTICK: 'candlestick',
    LINE: 'line',
    BAR: 'bar',
    AREA: 'area'
};

// Theme colors
export const THEME_COLORS = {
    PRIMARY: '#2196F3',
    SECONDARY: '#FFC107',
    SUCCESS: '#4CAF50',
    DANGER: '#F44336',
    WARNING: '#FF9800',
    INFO: '#00BCD4',
    LIGHT: '#F5F5F5',
    DARK: '#212121'
};

// Local storage keys
export const STORAGE_KEYS = {
    TOKEN: 'auth_token',
    USER: 'user_data',
    SETTINGS: 'user_settings',
    THEME: 'theme_preference'
};

// Error messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error occurred. Please check your connection.',
    UNAUTHORIZED: 'Unauthorized access. Please login again.',
    FORBIDDEN: 'Access forbidden. You do not have permission.',
    NOT_FOUND: 'Resource not found.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    INSUFFICIENT_FUNDS: 'Insufficient funds for this transaction.',
    ORDER_REJECTED: 'Order was rejected. Please try again.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
    LOGIN: 'Successfully logged in.',
    LOGOUT: 'Successfully logged out.',
    ORDER_PLACED: 'Order placed successfully.',
    ORDER_CANCELLED: 'Order cancelled successfully.',
    WATCHLIST_ADDED: 'Symbol added to watchlist.',
    WATCHLIST_REMOVED: 'Symbol removed from watchlist.',
    SETTINGS_UPDATED: 'Settings updated successfully.',
    PROFILE_UPDATED: 'Profile updated successfully.'
};

// Default settings
export const DEFAULT_SETTINGS = {
    THEME: 'light',
    LANGUAGE: 'en',
    TIMEZONE: 'UTC',
    NOTIFICATIONS: {
        EMAIL: true,
        PUSH: true,
        SMS: false
    },
    TRADING: {
        DEFAULT_ORDER_TYPE: ORDER_TYPES.MARKET,
        CONFIRM_ORDERS: true,
        SHOW_CONFIRMATION: true
    },
    CHART: {
        DEFAULT_TYPE: CHART_TYPES.CANDLESTICK,
        DEFAULT_INTERVAL: TIME_INTERVALS.ONE_DAY,
        SHOW_VOLUME: true,
        SHOW_GRID: true
    }
}; 