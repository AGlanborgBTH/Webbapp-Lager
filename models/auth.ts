import post from "./actions/post";
import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {
        const token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;

        if (token) {
            const notExpired = (new Date().getTime() - token.date) < twentyFourHours;

            return token && notExpired;
        }
    },
    login: async function login(login: any) {
        const result = await post.login(login);

        if (result.data) {
            await storage.storeToken(result.data.token);
        }

        return result;
    },
    register: async function register(login: object) {
        return await post.register(login);
    },
    logout: async function logout() {
        await storage.deleteToken();
    }
};

export default auth;