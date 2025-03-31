import { API_CONFIG, ENDPOINTS, requestInterceptor, responseInterceptor, errorInterceptor } from './config';
import { handleApiError } from '../utils/helpers';

// Trading API Class
class TradingApi {
    constructor() {
        this.baseURL = `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}`;
    }

    // Get market data
    async getMarketData(symbol) {
        try {
            const response = await fetch(`${this.baseURL}${ENDPOINTS.TRADING.MARKET_DATA}/${symbol}`, {
                method: 'GET',
                headers: requestInterceptor({ headers: API_CONFIG.HEADERS }).headers
            });
            return responseInterceptor(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Place order
    async placeOrder(orderData) {
        try {
            const response = await fetch(`${this.baseURL}${ENDPOINTS.TRADING.ORDERS}`, {
                method: 'POST',
                headers: requestInterceptor({ headers: API_CONFIG.HEADERS }).headers,
                body: JSON.stringify(orderData)
            });
            return responseInterceptor(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Get portfolio
    async getPortfolio() {
        try {
            const response = await fetch(`${this.baseURL}${ENDPOINTS.TRADING.PORTFOLIO}`, {
                method: 'GET',
                headers: requestInterceptor({ headers: API_CONFIG.HEADERS }).headers
            });
            return responseInterceptor(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Get positions
    async getPositions() {
        try {
            const response = await fetch(`${this.baseURL}${ENDPOINTS.TRADING.POSITIONS}`, {
                method: 'GET',
                headers: requestInterceptor({ headers: API_CONFIG.HEADERS }).headers
            });
            return responseInterceptor(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Get order history
    async getOrderHistory(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${this.baseURL}${ENDPOINTS.TRADING.ORDERS}/history?${queryString}`, {
                method: 'GET',
                headers: requestInterceptor({ headers: API_CONFIG.HEADERS }).headers
            });
            return responseInterceptor(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Cancel order
    async cancelOrder(orderId) {
        try {
            const response = await fetch(`${this.baseURL}${ENDPOINTS.TRADING.ORDERS}/${orderId}`, {
                method: 'DELETE',
                headers: requestInterceptor({ headers: API_CONFIG.HEADERS }).headers
            });
            return responseInterceptor(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Get available symbols
    async getSymbols(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${this.baseURL}${ENDPOINTS.TRADING.SYMBOLS}?${queryString}`, {
                method: 'GET',
                headers: requestInterceptor({ headers: API_CONFIG.HEADERS }).headers
            });
            return responseInterceptor(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }
}

// Export singleton instance
export const tradingApi = new TradingApi(); 