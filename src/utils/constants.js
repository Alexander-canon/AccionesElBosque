// Puntos finales de la API
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

// Intervalos de tiempo
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

// Tipos de órdenes
export const ORDER_TYPES = {
    MARKET: 'market',
    LIMIT: 'limit',
    STOP: 'stop',
    STOP_LIMIT: 'stop_limit'
};

// Lados de la orden
export const ORDER_SIDES = {
    BUY: 'buy',
    SELL: 'sell'
};

// Estado de la orden
export const ORDER_STATUS = {
    PENDING: 'pending',
    FILLED: 'filled',
    PARTIALLY_FILLED: 'partially_filled',
    CANCELLED: 'cancelled',
    REJECTED: 'rejected'
};

// Tipos de notificación
export const NOTIFICATION_TYPES = {
    ORDER: 'order',
    PRICE_ALERT: 'price_alert',
    SYSTEM: 'system',
    NEWS: 'news'
};

// Tipos de gráficos
export const CHART_TYPES = {
    CANDLESTICK: 'candlestick',
    LINE: 'line',
    BAR: 'bar',
    AREA: 'area'
};

// Colores del tema
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

// Claves de almacenamiento local
export const STORAGE_KEYS = {
    TOKEN: 'auth_token',
    USER: 'user_data',
    SETTINGS: 'user_settings',
    THEME: 'theme_preference'
};

// Mensajes de error
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Error de red. Por favor, verifica tu conexión.',
    UNAUTHORIZED: 'Acceso no autorizado. Por favor, inicia sesión nuevamente.',
    FORBIDDEN: 'Acceso prohibido. No tienes permiso.',
    NOT_FOUND: 'Recurso no encontrado.',
    SERVER_ERROR: 'Error del servidor. Por favor, intenta nuevamente más tarde.',
    VALIDATION_ERROR: 'Por favor, verifica tu entrada e intenta nuevamente.',
    INSUFFICIENT_FUNDS: 'Fondos insuficientes para esta transacción.',
    ORDER_REJECTED: 'La orden fue rechazada. Por favor, intenta nuevamente.',
    SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
    LOGIN: 'Inicio de sesión exitoso.',
    LOGOUT: 'Cierre de sesión exitoso.',
    ORDER_PLACED: 'Orden colocada exitosamente.',
    ORDER_CANCELLED: 'Orden cancelada exitosamente.',
    WATCHLIST_ADDED: 'Símbolo agregado a la lista de seguimiento.',
    WATCHLIST_REMOVED: 'Símbolo eliminado de la lista de seguimiento.',
    SETTINGS_UPDATED: 'Configuración actualizada exitosamente.',
    PROFILE_UPDATED: 'Perfil actualizado exitosamente.'
};

// Configuración predeterminada
export const DEFAULT_SETTINGS = {
    THEME: 'light',
    LANGUAGE: 'es',
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