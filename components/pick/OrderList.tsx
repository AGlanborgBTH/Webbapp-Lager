import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import orderModel from "../../models/orders"

export default function OrderList({ route, navigation, orders, setOrders }) {
  const { reload } = route.params || false;

  if (reload) {
    orderModel.getOrders().then(setOrders)
    route.params.reload = false;
  }

  const listOfOrders = orders
    .filter(order => order.status_id === 100)
    .map((order, index) => {
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
                navigation.navigate('Plock formulär', {
                  order: order
                });
              }}
            />
          </View>
        </View>
      )
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