import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './InvoicesList';
import Form from './InvoiceForm';

const Stack = createNativeStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator initialRouteName="Invoice">
      <Stack.Screen name="Invoice list" component={List} />
      <Stack.Screen name="Invoice form" component={Form} />
    </Stack.Navigator>
  );
};