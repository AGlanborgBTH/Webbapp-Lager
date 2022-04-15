import { Image, View, Text, ScrollView } from 'react-native';
//import PostList from './components/PostList';
import Stock from './List/StockList';
import warehouse from '../assets/warehouse.jpg';
import * as typography from "../styles/typography"
import * as base from "../styles/base"

export default function Home({ products, setProducts }) {
  return (
    <ScrollView>
      <Text style={[typography.evenHeader, base.marginTen]}>Lager-Appen</Text>
      <View style={base.itemsCenter}>
        <Image source={warehouse} style={{ width: 320, height: 240 }} />
      </View>
      <Stock products={products} setProducts={setProducts} />
    </ScrollView>
  );
}