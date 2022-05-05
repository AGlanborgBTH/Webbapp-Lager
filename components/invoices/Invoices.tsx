import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './InvoicesList';
import Form from './InvoiceForm';

const Stack = createNativeStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator initialRouteName="Faktura">
      <Stack.Screen name="Faktura lista" component={List} />
      <Stack.Screen name="Faktura formulär">
        {(screenProps) => <Form {...screenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};