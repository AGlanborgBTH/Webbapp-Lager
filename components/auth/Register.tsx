import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";

export default function Register({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doAddLogin() {
        if (auth.email && auth.password) {
            const obj = {
                "email": auth.email,
                "password": auth.password
            }

            const result = await AuthModel.register(obj);

            if (result.type === "success") {
                navigation.navigate("Login");
            }

            showMessage({
                message: result.title,
                description: result.message,
                type: result.type
            });
        } else {
            showMessage({
                message: "Register fel",
                description: "E-post eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doAddLogin}
            title="Register"
            navigation={navigation}
        />
    );
};