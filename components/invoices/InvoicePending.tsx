import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import orderModel from "../../models/orders"

export default function InvoicesList({ route, navigation, orders, setOrders }) {
  let { reload } = route.params || false;

  if (reload) {
    orderModel.getOrders().then(setOrders)
    route.params.reload = false
  }

  const PendingInvoices = orders.filter((order) => order.status_id === 400).map((order, index) => {
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
            title={"View order"}
            onPress={() => {
              navigation.navigate('Faktura formulär', {
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
        Väntande fakturor
      </Text>
      {PendingInvoices.length ? PendingInvoices : (
        <View style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
          <View style={[{ ...Base.stackItem }, { ...Unique.darker }]}>
            <Text style={[{ ...Typography.stackText }]}>
              Inga väntande fakturor
            </Text>
          </View>
        </View>
      )}
      <View style={[{ ...Forms.slimButton }, { ...Base.marginTen }]}>
        <Button
          title={"Skickade fakturor"}
          onPress={() => {
            navigation.navigate('Skickade faktura', {reload: true});
          }}
        />
      </View>
    </ScrollView>
  );
};