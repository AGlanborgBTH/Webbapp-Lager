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

  useEffect(() => {
    productModel.getProducts().then(setProducts)
  }, []);

  const itemsList = products.map((prod, index) => {
    productsHash[prod.id] = prod;
    return <Picker.Item style={{ ...Forms.pickerItem }} key={index} label={prod.name} value={prod.id} />;
  });

  return (
    <Picker
      style={{ ...Forms.picker }}
      selectedValue={props.currentDelivery?.product_id}
      onValueChange={(itemValue) => {
        props.setCurrentDelivery({ ...props.currentDelivery, product_id: itemValue });
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
    <View style={[{ ...Forms.buttonContainer }, { ...Base.marginTen }]}>
      {Platform.OS === "android" && (
        <Button onPress={showDatePicker} title="Visa datumväljare" />
      )}
      {(show || Platform.OS === "ios") && (
        <DateTimePicker
          onChange={(event, date) => {
            setDropDownDate(date);

            props.setCurrentDelivery({
              ...props.currentDelivery,
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

export default function DeliveryForm({ navigation, setProducts, setDelivery }) {
  const [currentDelivery, setCurrentDelivery] = useState<Partial<Delivery>>({})
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  async function addDelivery() {
    await deliveryModel.addDelivery(currentDelivery);

    const updatedProduct = {
      ...currentProduct,
      stock: (currentProduct.stock || 0) + (currentDelivery.amount || 0)
    };

    await productModel.putProduct(updatedProduct);

    setDelivery(await deliveryModel.getDelivery())
    setProducts(await productModel.getProducts());
    navigation.navigate("Inleverans lista", { reload: true });
  }

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Typography.header2 }, { ...Base.marginTen }]}>Ny inleverans</Text>

      <View style={{ ...Base.marginTen }}>
        <Text style={[{ ...Typography.label }, { ...Base.marginLeft }]}>Produkt</Text>
        <ProductDropDown
          currentDelivery={currentDelivery}
          setCurrentDelivery={setCurrentDelivery}
          setCurrentProduct={setCurrentProduct}
        />
      </View>
      <View style={{ ...Base.marginTen }}>
        <Text style={[{ ...Typography.label }, { ...Base.marginLeft }]}>Antal</Text>
        <TextInput
          style={{ ...Forms.input }}
          onChangeText={(content: string) => {
            setCurrentDelivery({ ...currentDelivery, amount: parseInt(content) })
          }}
          value={currentDelivery?.amount?.toString()}
          keyboardType="numeric"
        />
      </View>
      <View style={{ ...Base.marginTen }}>
        <Text style={{ ...Typography.label }}>Datum</Text>
        <TextInput
          style={{ ...Forms.input }}
          value={currentDelivery?.delivery_date?.toString()}
          editable={false}
        />
        <DateDropDown
          currentDelivery={currentDelivery}
          setCurrentDelivery={setCurrentDelivery}
        />
      </View>
      <View style={{ ...Base.marginTen }}>
        <Text style={{ ...Typography.label }}>Kommentar</Text>
        <TextInput
          style={{ ...Forms.input }}
          onChangeText={(content: string) => {
            setCurrentDelivery({ ...currentDelivery, comment: content })
          }}
          value={currentDelivery?.comment}
        />
      </View>
      <View style={{ ...Base.marginTen }}>
        <View style={{ ...Forms.buttonContainer }}>
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