import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../../config/config.json";
import get from "../../models/actions/get";
import * as base from "../../styles/base"
import * as typography from "../../styles/typography"
import * as unique from "../../styles/unique"

export default function StockList({ products, setProducts }) {
  useEffect(async () => {
    setProducts(await get.getProducts());
  }, []);

  const list = products.map((product, index) => {
    return <Text key={index} style={typography.normal}>
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
    <View style={[unique.extremeMarginLeft, base.marginTop]}>
      {list}
    </View>
  );
}