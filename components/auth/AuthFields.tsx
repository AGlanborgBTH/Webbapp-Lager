import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../../styles';
import { marginTen } from "../../styles/base";

export default function AuthFields({ auth, setAuth, title, submit, navigation }) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>
            <View style={{ ...Base.marginTen }}>
                <Text style={Typography.label}>E-post</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        setAuth({ ...auth, email: content })
                    }}
                    value={auth?.email}
                    keyboardType="email-address"
                />
            </View>
            <View style={{ ...Base.marginTen }}>
                <Text style={Typography.label}>Lösenord</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        setAuth({ ...auth, password: content })
                    }}
                    value={auth?.password}
                    secureTextEntry={true}
                />
            </View>
            <View style={[{ ...Forms.slimButton }, { ...marginTen }]}>
                <Button
                    title={title}
                    onPress={() => {
                        submit();
                    }}
                />
            </View>
            {title === "Logga in" &&
                <View style={[{ ...Forms.slimButton }, { ...marginTen }]}>
                    <Button
                        title="Registrera"
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                    />
                </View>
            }
        </View>
    );
};