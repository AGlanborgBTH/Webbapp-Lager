import config from "../../config/config.json";

const update = {
    putProduct: async function putProduct(product: object) {
        try {
            product["api_key"] = config.api_key

            await fetch(`${config.base_url}/products`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
        } catch (error) {
            console.log("Could not update Product")
        }
    },
    putOrder: async function putOrder(order: object) {
        try {
            order["api_key"] = config.api_key

            await fetch(`${config.base_url}/orders`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
        } catch (error) {
            console.log("Could not update Order")
        }
    },
};

export default update;