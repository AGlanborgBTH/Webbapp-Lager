import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../../config/config.json";
import productModel from "../../models/products";
import { Base, Forms, Typography, Unique } from "../../styles"

export default function StockList({ products, setProducts }) {
  useEffect(() => {
    productModel.getProducts().then(setProducts)
  }, []);

  const newList = products.map((product, index) => {
    if (product.stock == 0) {
      return <View key={index} style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
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
    }
    return <View key={index} style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
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
  })
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(function (response) {
        return response.json();
      }).then(function (result) {
        setPosts(result.data);
      });
  }, []);


  return (
    <View style={{ ...Base.marginTen }}>
      {newList}
    </View>
  );
}