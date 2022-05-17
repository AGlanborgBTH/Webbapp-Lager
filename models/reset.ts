import config from "../config/config.json";
import post from "./actions/post"
import storage from "./storage"

const reset = {
    resetData: async function resetData() {
        await storage.deleteToken();
        await this.resetRequest();

        const login = {
            "email": "dbwebb@email.com",
            "password": "Pass"
        };

        await post.register(login);

        const product = {
            "name": "Mutter M4",
            "article_number": "1204-TNT",
            "description": "Mutter M4, värmförsinkad, passar 1204-RNT",
            "specifiers": "{'diameter' : '4mm'}",
            "stock": 0,
            "location": "A1C5",
            "price": 12
        }

        await post.postProduct(product)
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
            console.log("Reset failed");
        }
    }
};

export default reset;