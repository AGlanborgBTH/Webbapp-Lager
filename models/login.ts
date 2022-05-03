import put from "./actions/put";
import get from "./actions/get";
import post from "./actions/post";

const Login = {
    addLogin: async function addLogin(Login: object) {
        return await post.postLogin(Login)
    }
};

export default Login;