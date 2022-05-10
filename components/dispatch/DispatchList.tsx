import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import orderModel from "../../models/orders"

export default function DispatchList({ route, navigation, orders, setOrders }) {
  const { reload } = route.params || false;

  if (reload) {
    reloadOrders();
    route.params.reload = false
  }

  async function reloadOrders() {
    setOrders(await orderModel.getOrders());
  }

  useEffect(() => {
    reloadOrders();
  }, []);

  const listOfDeliveries = orders.filter((order) => order.status_id === 200).map((order, index) => {
    return (
      <View style={[{ ...Base.stack }, { ...Base.boxMargin }]} key={index}>
        <View style={[{ ...Base.stackItem }, { ...Unique.bluer },]}>
          <Text style={[{ ...Typography.stackText }]}>
            Name
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {order.name}
          </Text>
        </View>
        <View style={[{ ...Forms.slimButton }, { ...Base.marginTen }]}>
          <Button
            title={"Visa order"}
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