import { Image, View, Text, ScrollView } from 'react-native';
import List from './ProductList';
import warehouse from '../../assets/warehouse.jpg';
import { Base, Forms, Typography, Unique } from "../../styles"

export default function Home({ products, setProducts }) {
  return (
    <ScrollView style={{ ...Base.base }}>
      <Text style={[{ ...Typography.header }, { ...Base.marginTen }]}>Lager-Appen</Text>
      <View style={[{ ...Base.itemsCenter }]}>
        <Image source={warehouse} style={{ width: 320, height: 240 }} />
      </View>
      <List products={products} setProducts={setProducts} />
    </ScrollView>
  );
}