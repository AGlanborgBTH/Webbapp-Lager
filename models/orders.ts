import put from "./actions/put";
import get from "./actions/get";
import Order from "../interfaces/order"
import config from "../config/config.json"

const orders = {
    pickOrder: async function pickOrder(order: Partial<Order>) {
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
    },
    getOrders: async function getOrders() {
        return await get.getOrders()
    },
    putOrder: async function putOrder(order: object) {
        await put.putOrder(order)
    }
};

export default orders;