import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './DispatchList';
import Form from './DispatchForm';

const Stack = createNativeStackNavigator();

export default function Auth(props) {
  return (
    <Stack.Navigator initialRouteName="Leverans">
      <Stack.Screen name="Leverans lista">
        {(screenProps) => <List {...screenProps} orders={props.orders} setOrders={props.setOrders} />}
      </Stack.Screen>
      <Stack.Screen name="Leverans formulär">
        {(screenProps) => <Form {...screenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};