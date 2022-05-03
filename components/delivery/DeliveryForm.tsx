import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Base, Forms, Typography, Unique } from "../../styles"
import productModel from "../../models/products";
import deliveryModel from '../../models/deliveries'
import Delivery from '../../interfaces/delivery';
import Product from '../../interfaces/product';


function ProductDropDown(props) {
  const [products, setProducts] = useState<Partial<Product[]>>([]);
  let productsHash: any = {};

  useEffect(async () => {
    setProducts(await productModel.getProducts());
  }, []);

  const itemsList = products.map((prod, index) => {
    productsHash[prod.id] = prod;
    return <Picker.Item style={{ ...Forms.pickerItem }} key={index} label={prod.name} value={prod.id} />;
  });

  return (
    <Picker
      style={{ ...Forms.picker }}
      selectedValue={props.delivery?.product_id}
      onValueChange={(itemValue) => {
        props.setDelivery({ ...props.delivery, product_id: itemValue });
        props.setCurrentProduct(productsHash[itemValue]);
      }}>
      {itemsList}
    </Picker>
  );
}

function DateDropDown(props) {
  const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
  const [show, setShow] = useState<Boolean>(false);

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={[{ ...Forms.buttonConatiner }, { ...Base.marginTen }]}>
      {Platform.OS === "android" && (
        <Button onPress={showDatePicker} title="Visa datumväljare" />
      )}
      {(show || Platform.OS === "ios") && (
        <DateTimePicker
          onChange={(event, date) => {
            setDropDownDate(date);

            props.setDelivery({
              ...props.delivery,
              delivery_date: date.toLocaleDateString('se-SV'),
            });

            setShow(false);
          }}
          value={dropDownDate}
        />
      )}
    </View>
  );
}

export default function DeliveryForm({ navigation, setProducts }) {
  const [delivery, setDelivery] = useState<Partial<Delivery>>({});
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  async function addDelivery() {
    await deliveryModel.addDelivery(delivery);

    const updatedProduct = {
      ...currentProduct,
      stock: (currentProduct.stock || 0) + (delivery.amount || 0)
    };

    await productModel.putProduct(updatedProduct);

    setProducts(await productModel.getProducts());
    navigation.navigate("List", { reload: true });
  }

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Typography.evenHeader }, { ...Base.marginTen }]}>Ny inleverans</Text>

      <View style={{ ...Base.marginTen }}>
        <Text style={[{ ...Typography.label }, { ...Base.marginLeft }]}>Produkt</Text>
        <ProductDropDown
          delivery={delivery}
          setDelivery={setDelivery}
          setCurrentProduct={setCurrentProduct}
        />
      </View>
      <View style={{ ...Base.marginTen }}>
        <Text style={[{ ...Typography.label }, { ...Base.marginLeft }]}>Antal</Text>
        <TextInput
          style={{ ...Forms.input }}
          onChangeText={(content: string) => {
            setDelivery({ ...delivery, amount: parseInt(content) })
          }}
          value={delivery?.amount?.toString()}
          keyboardType="numeric"
        />
      </View>
      <View style={{ ...Base.marginTen }}>
        <Text style={{ ...Typography.label }}>Datum</Text>
        <TextInput
          style={{ ...Forms.input }}
          value={delivery?.delivery_date?.toString()}
          editable={false}
        />
        <DateDropDown
          delivery={delivery}
          setDelivery={setDelivery}
        />
      </View>
      <View style={{ ...Base.marginTen }}>
        <Text style={{ ...Typography.label }}>Kommentar</Text>
        <TextInput
          style={{ ...Forms.input }}
          onChangeText={(content: string) => {
            setDelivery({ ...delivery, comment: content })
          }}
          value={delivery?.comment}
        />
      </View>
      <View style={{ ...Base.marginTen }}>
        <View style={{ ...Forms.buttonConatiner }}>
          <Button
            title="Skapa inleverans"
            onPress={() => {
              addDelivery();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};