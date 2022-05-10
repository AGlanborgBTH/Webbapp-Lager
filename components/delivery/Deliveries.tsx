import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './DeliveriesList';
import Form from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
  return (
    <Stack.Navigator initialRouteName="Inleverans">
      <Stack.Screen name="Inleverans lista">
        {(screenProps) => <List {...screenProps} delivery={props.delivery} setDelivery={props.setDelivery} />}
      </Stack.Screen>
      <Stack.Screen name="Inleverans formulär">
        {(screenProps) => <Form {...screenProps} setProducts={props.setProducts} setDelivery={props.setDelivery} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};