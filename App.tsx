import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from "react-native-flash-message";
import Home from "./components/home/Product";
import Pick from "./components/pick/Order";
import Deliveries from "./components/delivery/Deliveries";
import Invoices from "./components/invoices/Invoices";
import Dispatch from "./components/dispatch/Dispatch";
import Auth from "./components/auth/Auth"
import Reset from "./components/Reset";
import productModel from "./models/products"
import orderModel from "./models/orders"
import deliveryModel from "./models/deliveries"
import invoicesModule from "./models/invoices"
import authModel from "./models/auth"
import { Base, Forms, Typography, Unique } from "./styles"
import Product from "./interfaces/product"
import Delivery from "./interfaces/delivery"
import Order from "./interfaces/order"
import Invoice from "./interfaces/invoice"

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
  const [products, setProducts] = useState<Partial<Product[]>>([]);
  const [orders, setOrders] = useState<Partial<Order[]>>([]);
  const [delivery, setDelivery] = useState<Partial<Delivery[]>>([]);
  const [invoices, setInvoices] = useState<Partial<Invoice[]>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    productModel.getProducts().then(setProducts)
    orderModel.getOrders().then(setOrders)
    deliveryModel.getDelivery().then(setDelivery)
    invoicesModule.getInvoices().then(setInvoices)
    authModel.loggedIn().then(setIsLoggedIn)
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
              orders={orders}
              setOrders={setOrders}
              products={products}
              setProducts={setProducts}
            />}
          </Tab.Screen>
          <Tab.Screen name="Leverans">
            {() => <Dispatch
              orders={orders}
              setOrders={setOrders}
            />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
              {() => <Invoices
                orders={orders}
                setOrders={setOrders}
                invoices={invoices}
                setInvoices={setInvoices}
              />}
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
              delivery={delivery}
              setDelivery={setDelivery}
            />}
          </Tab.Screen>
          <Tab.Screen name="Reset">
            {(screenProps) => <Reset
              {...screenProps}
              setProducts={setProducts}
              setOrders={setOrders}
              setDelivery={setDelivery}
              setIsLoggedIn={setIsLoggedIn}
            />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}