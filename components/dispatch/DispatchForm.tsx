import { View, Text, ScrollView, Button } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import orderModule from "../../models/orders"

export default function DispatchList({ route, navigation }) {
  let { order } = route.params;

  async function dispatchOrder  () {
    const obj = {
      "id": order.id,
      "name": order.name,
      "status_id": 400
    }

    await orderModule.putOrder(obj)

    navigation.navigate('Leverans lista', {reload :true})
  }

  return (
    <ScrollView style={Base.base}>
      <View style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
          <View style={[{ ...Base.stackItem }, { ...Unique.darker },]}>
            <Text style={[{ ...Typography.stackText }]}>
              Name
            </Text>
            <Text style={{ ...Typography.stackTextValue }}>
              {order.name}
            </Text>
          </View>
          <View style={[{ ...Base.stackItem }]}>
            <Text style={[{ ...Typography.stackText }]}>
              City
            </Text>
            <Text style={{ ...Typography.stackTextValue }}>
              {order.city}
            </Text>
          </View>
          <View style={[{ ...Base.stackItem }]}>
            <Text style={[{ ...Typography.stackText }]}>
              Address
            </Text>
            <Text style={{ ...Typography.stackTextValue }}>
              {order.address}
            </Text>
          </View>
          <View style={[{ ...Base.stackItem }]}>
            <Text style={[{ ...Typography.stackText }]}>
              Zip
            </Text>
            <Text style={{ ...Typography.stackTextValue }}>
              {order.zip}
            </Text>
          </View>
          <View style={[{ ...Forms.slimButton }, { ...Base.marginTen }]}>
            <Button
              title={"Send order"}
              onPress={dispatchOrder}
            />
          </View>
        </View>
    </ScrollView>
  );
};