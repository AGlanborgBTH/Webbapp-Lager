import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './OrderList';
import Form from './OrderForm';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
  return (
    <Stack.Navigator initialRouteName="Plock">
      <Stack.Screen name="Plock lista">
        {(screenProps) => <List {...screenProps} orders={props.orders} setOrders={props.setOrders} />}
      </Stack.Screen>
      <Stack.Screen name="Plock formulär">
        {(screenProps) => <Form {...screenProps} setProducts={props.setProducts} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}