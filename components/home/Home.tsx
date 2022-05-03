import { Image, View, Text, ScrollView } from 'react-native';
import Stock from './StockList';
import warehouse from '../../assets/warehouse.jpg';
import { Base, Forms, Typography, Unique } from "../../styles"

export default function Home({ products, setProducts }) {
  return (
    <ScrollView style={{ ...Base.base }}>
      <Text style={[{ ...Typography.header2 }, { ...Base.marginTen }]}>Lager-Appen</Text>
      <View style={{ ...Base.itemsCenter }}>
        <Image source={warehouse} style={{ width: 320, height: 240 }} />
      </View>
      <Stock products={products} setProducts={setProducts} />
    </ScrollView>
  );
}