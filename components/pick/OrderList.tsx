import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import orders from "../../models/orders"

export default function OrderList({ route, navigation }) {
  const { reload } = route.params || false;
  const [allOrders, setAllOrders] = useState([]);

  if (reload) {
    reloadOrders();
  }

  async function reloadOrders() {
    setAllOrders(await orders.getOrders());
  }

  useEffect(() => {
    reloadOrders();
  }, []);

  const listOfOrders = allOrders
    .filter(order => order.status_id === 100)
    .map((order, index) => {
      return <View
        style={[{ ...Forms.slimButton }, { ...Base.marginTen }]}
        key={index}
      >
        <Button
          title={order.name}

          onPress={() => {
            navigation.navigate('Plock formulär', {
              order: order
            });
          }}
        />
      </View>
    });

  return (
    <ScrollView style={{ ...Base.base }}>
      <Text style={[{ ...Base.marginTen }, { ...Typography.header2 }]}>
        Väntande ordrar
      </Text>
      {listOfOrders.length ? listOfOrders : (
        <View style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
        <View style={[{ ...Base.stackItem }, { ...Unique.darker }]}>
          <Text style={[{ ...Typography.stackText }]}>
            Inga väntande Ordrar
          </Text>
        </View>
      </View>
      )}
    </ScrollView>
  );
}