import put from "./actions/put";
import get from "./actions/get";
import Order from "../interfaces/order"

const orders = {
    pickOrder: async function pickOrder(order: Partial<Order>) {
        for (const product of order["order_items"]) {
            let pro = {
                id: product["product_id"],
                name: product.name,
                stock: product.stock - product["amount"]
            }

            await put.putProduct(pro)
        }
        let ord = {
            id: order["id"],
            name: order["name"],
            status_id: 200
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