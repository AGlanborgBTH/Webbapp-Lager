import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location'
import getCoordinates from "../../models/nominatim";
import orderModel from "../../models/orders"

export default function DispatchList({ route, navigation }) {
  let { order } = route.params;
  const [marker, setMarker] = useState(null);
  const [locationMarker, setLocationMarker] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const results = await getCoordinates(`${order.address}, ${order.city}`);

      setMarker(<Marker
        coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
        title={results[0].display_name}
      />);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});

      setLocationMarker(<Marker
        coordinate={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude
        }}
        title="Min plats"
        pinColor="blue"
      />);
    })();
  }, []);

  async function dispatchOrder() {
    const obj = {
      "id": order.id,
      "name": order.name,
      "status_id": 400
    }

    await orderModel.putOrder(obj)

    navigation.navigate('Leverans lista', { reload: true })
  }

  return (
    <ScrollView style={Base.base}>
      <View style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
        <View style={[{ ...Base.stackItem }, { ...Unique.bluer },]}>
          <Text style={[{ ...Typography.stackText }]}>
            Name
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {order.name}
          </Text>
        </View>
        <View style={[{ ...Base.stackItem }]}>
          <Text style={[{ ...Typography.stackText }]}>
            City
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {order.city}
          </Text>
        </View>
        <View style={[{ ...Base.stackItem }]}>
          <Text style={[{ ...Typography.stackText }]}>
            Address
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {order.address}
          </Text>
        </View>
        <View style={[{ ...Base.stackItem }]}>
          <Text style={[{ ...Typography.stackText }]}>
            Zip
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {order.zip}
          </Text>
        </View>
        <View style={[{ ...Base.stackItem }, { ...Base.container }]}>
          <MapView
            style={{ ...Base.map }}
            initialRegion={{
              latitude: 56.1612,
              longitude: 15.5869,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}>
            {Marker}
            {locationMarker}
          </MapView>
        </View>
        <View style={[{ ...Forms.slimButton }, { ...Base.marginTen }]}>
          <Button
            title={"Send order"}
            onPress={dispatchOrder}
          />
        </View>
      </View>
    </ScrollView>
  );
};