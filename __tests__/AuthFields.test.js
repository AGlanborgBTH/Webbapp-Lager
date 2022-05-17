import { render, fireEvent } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

let auth = {}

const setAuth = (newAuth) => {auth = newAuth}

const mockSubmit = jest.fn()

const navigation = () => false

test('testing authfield for login', async () => {
    const title = "Logga in"

    const { getAllByText, getByTestId, getAllByA11yLabel } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);

    const titleElements = await getAllByText(title);

    expect(titleElements.length).toBe(2);

    const emailField = await getByTestId("email-field")

    expect(emailField).toBeDefined()

    const passwordField = await getByTestId("password-field")

    expect(passwordField).toBeDefined()

    const a11yLabel = `${title} genom att trycka`

    const submitButton = getAllByA11yLabel(a11yLabel)

    expect(submitButton).toBeDefined()

    const fakeEmail = "dbwebb@email.com"

    fireEvent.changeText(emailField, fakeEmail)

    expect(auth?.email).toEqual(fakeEmail)

    const fakePassword = "Pass"

    fireEvent.changeText(passwordField, fakePassword)

    expect(auth?.password).toEqual(fakePassword)

    fireEvent.press(submitButton)

    expect(mockSubmit).toHaveBeenCalled()
});