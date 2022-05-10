import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './InvoicesList';
import Form from './InvoiceForm';
import Pending from './InvoicePending';

const Stack = createNativeStackNavigator();

export default function Auth(props) {
  return (
    <Stack.Navigator initialRouteName="Faktura">
      <Stack.Screen name="Väntande fakturor">
        {(screenProps) => <Pending {...screenProps} orders={props.orders} setOrders={props.setOrders} />}
      </Stack.Screen>
      <Stack.Screen name="Skickade faktura">
        {(screenProps) => <List {...screenProps} invoices={props.invoices} setInvoices={props.setInvoices} />}
      </Stack.Screen>
      <Stack.Screen name="Faktura formulär">
        {(screenProps) => <Form {...screenProps} invoices={props.invoices} setInvoices={props.setInvoices} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};