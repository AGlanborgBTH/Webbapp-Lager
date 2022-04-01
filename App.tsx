import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
//import PostList from './components/PostList';
import StockList from './components/StockList';
import warehouse from './assets/warehouse.jpg';

export default function App() {
  return (
    <SafeAreaView style={{backgroundColor:"rgb(220, 220, 220)"}}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Lager-Appen</Text>
          <View style={styles.center}>
            <Image source={warehouse} style={{ width: 320, height: 240 }} />
          </View>
          <View style={styles.center}>
            <Text style={styles.heading}>
                Lagerförteckning
            </Text>
          </View>
          <View style={styles.center}>
            <StockList />
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(80, 80, 80)'
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  title: {
    color: 'rgb(200, 120, 120)',
    fontSize: 42,
    padding: 15
  },
  heading: {
    color: 'rgb(200, 250, 200)',
    fontSize: 40
  }
});
