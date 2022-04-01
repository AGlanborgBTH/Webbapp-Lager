import { useState, useEffect } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import config from "../config/config.json";

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(function (response) {
                return response.json();
            }).then(function(result) {
                setPosts(result.data);
            });
    }, []);

    const StockList = posts.map((product, index) => {
        return <Text key={index} style={styles.text}>{ product.name } - { product.stock }</Text>
    })

    return (
        <View>
            {StockList}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
      color: 'rgb(200, 200, 250)',
      fontSize: 30,
      lineHeight: 45
    }
  });