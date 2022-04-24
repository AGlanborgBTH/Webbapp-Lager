import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import delivery from "../../models/deliveries"
import { marginLeft } from '../../styles/base';

export default function DeliveriesList({ route, navigation }) {
  let { reload } = route.params || false;
  const [allDeliveries, setAllDeliveries] = useState([]);

  if (reload) {
    reloadDeliveries();
  }

  async function reloadDeliveries() {
    setAllDeliveries(await delivery.getDelivery());
  }

  useEffect(() => {
    reloadDeliveries();
  }, []);

  const listOfDeliveries = allDeliveries.map((delivery, index) => {
    return <View style={[{ ...Base.marginTen }, { ...Base.box }, { ...Unique.delList }]} key={index}>
      <Text style={{ ...marginLeft }}>
        {delivery.product_name} - {delivery.amount}
      </Text>
      <View style={{ ...Unique.divide }}></View>
      <Text>
        {delivery.comment}
      </Text>
    </View>;
  });

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Typography.evenHeader }, { ...Base.marginLeft }]}>Inleveranser</Text>
      {listOfDeliveries}
      <View style={{ ...Forms.buttonConatiner }}>
        <Button
          title="Skapa ny inleverans"
          onPress={() => {
            navigation.navigate('Form');
          }}
        />
      </View>
    </ScrollView>
  );
};