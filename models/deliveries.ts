import put from "./actions/put";
import get from "./actions/get";
import post from "./actions/post";

const Delivery = {
    getDelivery: async function putOrder() {
        return await get.getDelivery()
    },
    putDelivery: async function putOrder(delivery: object) {
        await put.putDelivery(delivery)
    },
    addDelivery: async function putOrder(delivery: object) {
        await post.postDelivery(delivery)
    }
};

export default Delivery;