import config from "../../config/config.json";

const get = {
    getOrders: async function getOrders() {
        try {
            const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
            const result = await response.json();

            return result.data;
        } catch (error) {
            console.log("Could not get Orders")
        }
    },
    getProducts: async function getProducts() {
        try {
            const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
            const result = await response.json();

            return result.data;
        } catch (error) {
            console.log("Could not get Products")
        }
    },
    getDelivery: async function getDelivery() {
        try {
            const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
            const result = await response.json();

            return result.data;
        } catch (error) {
            console.log("Could not get Delivery")
        }

    },
    getInvoices: async function getInvoices(token: string) {
        try {
            const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
                headers: {
                    'x-access-token': token
                },
            });
            const result = await response.json();

            return result.data;
        } catch (error) {
            console.log("Could not get Invoices")
        }
    }
};

export default get;