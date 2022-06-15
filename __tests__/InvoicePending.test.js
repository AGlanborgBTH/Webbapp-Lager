import { render } from '@testing-library/react-native';
import InvoicePending from '../components/invoices/InvoicePending';

const orders = [
  {
    "id": 1,
    "name": "Anders Andersson",
    "address": "Andersgatan 1",
    "zip": "12345",
    "city": "Anderstorp",
    "country": "Sweden",
    "status": "Fakturerad",
    "status_id": 600,
    "order_items": []
  },
  {
    "id": 2,
    "name": "Erik Erikson",
    "address": "Erikgatan 1",
    "zip": "12345",
    "city": "Eriktorp",
    "country": "Sweden",
    "status": "Skickad",
    "status_id": 400,
    "order_items": []
  },
  {
    "id": 3,
    "name": "Bengt Bengtson",
    "address": "Bengtgatan 1",
    "zip": "12345",
    "city": "Bengttorp",
    "country": "Sweden",
    "status": "Skickad",
    "status_id": 200,
    "order_items": []
  }
]

const setOrders = () => false;

const route = { reload: false }

test('List should contain an order', async () => {
  const { getByText } = render(<InvoicePending route={route} orders={orders} setOrders={setOrders} />);

  const erik = await getByText('Erik Erikson', { exact: false });

  let anders = null

  try {
    anders = await getByText('Anders Andersson', { exact: false });
  } catch {
    anders = null
  }

  let bengt = null

  try {
    bengt = await getByText('Bengt Bengtson', { exact: false });
  } catch {
    bengt = null
  }

  expect(erik).toBeDefined();
  expect(anders).toBeFalsy();
  expect(bengt).toBeFalsy();
});