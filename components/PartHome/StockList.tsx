import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../../config/config.json";
import pro from "../../models/products";
import { Base, Forms, Typography, Unique } from "../../styles"

export default function StockList({ products, setProducts }) {
  useEffect(async () => {
    setProducts(await pro.getProducts());
  }, []);

  const list = products.map((product, index) => {
    return <Text key={index} style={{ ...Typography.normal }}>
      {product.name} - {product.stock}
    </Text>
  });
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
    <View style={[{ ...Unique.extremeMarginLeft }, { ...Base.marginTop }]}>
      {list}
    </View>
  );
}