import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import get from "../../models/actions/get"
import config from "../../config/config.json";
import * as base from "../../styles/base";

export default function OrderList({ route, navigation }) {
  const { reload } = route.params || false;
  const [allOrders, setAllOrders] = useState([]);

  if (reload) {
    reloadOrders();
  }

  async function reloadOrders() {
    setAllOrders(await get.getOrders());
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
        style={base.marginFive}
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
    <View>
      <Text style={base.marginFive}>
        Ordrar redo att plockas
      </Text>
      {listOfOrders}
    </View>
  );
}