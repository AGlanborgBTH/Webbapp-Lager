import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './PartPick/OrderList';
import PickList from './PartPick/PickList';

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