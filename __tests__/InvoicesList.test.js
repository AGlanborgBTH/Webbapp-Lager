import { render } from '@testing-library/react-native';
import InvoicesList from '../components/invoices/InvoicesList';

jest.mock("@react-native-async-storage/async-storage", () => ({
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve()),
}));

const invoices = [
    {
        "id": 1,
        "order_id": 1,
        "name": "Anders Andersson",
        "address": "Andersgatan 1",
        "zip": "12345",
        "city": "Anderstorp",
        "country": "Sweden",
        "total_price": 100,
        "creation_date": "2019-02-13",
        "due_date": "2019-03-13"
    }
]

const setInvoices = () => false;

const route = { reload: false }

test('List should contain an invoice', async () => {
  const { getByText } = render(<InvoicesList route={route} invoices={invoices} setInvoices={setInvoices} />);

  const name = await getByText('Anders Andersson', { exact: false });
  const price = await getByText('100', { exact: false });
  const date = await getByText('2019-03-13', { exact: false });

  expect(name).toBeDefined();
  expect(price).toBeDefined();
  expect(date).toBeDefined();
});