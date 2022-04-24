import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";
import Reset from "./components/Reset";
import { Base, Forms, Typography, Unique } from "./styles"

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Reset": "reload-circle-outline",
  "Inleverans": "clipboard-outline",
};

export default function App() {
  const [products, setProducts] = useState([]);

  return (
    <SafeAreaView style={{ ...Base.base }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'coral',
          tabBarInactiveTintColor: 'gray',
        })}
        >
          <Tab.Screen name="Lager">
            {() => <Home
              products={products}
              setProducts={setProducts}
            />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => <Pick
              products={products}
              setProducts={setProducts}
            />}
          </Tab.Screen>
          <Tab.Screen name="Inleverans">
            {() => <Deliveries
              products={products}
              setProducts={setProducts}
            />}
          </Tab.Screen>
          <Tab.Screen name="Reset">
            {(screenProps) => <Reset
              {...screenProps}
              setProducts={setProducts}
            />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}