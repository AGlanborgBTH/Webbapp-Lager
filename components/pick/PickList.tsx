import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import orderModel from "../../models/orders";
import productModel from "../../models/products";
import { Base, Forms, Typography, Unique } from "../../styles"

export default function PickList({ route, navigation, setProducts }) {
  const { order } = route.params;
  const [productsList, setProductsList] = useState([]);
  let check = 1;

  useEffect(async () => {
    setProductsList(await productModel.getProducts());
  }, []);

  async function pick() {
    await orderModel.pickOrder(order);
    setProducts(await productModel.getProducts());
    navigation.navigate("List", { reload: true });
  }

  const newOrderItemsList = order.order_items.map((item, index) => {
    if (item.amount > item.stock) {
      check = 0;
    }

    return <View key={index} style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
      <View style={[{ ...Base.stackItem }, { ...Unique.darker },]}>
        <Text style={[{ ...Typography.stackText }]}>
          Item
        </Text>
        <Text style={{ ...Typography.stackTextValue }}>
          {item.name}
        </Text>
      </View>
      <View style={[{ ...Base.stackItem }]}>
        <Text style={[{ ...Typography.stackText }]}>
          Amount
        </Text>
        <Text style={{ ...Typography.stackTextValue }}>
          {item.amount}
        </Text>
      </View>
      <View style={[{ ...Base.stackItem }]}>
        <Text style={[{ ...Typography.stackText }]}>
          Location
        </Text>
        <Text style={{ ...Typography.stackTextValue }}>
          {item.location}
        </Text>
      </View>
    </View>
  });

  return (
    <ScrollView style={[{ ...Base.base }]}>
      <Text style={[{ ...Typography.header1 }, { ...Unique.darker }]}>{order.name}</Text>
      <Text style={[{ ...Base.marginLeft }, { ...Typography.normal }]}>{order.address}</Text>
      <Text style={[{ ...Base.marginLeft }, { ...Typography.normal }]}>{order.zip} {order.city}</Text>

      <View style={{ ...Unique.divide }}></View>

      {newOrderItemsList}

      <View style={{ ...Base.marginTen }}>
        {check ?
          <Button title="Plocka order" onPress={pick} /> :
          <Text style={{ ...Typography.normal }}>
            There are not enough items in stock!
          </Text>
        }
      </View>
    </ScrollView>
  )
};