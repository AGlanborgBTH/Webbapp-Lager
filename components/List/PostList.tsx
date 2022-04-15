import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://ladda.emilfolino.se/posts")
      .then(response => response.json())
      .then(result => setPosts(result.data))
  }, []);

  const listOfPosts = posts.map((post, index) => {
    return <Text key={index} style={styles.text}>{post.identifier}: {post.name}</Text>
  })

  return (
    <View>
      {listOfPosts}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'rgb(0, 0, 200)',
    fontSize: 30,
    lineHeight: 45,
  }
});