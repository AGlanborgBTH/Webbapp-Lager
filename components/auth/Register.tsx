import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';

export default function Register({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doAddLogin() {
        if (auth.email && auth.password) {
            const obj = {
                "email": auth.email,
                "password": auth.password
            }
            const result = await AuthModel.register(obj);

            if (result.message) {
                navigation.navigate("Login");
            }
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