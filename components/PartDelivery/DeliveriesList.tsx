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

  const oldListOfDeliveries = allDeliveries.map((delivery, index) => {
    return <View style={[{ ...Base.marginTen }, { ...Base.box }, { ...Unique.delList }]} key={index}>
      <Text style={[{ ...marginLeft }, { ...Typography.normal }]}>
        {delivery.product_name} - {delivery.amount}
      </Text>
      <View style={{ ...Unique.divide }}></View>
      <Text style={{ ...Typography.normal }}>
        {delivery.comment}
      </Text>
    </View>;
  });

  const newListOfDeliveries = allDeliveries.map((delivery, index) => {
    return <View style={[{ ...Base.box }, { ...Base.boxMargin }]} key={index}>
      <View style={[{ ...Base.stackItem }, { ...Unique.bluer },]}>
        <Text style={{ ...Typography.stackText }}>
          Product name
        </Text>
        <Text style={{ ...Typography.stackTextValue }}>
          {delivery.product_name}
        </Text>
      </View>
      <View style={[{ ...Base.stackItem }]}>
        <Text style={{ ...Typography.stackText }}>
          Amount
        </Text>
        <Text style={{ ...Typography.stackTextValue }}>
          {delivery.amount}
        </Text>
      </View>
      <View style={{ ...Unique.divide }} />
      <View style={{ ...Base.paddingTen }} >
        <Text style={{ ...Typography.normal }}>
          {delivery.comment}
        </Text>
      </View>
    </View>
  });

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Typography.evenHeader }, { ...Base.boxMargin }]}>
        Inleveranser
      </Text>
      {newListOfDeliveries}
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