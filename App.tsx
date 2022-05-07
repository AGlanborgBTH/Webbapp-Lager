import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./components/home/Home";
import Pick from "./components/pick/Pick";
import Deliveries from "./components/delivery/Deliveries";
import Invoices from "./components/invoices/Invoices";
import Dispatch from "./components/dispatch/Dispatch";
import Auth from "./components/auth/Auth"
import Reset from "./components/Reset";
import authModel from "./models/auth"
import { Base, Forms, Typography, Unique } from "./styles"

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Lager": "home-outline",
  "Plock": "list-outline",
  "Inleverans": "clipboard-outline",
  "Leverans": "map-outline",
  "Logga in": "log-in-outline",
  "Faktura": "cash-outline",
  "Reset": "reload-circle-outline"
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
  }, []);

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
          <Tab.Screen name="Leverans">
            {() => <Dispatch
            />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
              {() => <Invoices />}
            </Tab.Screen> :
            <Tab.Screen name="Logga in">
              {() => <Auth
                setIsLoggedIn={setIsLoggedIn}
              />}
            </Tab.Screen>
          }
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
              setIsLoggedIn={setIsLoggedIn}
            />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}