import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import delivery from "../../models/deliveries"

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

  const newListOfDeliveries = allDeliveries.map((delivery, index) => {
    return <View style={[{ ...Base.stack }, { ...Base.boxMargin }]} key={index}>
      <View style={[{ ...Base.stackItem }, { ...Unique.darker },]}>
        <Text style={[{ ...Typography.stackText }]}>
          Product
        </Text>
        <Text style={{ ...Typography.stackTextValue }}>
          {delivery.product_name}
        </Text>
      </View>
      <View style={[{ ...Base.stackItem }]}>
        <Text style={[{ ...Typography.stackText }]}>
          Amount
        </Text>
        <Text style={{ ...Typography.stackTextValue }}>
          {delivery.amount}
        </Text>
      </View>
      <View style={{ ...Base.paddingTen }} >
        <Text style={{ ...Typography.normal }}>
          {delivery.comment}
        </Text>
      </View>
      <View style={{ ...Unique.divide }} />
    </View>
  });

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Typography.header2 }, { ...Base.boxMargin }]}>
        Inleveranser
      </Text>
      {newListOfDeliveries}
      <View style={[{ ...Forms.slimButton }, { ...Base.marginTen }]}>
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