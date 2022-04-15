import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './List/OrderList';
import PickList from './List/PickList';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={OrderList} />
      <Stack.Screen name="Details">
        {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}