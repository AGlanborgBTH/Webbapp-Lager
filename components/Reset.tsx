import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Button } from "react-native";
import resetModel from "../models/reset";
import productModel from "../models/products"
import ordersModel from "../models/orders"
import deliveryModel from "../models/deliveries"
import { Base, Forms, Typography, Unique } from "../styles"

export default function Reset({
  navigation,
  setProducts,
  setOrders,
  setDelivery,
  setIsLoggedIn
}) {
  async function reset() {
    await resetModel.resetData();

    setProducts(await productModel.getProducts());
    setOrders(await ordersModel.getOrders());
    setDelivery(await deliveryModel.getDelivery());
    setIsLoggedIn(false);

    navigation.navigate("Lager", { reload: true });
  }

  return (
    <SafeAreaView style={{ ...Base.base }}>
      <View style={[{ ...Forms.slimButton }, { ...Unique.resetButton }]}>
        <Button title={"Reset content"} onPress={reset} />
      </View>
    </SafeAreaView>
  );
}