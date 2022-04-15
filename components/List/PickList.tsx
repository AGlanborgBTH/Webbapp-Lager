import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from "../../models/orders";
import get from "../../models/actions/get";
import * as base from "../../styles/base"

export default function PickList({ route, navigation, setProducts }) {
  const { order } = route.params;
  const [productsList, setProductsList] = useState([]);
  let check = 1;

  useEffect(async () => {
    setProductsList(await get.getProducts());
  }, []);

  async function pick() {
    await orderModel.pickOrder(order);
    setProducts(await get.getProducts());
    navigation.navigate("List", { reload: true });
  }

  const orderItemsList = order.order_items.map((item, index) => {
    if (item.amount > item.stock) {
      check = 0;
    }

    return <View
      style={base.marginFive}
      key={index}
    >
      <Text>
        {item.name} - {item.amount} - {item.location}
      </Text>
    </View>;
  });

  return (
    <View style={base.marginFive}>
      <Text style={base.marginLeft}>{order.name}</Text>
      <Text style={base.marginLeft}>{order.address}</Text>
      <Text style={base.marginLeft}>{order.zip} {order.city}</Text>

      <View style={base.divide}></View>

      <Text style={base.marginTop}>Produkter:</Text>

      {orderItemsList}

      <View style={base.marginFive}>
        { check ? 
          <Button title="Plocka order" onPress={pick} /> : 
          <Text>
            There are not enough items in stock!
          </Text> 
        }
      </View>
    </View>
  )
};