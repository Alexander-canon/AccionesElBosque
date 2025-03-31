// Import constants
import { STORAGE_KEYS } from './constants';

// Storage class
class Storage {
    constructor() {
        this.storage = window.localStorage;
    }

    // Set item
    set(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            this.storage.setItem(key, serializedValue);
            return true;
        } catch (error) {
            console.error('Error saving to storage:', error);
            return false;
        }
    }

    // Get item
    get(key) {
        try {
            const serializedValue = this.storage.getItem(key);
            return serializedValue ? JSON.parse(serializedValue) : null;
        } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
        }
    }

    // Remove item
    remove(key) {
        try {
            this.storage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from storage:', error);
            return false;
        }
    }

    // Clear all items
    clear() {
        try {
            this.storage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    }

    // Get all items
    getAll() {
        try {
            const items = {};
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                items[key] = this.get(key);
            }
            return items;
        } catch (error) {
            console.error('Error getting all items from storage:', error);
            return {};
        }
    }

    // Check if item exists
    has(key) {
        return this.get(key) !== null;
    }

    // Get item size
    getSize() {
        try {
            let size = 0;
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                const value = this.storage.getItem(key);
                size += key.length + value.length;
            }
            return size;
        } catch (error) {
            console.error('Error getting storage size:', error);
            return 0;
        }
    }

    // Get remaining space
    getRemainingSpace() {
        try {
            const testKey = '__storage_test__';
            this.storage.setItem(testKey, '');
            this.storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }
}

// Create storage instance
const storage = new Storage();

// Auth storage functions
export const authStorage = {
    setToken(token) {
        return storage.set(STORAGE_KEYS.TOKEN, token);
    },

    getToken() {
        return storage.get(STORAGE_KEYS.TOKEN);
    },

    removeToken() {
        return storage.remove(STORAGE_KEYS.TOKEN);
    },

    setUser(user) {
        return storage.set(STORAGE_KEYS.USER, user);
    },

    getUser() {
        return storage.get(STORAGE_KEYS.USER);
    },

    removeUser() {
        return storage.remove(STORAGE_KEYS.USER);
    },

    clearAuth() {
        storage.remove(STORAGE_KEYS.TOKEN);
        storage.remove(STORAGE_KEYS.USER);
    }
};

// Settings storage functions
export const settingsStorage = {
    setSettings(settings) {
        return storage.set(STORAGE_KEYS.SETTINGS, settings);
    },

    getSettings() {
        return storage.get(STORAGE_KEYS.SETTINGS);
    },

    updateSettings(updates) {
        const currentSettings = this.getSettings() || {};
        const newSettings = { ...currentSettings, ...updates };
        return this.setSettings(newSettings);
    },

    removeSettings() {
        return storage.remove(STORAGE_KEYS.SETTINGS);
    }
};

// Theme storage functions
export const themeStorage = {
    setTheme(theme) {
        return storage.set(STORAGE_KEYS.THEME, theme);
    },

    getTheme() {
        return storage.get(STORAGE_KEYS.THEME);
    },

    removeTheme() {
        return storage.remove(STORAGE_KEYS.THEME);
    }
};

// Cache storage functions
export const cacheStorage = {
    set(key, value, ttl = 3600) {
        const item = {
            value,
            timestamp: Date.now(),
            ttl
        };
        return storage.set(`cache_${key}`, item);
    },

    get(key) {
        const item = storage.get(`cache_${key}`);
        if (!item) return null;

        const now = Date.now();
        const expired = now - item.timestamp > item.ttl * 1000;

        if (expired) {
            this.remove(key);
            return null;
        }

        return item.value;
    },

    remove(key) {
        return storage.remove(`cache_${key}`);
    },

    clear() {
        const items = storage.getAll();
        Object.keys(items).forEach(key => {
            if (key.startsWith('cache_')) {
                storage.remove(key);
            }
        });
    }
};

// Session storage functions
export const sessionStorage = {
    set(key, value) {
        try {
            window.sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to session storage:', error);
            return false;
        }
    },

    get(key) {
        try {
            const value = window.sessionStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error reading from session storage:', error);
            return null;
        }
    },

    remove(key) {
        try {
            window.sessionStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from session storage:', error);
            return false;
        }
    },

    clear() {
        try {
            window.sessionStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing session storage:', error);
            return false;
        }
    }
};

// Export storage instance
export default storage; 