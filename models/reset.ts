import config from "../config/config.json";
import get from "./actions/get"
import post from "./actions/post"
import put from "./actions/put"

const reset = {
    resetData: async function resetData() {
        await this.resetRequest()

        const products = await get.getProducts()

        const inleverans = {
            "product_id": products[3]["id"],
            "amount": 40,
            "delivery_date": "05/31/22",
            "comment": "Förvätad efterfråga efter nytt byggprojekt i stan godkändes"
        }

        await post.postDelivery(inleverans)

        const updatedProduct = {
            "id": products[3]["id"],
            "name": products[3]["name"],
            "stock": products[3]["stock"] + 40
        }

        await put.putProduct(updatedProduct)

        const login = {
            "email": "dbwebb@mail.com",
            "password": "pass"
        }

        console.log(await post.postLogin(login))
    },
    resetRequest: async function resetRequest() {
        try {
            await fetch(`${config.base_url}/copier/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "api_key": config.api_key })
            });
        } catch (error) {
            console.log("Reset failed")
        }
    }
};

export default reset;