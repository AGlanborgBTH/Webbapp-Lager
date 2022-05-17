import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import productModel from "../../models/products";
import { Base, Forms, Typography, Unique } from "../../styles"

export default function StockList({ products, setProducts }) {
  useEffect(() => {
    productModel.getProducts().then(setProducts)
  }, []);

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