import put from "./actions/put";
import get from "./actions/get";

const products = {
    getProducts: async function getProducts() {
        return await get.getProducts()
    },
    putProduct: async function putProduct(product: object) {
        await put.putProduct(product)
    },
    
};

export default products;