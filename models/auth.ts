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

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: "Login fel",
                message: result.errors.detail,
                type: "danger",
            };
        }

        await storage.storeToken(result.data.token);

        return {
            title: "Inloggning",
            message: result.data.message,
            type: "success",
        };
    },
    register: async function register(login: object) {
        const result = await post.register(login);

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: "Register fel",
                message: "E-post är skriven fel",
                type: "danger",
            };
        }

        return {
            title: "Registrera",
            message: result.data.message,
            type: "success",
        };
    },
    logout: async function logout() {
        await storage.deleteToken();
    }
};

export default auth;