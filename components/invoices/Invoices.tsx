import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import invoicesModule from "../../models/invoices"

export default function InvoicesList({ route, navigation }) {
  let { reload } = route.params || false;
  const [invoices, setInvoices] = useState([]);

  if (reload) {
    reloadInvoices();
  }

  async function reloadInvoices() {
    setInvoices(await invoicesModule.getInvoices());
  }

  useEffect(() => {
    reloadInvoices();
  }, []);

  const newListOfDeliveries = invoices.map((invoice, index) => {
    return <View style={[{ ...Base.stack }, { ...Base.boxMargin }]} key={index}>
      <View style={[{ ...Base.stackItem }, { ...Unique.darker },]}>
        <Text style={[{ ...Typography.stackText }]}>
          Name
        </Text>
        <Text style={{ ...Typography.stackTextValue }}>
          {invoice.name}
        </Text>
      </View>
      <View style={[{ ...Base.stackItem }]}>
        <Text style={[{ ...Typography.stackText }]}>
          Total price
        </Text>
        <Text style={{ ...Typography.stackTextValue }}>
          {invoice.total_price}
        </Text>
      </View>
    </View>
  });

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Typography.header2 }, { ...Base.boxMargin }]}>
        Fakturor
      </Text>
      {newListOfDeliveries}
    </ScrollView>
  );
};