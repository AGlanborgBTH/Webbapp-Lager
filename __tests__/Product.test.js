import { render } from '@testing-library/react-native';
import Product from '../components/home/Product';

jest.mock("../components/home/ProductList", () => "List");

test('header should exist containing text "Lagerförteckning"', async () => {
    const { getByText } = render(<Product />);
    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});