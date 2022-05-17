import { Text, View } from 'react-native';
import { Base, Forms, Typography, Unique } from "../../styles"
import productModel from "../../models/products"

export default function StockList({ products, setProducts, route }) {
  const { reload } = route.params || false;

  if (reload) {
    productModel.getProducts().then(setProducts)
    route.params.reload = false
  }

  const list = products.map((product, index) => {
    if (product.stock == 0) {
      return (
        <View key={index} style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
          <View style={[{ ...Base.stackItem }, { ...Unique.darker }]}>
            <Text style={[{ ...Typography.stackText }]}>
              Produkt
            </Text>
            <Text style={{ ...Typography.stackTextValue }}>
              {product.name}
            </Text>
          </View>
          <View style={[{ ...Base.stackItem }]}>
            <Text style={[{ ...Typography.stackText }]}>
              Lager
            </Text>
            <Text style={{ ...Typography.stackTextValue }}>
              {product.stock}
            </Text>
          </View>
        </View>
      )
    }
    return (
      <View key={index} style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
        <View style={[{ ...Base.stackItem }, { ...Unique.bluer }]}>
          <Text style={[{ ...Typography.stackText }]}>
            Produkt
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {product.name}
          </Text>
        </View>
        <View style={[{ ...Base.stackItem }]}>
          <Text style={[{ ...Typography.stackText }]}>
            Lager
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {product.stock}
          </Text>
        </View>
      </View>
    )
  })

  return (
    <View style={{ ...Base.marginTen }}>
      {list}
    </View>
  );
}