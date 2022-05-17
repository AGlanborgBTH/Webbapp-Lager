import { View, Text, Button, ScrollView } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import deliveryModel from "../../models/deliveries"

export default function DeliveriesList({ route, navigation, delivery, setDelivery }) {
  let { reload } = route.params || false;

  if (reload) {
    deliveryModel.getDelivery().then(setDelivery)
    route.params.reload = false
  }

  const ListOfDeliveries = delivery
    .map((content, index) => {
      return <View style={[{ ...Base.stack }, { ...Base.boxMargin }]} key={index}>
        <View style={[{ ...Base.stackItem }, { ...Unique.darker },]}>
          <Text style={[{ ...Typography.stackText }]}>
            Product
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {content.product_name}
          </Text>
        </View>
        <View style={[{ ...Base.stackItem }]}>
          <Text style={[{ ...Typography.stackText }]}>
            Amount
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {content.amount}
          </Text>
        </View>
        <View style={{ ...Base.paddingTen }} >
          <Text style={{ ...Typography.normal }}>
            {content.comment}
          </Text>
        </View>
        <View style={{ ...Unique.divide }} />
      </View>
    });

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Base.marginTen }, { ...Typography.header2 }]}>
        Inleveranser
      </Text>
      <View style={[{ ...Forms.slimButton }, { ...Base.marginTen }]}>
        <Button
          title="Skapa ny Inleverans"
          onPress={() => {
            navigation.navigate('Inleverans formulär');
          }}
        />
      </View>
      {ListOfDeliveries}
    </ScrollView>
  );
};