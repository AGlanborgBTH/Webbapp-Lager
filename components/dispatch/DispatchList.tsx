import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import orderModule from "../../models/orders"
import Order from "../../interfaces/order"

export default function DispatchList({ route, navigation }) {
  const { reload } = route.params || false;
  const [allOrders, setAllOrders] = useState<Partial<Order[]>>([]);

  if (reload) {
    reloadOrders();
    route.params.reload = false
  }

  async function reloadOrders() {
    setAllOrders(await orderModule.getOrders());
  }

  useEffect(() => {
    reloadOrders();
  }, []);

  const listOfDeliveries = allOrders.filter((order) => order.status_id === 200).map((order, index) => {
    return (
      <View style={[{ ...Base.stack }, { ...Base.boxMargin }]} key={index}>
        <View style={[{ ...Base.stackItem }, { ...Unique.darker },]}>
          <Text style={[{ ...Typography.stackText }]}>
            Name
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {order.name}
          </Text>
        </View>
        <View style={[{ ...Forms.slimButton }, { ...Base.marginTen }]}>
          <Button
            title={"View order"}
            onPress={() => {
              navigation.navigate('Leverans formulär', {
                order: order
              });
            }}
          />
        </View>
      </View>
    )
  });

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Base.marginTen }, { ...Typography.header2 }]}>
        Väntande Leveranser
      </Text>
      {listOfDeliveries.length ? listOfDeliveries : (
        <View style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
        <View style={[{ ...Base.stackItem }, { ...Unique.darker }]}>
          <Text style={[{ ...Typography.stackText }]}>
            Inga väntande Leveranser
          </Text>
        </View>
      </View>
      )}
    </ScrollView>
  );
};