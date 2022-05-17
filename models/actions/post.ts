import config from "../../config/config.json";

const add = {
    postProduct: async function postProduct(product: object) {
        try {
            product["api_key"] = config.api_key

            await fetch(`${config.base_url}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
        } catch (error) {
            console.log("Could not add to Product")
        }
    },
    postOrder: async function postOrder(order: object) {
        try {
            order["api_key"] = config.api_key

            await fetch(`${config.base_url}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
        } catch (error) {
            console.log("Could not add to Order")
        }
    },
    postDelivery: async function postDelivery(delivery: object) {
        try {
            delivery["api_key"] = config.api_key

            await fetch(`${config.base_url}/deliveries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(delivery)
            });
        } catch (error) {
            console.log("Could not add to Delivery")
        }
    },
    login: async function login(login: object) {
        try {
            login["api_key"] = config.api_key

            const response = await fetch(`${config.base_url}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            const result = await response.json();

            return result;
        } catch (error) {
            console.log("Could not add to Login")
        }
    },
    register: async function register(login: object) {
        try {
            login["api_key"] = config.api_key

            const response = await fetch(`${config.base_url}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            const result = await response.json();

            return result;
        } catch (error) {
            console.log("Could not add to Register")
        }
    },
    postInvoice: async function postInvoice(invoice: object, token: string) {
        try {
            invoice["api_key"] = config.api_key

            await fetch(`${config.base_url}/invoices`, {
                method: 'POST',
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(invoice)
            });
        } catch (error) {
            console.log("Could not add to Invoice")
        }
    },
};

export default add;