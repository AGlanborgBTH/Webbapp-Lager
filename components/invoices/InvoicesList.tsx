import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import invoicesModule from "../../models/invoices"
import orderModule from "../../models/orders"
import Order from "../../interfaces/order"

export default function InvoicesList({ route, navigation }) {
  let { reload } = route.params || false;
  const [invoices, setInvoices] = useState([]);
  const [orders, setOrders] = useState<Partial<Order[]>>([]);

  if (reload) {
    reloadInvoices();
  }

  async function reloadInvoices() {
    setInvoices(await invoicesModule.getInvoices());
    setOrders(await orderModule.getOrders());
  }

  useEffect(() => {
    reloadInvoices();
  }, []);

  const SentInvoices = invoices.map((invoice, index) => {
    return (
      <View style={[{ ...Base.stack }, { ...Base.boxMargin }]} key={index}>
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
        <View style={[{ ...Base.stackItem }]}>
          <Text style={[{ ...Typography.stackText }]}>
            Due date
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {invoice.due_date}
          </Text>
        </View>
      </View>
    )
  });

  const PendingInvoices = orders.filter((order) => order.status_id === 400).map((order, index) => {
    return (
      <View style={[{ ...Base.stack }, { ...Base.boxMargin }]} key={index}>
        <View style={[{ ...Base.stackItem }, { ...Unique.bluer },]}>
          <Text style={[{ ...Typography.stackText }]}>
            Name
          </Text>
          <Text style={{ ...Typography.stackTextValue }}>
            {order.name}
          </Text>
        </View>
        <View style={[{ ...Forms.slimButton }, { ...Base.marginTen }]}>
          <Button
            title={"View order"}
            onPress={() => {
              navigation.navigate('Faktura formulär', {
                order: order
              });
            }}
          />
        </View>
      </View>
    )
  });

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Base.marginTen }, { ...Typography.header2 }]}>
      Väntande fakturor
      </Text>
      {PendingInvoices.length ? PendingInvoices : (
        <View style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
          <View style={[{ ...Base.stackItem }, { ...Unique.darker }]}>
            <Text style={[{ ...Typography.stackText }]}>
              Inga väntande fakturor
            </Text>
          </View>
        </View>
      )}
      <Text style={[{ ...Base.marginTen }, { ...Typography.header2 }]}>
        Skickade fakturor
      </Text>
      {SentInvoices}
    </ScrollView>
  );
};