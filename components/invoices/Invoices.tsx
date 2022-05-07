import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './InvoicesList';
import Form from './InvoiceForm';
import Pending from './InvoicePending';

const Stack = createNativeStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator initialRouteName="Faktura">
      <Stack.Screen name="Väntande fakturor" component={Pending} />
      <Stack.Screen name="Skickade faktura" component={List} />
      <Stack.Screen name="Faktura formulär">
        {(screenProps) => <Form {...screenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};