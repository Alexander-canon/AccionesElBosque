// Import constants
import { STORAGE_KEYS } from './constants';

// Storage class
class Storage {
    constructor() {
        // Verificar si el almacenamiento local está disponible
        this.isAvailable = this.checkAvailability();
    }

    // Verificar disponibilidad del almacenamiento local
    checkAvailability() {
        try {
            const storage = window.localStorage;
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch(e) {
            return false;
        }
    }

    // Obtener elemento del almacenamiento
    get(key) {
        if (!this.isAvailable) return null;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error al obtener elemento del almacenamiento:', e);
            return null;
        }
    }

    // Guardar elemento en el almacenamiento
    set(key, value) {
        if (!this.isAvailable) return false;
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error al guardar elemento en el almacenamiento:', e);
            return false;
        }
    }

    // Eliminar elemento del almacenamiento
    remove(key) {
        if (!this.isAvailable) return false;
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error al eliminar elemento del almacenamiento:', e);
            return false;
        }
    }

    // Limpiar todo el almacenamiento
    clear() {
        if (!this.isAvailable) return false;
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error al limpiar el almacenamiento:', e);
            return false;
        }
    }

    // Verificar si existe un elemento
    has(key) {
        return this.get(key) !== null;
    }

    // Get all items
    getAll() {
        try {
            const items = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                items[key] = this.get(key);
            }
            return items;
        } catch (error) {
            console.error('Error getting all items from storage:', error);
            return {};
        }
    }

    // Get item size
    getSize() {
        try {
            let size = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
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
            localStorage.setItem(testKey, '');
            localStorage.removeItem(testKey);
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