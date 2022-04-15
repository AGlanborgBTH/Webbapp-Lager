import config from "../config/config.json"
import put from "./actions/put";

const orders = {
    pickOrder: async function pickOrder(order: object) {
        for (const product of order["order_items"]) {
            let pro = {
                id: product.product_id,
                name: product.name,
                stock: product.stock - product.amount,
                api_key: config.api_key
            }

            await put.putProduct(pro)
        }
        let ord = {
            id: order["id"],
            name: order["name"],
            status_id: 200,
            api_key: config.api_key
        }

        await put.putOrder(ord)
    }
};

export default orders;