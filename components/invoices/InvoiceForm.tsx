import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Base, Forms, Typography, Unique } from "../../styles"
import invoiceModel from "../../models/invoices";
import orderModel from '../../models/orders'
import Order from '../../interfaces/order';
import Invoice from '../../interfaces/invoice';


function InvoiceDropDown(props) {
  const [orders, setOrders] = useState<Partial<Order[]>>([]);
  let ordersHash: any = {};

  useEffect(async () => {
    const ord = await orderModel.getOrders()
    const final = []

    ord.forEach((obj: object) => {
      if (obj["status_id"] == 200) {
        final.push(obj)
      }
    });

    setOrders(final);
  }, []);

  const ordersList = orders.map((order, index) => {
    ordersHash[order.id] = order;
    return <Picker.Item style={{ ...Forms.pickerItem }} key={index} label={order.name} value={order.id} />;
  });

  return (
    <Picker
      style={{ ...Forms.picker }}
      selectedValue={props.invoice?.id}
      onValueChange={(itemValue) => {
        props.setInvoice({ ...props.order, order_id: itemValue });
        props.setCurrentOrder(ordersHash[itemValue]);
      }}>
      {ordersList}
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

            props.setInvoice({
              ...props.invoice,
              due_date: date.toLocaleDateString('se-SV'),
            });

            setShow(false);
          }}
          value={dropDownDate}
        />
      )}
    </View>
  );
}

export default function DeliveryForm({ navigation }) {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({});
  const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

  async function addDelivery() {
    await invoiceModel.pickInvoice(invoice, currentOrder)

    navigation.navigate("Invoice list", { reload: true });
  }

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Typography.header2 }, { ...Base.marginTen }]}>Ny inleverans</Text>

      <View style={{ ...Base.marginTen }}>
        <Text style={[{ ...Typography.label }, { ...Base.marginLeft }]}>Produkt</Text>
        <InvoiceDropDown
          invoice={invoice}
          setInvoice={setInvoice}
          setCurrentOrder={setCurrentOrder}
        />
      </View>
      <View style={{ ...Base.marginTen }}>
        <Text style={{ ...Typography.label }}>Datum</Text>
        <TextInput
          style={{ ...Forms.input }}
          value={invoice?.due_date?.toString()}
          editable={false}
        />
        <DateDropDown
          invoice={invoice}
          setInvoice={setInvoice}
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