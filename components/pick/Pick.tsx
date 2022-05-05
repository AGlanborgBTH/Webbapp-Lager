import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderList';
import PickList from './PickList';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
  return (
    <Stack.Navigator initialRouteName="Plock">
      <Stack.Screen name="Plock lista">
        {(screenProps) => <OrderList {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="Plock formulär">
        {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}