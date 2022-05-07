import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Base, Forms, Typography, Unique } from "../../styles"
import invoiceModel from "../../models/invoices";
import Invoice from '../../interfaces/invoice';

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

export default function DeliveryForm({ route, navigation }) {
  let { order } = route.params;
  const [invoice, setInvoice] = useState<Partial<Invoice>>({});

  useEffect(async () => {
    setInvoice({ ...order, order_id: order.id })
  }, []);

  async function addDelivery() {
    await invoiceModel.pickInvoice(invoice, order)

    navigation.navigate("Väntande fakturor", { reload: true });
  }

  let price = 0

  order.order_items.forEach(product => {
    price += product.amount * product.price
  });

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Typography.header2 }, { ...Base.marginTen }]}>Ny inleverans</Text>

      <View style={{ ...Base.marginTen }}>
        <Text style={[{ ...Typography.label }, { ...Base.marginLeft }]}>Namn</Text>
        <TextInput
          style={{ ...Forms.input }}
          value={order.name}
          editable={false}
        />
      </View>
      <View style={{ ...Base.marginTen }}>
        <Text style={[{ ...Typography.label }, { ...Base.marginLeft }]}>Totala Pris</Text>
        <TextInput
          style={{ ...Forms.input }}
          value={price.toString()}
          editable={false}
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