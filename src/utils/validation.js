// Import constants
import { ORDER_TYPES, ORDER_SIDES, TIME_INTERVALS } from './constants';

// Validate order parameters
export function validateOrder(order) {
    const errors = [];

    // Validate required fields
    if (!order.symbol) errors.push('Symbol is required');
    if (!order.type) errors.push('Order type is required');
    if (!order.side) errors.push('Order side is required');
    if (!order.quantity) errors.push('Quantity is required');

    // Validate order type
    if (!Object.values(ORDER_TYPES).includes(order.type)) {
        errors.push('Invalid order type');
    }

    // Validate order side
    if (!Object.values(ORDER_SIDES).includes(order.side)) {
        errors.push('Invalid order side');
    }

    // Validate quantity
    if (order.quantity <= 0) {
        errors.push('Quantity must be greater than 0');
    }

    // Validate price for limit orders
    if (order.type === ORDER_TYPES.LIMIT && (!order.price || order.price <= 0)) {
        errors.push('Price is required for limit orders and must be greater than 0');
    }

    // Validate stop price for stop orders
    if ((order.type === ORDER_TYPES.STOP || order.type === ORDER_TYPES.STOP_LIMIT) && 
        (!order.stopPrice || order.stopPrice <= 0)) {
        errors.push('Stop price is required for stop orders and must be greater than 0');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Validate time interval
export function validateTimeInterval(interval) {
    return Object.values(TIME_INTERVALS).includes(interval);
}

// Validate symbol format
export function validateSymbol(symbol) {
    const symbolRegex = /^[A-Z]{1,5}(\.[A-Z]{1,2})?$/;
    return symbolRegex.test(symbol);
}

// Validate price format
export function validatePrice(price) {
    return typeof price === 'number' && price > 0 && Number.isFinite(price);
}

// Validate quantity format
export function validateQuantity(quantity) {
    return typeof quantity === 'number' && 
           quantity > 0 && 
           Number.isFinite(quantity) && 
           Number.isInteger(quantity);
}

// Validate date range
export function validateDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start < end && start > new Date(0);
}

// Validate percentage
export function validatePercentage(value) {
    return typeof value === 'number' && 
           value >= 0 && 
           value <= 100 && 
           Number.isFinite(value);
}

// Validate amount
export function validateAmount(amount) {
    return typeof amount === 'number' && 
           amount > 0 && 
           Number.isFinite(amount);
}

// Validate phone number
export function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
}

// Validate URL
export function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Validate file size
export function validateFileSize(file, maxSize) {
    return file.size <= maxSize;
}

// Validate file type
export function validateFileType(file, allowedTypes) {
    return allowedTypes.includes(file.type);
}

// Validate object properties
export function validateObjectProperties(obj, requiredProps) {
    const missingProps = requiredProps.filter(prop => !(prop in obj));
    return {
        isValid: missingProps.length === 0,
        missingProps
    };
}

// Validate array length
export function validateArrayLength(arr, minLength, maxLength) {
    return arr.length >= minLength && arr.length <= maxLength;
}

// Validate string length
export function validateStringLength(str, minLength, maxLength) {
    return str.length >= minLength && str.length <= maxLength;
}

// Validate numeric range
export function validateNumericRange(value, min, max) {
    return value >= min && value <= max;
}

// Validate date format
export function validateDateFormat(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
}

// Validate time format
export function validateTimeFormat(time) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
}

// Validate color format
export function validateColorFormat(color) {
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return colorRegex.test(color);
} 