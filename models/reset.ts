import config from "../config/config.json";

const reset = {
    resetData: async function resetData() {
        try {
            await fetch(`${config.base_url}/copier/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "api_key": config.api_key })
            });
        } catch (error) {
            console.log("Could not Reset")
        }
    },
};

export default reset;