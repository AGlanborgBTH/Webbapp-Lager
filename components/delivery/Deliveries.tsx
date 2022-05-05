import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List from './DeliveriesList';
import Form from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
  return (
    <Stack.Navigator initialRouteName="Inlevernas">
      <Stack.Screen name="Inlevernas lista">
        {(screenProps) => <List {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="Inlevernas formulär">
        {(screenProps) => <Form {...screenProps} setProducts={props.setProducts} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};