import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Button } from "react-native";
import resetModule from "../models/reset";
import get from "../models/actions/get"
import delivery from "../models/deliveries"
import { Base, Forms, Typography, Unique } from "../styles"

export default function Reset({ route, navigation, setProducts, setIsLoggedIn }) {
  const [allDeliveries, setAllDeliveries] = useState([]);

  async function reset() {
    await resetModule.resetData();

    setAllDeliveries(await delivery.getDelivery());
    setProducts(await get.getProducts());
    setIsLoggedIn(false)

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