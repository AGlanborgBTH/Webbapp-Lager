import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Button } from "react-native";
import resetModule from "../models/reset";
import get from "../models/actions/get"
import { Base, Forms, Typography, Unique } from "../styles"

export default function Reset({ route, navigation, setProducts }) {
  const [productsList, setProductsList] = useState([]);

  useEffect(async () => {
    setProductsList(await get.getProducts());
  }, []);

  async function reset() {
    await resetModule.resetData();
    setProducts(await get.getProducts());
    navigation.navigate("Lager", { reload: true });
  }

  return (
    <SafeAreaView style={{ ...Base.base }}>
      <View style={{ ...Unique.resetButton }}>
        <Button title={"Reset content"} onPress={reset} />
      </View>
    </SafeAreaView>
  );
}