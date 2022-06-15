import { render, fireEvent } from '@testing-library/react-native';
import InvoiceForm from '../components/invoices/InvoiceForm';

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
}));

let invoices = {}

const setInvoices = (newinvoices) => { invoices = newinvoices }

const mockSubmit = jest.fn()

const route = {
  params: {
    order: {
      "id": 1,
      "name": "Anders Andersson",
      "address": "Andersgatan 1",
      "zip": "12345",
      "city": "Anderstorp",
      "country": "Sweden",
      "status": "Ny",
      "status_id": 400,
    "order_items": [
        {
          "product_id": 1,
          "amount": 2,
          "article_number": "1214-RNT",
          "name": "Skruv M14",
          "description": "Skruv M14, värmförsinkad",
          "specifiers": "{'length' : '60mm', 'width' : '14mm'}",
          "stock": 12,
          "location": "A1B4",
          "price": 10
        }
      ]
    }
  }
}

test('testing invoiceForm for adding invoices', async () => {
  const { getByTestId, getByA11yLabel } = render(<InvoiceForm
    route={route}
    invoices={invoices}
    setInvoices={setInvoices}
    submit={mockSubmit}
  />);

  const nameField = await getByTestId("name-field")

  expect(nameField).toBeDefined()

  const priceField = await getByTestId("price-field")

  expect(priceField).toBeDefined()

  const dateField = await getByTestId("date-field")

  expect(dateField).toBeDefined()

  const submitButton = getByA11yLabel("Skapa inleverans")

  expect(submitButton).toBeDefined()

  const fakeDate = "06/08/22"

  fireEvent.changeText(dateField, fakeDate)

  expect(invoices?.due_date).toEqual("06/08/22")

  fireEvent.press(getByA11yLabel("Skapa inleverans"))

  expect(mockSubmit).toHaveBeenCalled()
});