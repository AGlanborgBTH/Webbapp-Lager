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

  const orderItemsList = order.order_items.map((item, index) => {
    if (item.amount > item.stock) {
      check = 0;
    }

    return <View
      style={{ ...Base.marginFive }}
      key={index}
    >
      <Text style={{ ...Typography.normal }}>
        {item.name} - {item.amount} - {item.location}
      </Text>
    </View>;
  });

  return (
    <ScrollView style={[{ ...Base.base }, { ...Base.marginFive }]}>
      <Text style={[{ ...Base.marginLeft }, { ...Typography.normal }]}>{order.name}</Text>
      <Text style={[{ ...Base.marginLeft }, { ...Typography.normal }]}>{order.address}</Text>
      <Text style={[{ ...Base.marginLeft }, { ...Typography.normal }]}>{order.zip} {order.city}</Text>

      <View style={{ ...Unique.divide }}></View>

      <Text style={[{ ...Base.marginTop }, { ...Typography.normal }]}>Produkter:</Text>

      {orderItemsList}

      <View style={{ ...Base.marginFive }}>
        { check ? 
          <Button title="Plocka order" onPress={pick} /> : 
          <Text  style={{ ...Typography.normal }}>
            There are not enough items in stock!
          </Text> 
        }
      </View>
    </ScrollView>
  )
};