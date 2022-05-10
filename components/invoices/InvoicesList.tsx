import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from "react-native";
import { Base, Forms, Typography, Unique } from "../../styles"
import invoicesModule from "../../models/invoices"

export default function InvoicesList({ route, invoices, setInvoices }) {
  let { reload } = route.params || false;

  if (reload) {
    reloadInvoices();
    route.params.reload = false
  }

  async function reloadInvoices() {
    setInvoices(await invoicesModule.getInvoices());
  }

  useEffect(() => {
    reloadInvoices();
  }, []);

  const SentInvoices = invoices
    .map((invoice, index) => {
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

  return (
    <ScrollView style={Base.base}>
      <Text style={[{ ...Base.marginTen }, { ...Typography.header2 }]}>
        Skickade fakturor
      </Text>
      {SentInvoices.length ? SentInvoices : (
        <View style={[{ ...Base.stack }, { ...Base.boxMargin }]}>
          <View style={[{ ...Base.stackItem }, { ...Unique.darker }]}>
            <Text style={[{ ...Typography.stackText }]}>
              Inga skickade fakturor
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};