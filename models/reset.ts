import config from "../config/config.json";
import get from "./actions/get"
import post from "./actions/post"
import put from "./actions/put"
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