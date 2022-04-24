import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import orders from "../../models/orders"
import config from "../../config/config.json";
import { Base, Forms, Typography, Unique } from "../../styles"

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

  useEffect(() => {
    fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setAllOrders(result.data));
  }, []);

  const listOfOrders = allOrders
    .filter(order => order.status === "Ny")
    .map((order, index) => {
      return <View
        style={{ ...Forms.buttonConatiner }}
        key={index}
      >
        <Button
          title={order.name}

          onPress={() => {
            navigation.navigate('Details', {
              order: order
            });
          }}
        />
      </View>
    });

  return (
    <ScrollView style={{ ...Base.base }}>
      <Text style={{ ...Base.marginFive }}>
        Ordrar redo att plockas
      </Text>
      {listOfOrders}
    </ScrollView>
  );
}