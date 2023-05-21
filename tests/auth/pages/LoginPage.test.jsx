import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();
jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    },
}));

//no se deben de sobreescribir todas las funciones, solo queremos sobrescribir el comportamiento del useDispatch
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(), //sobrescribimos el comportamiento del useDispatch, lo usamos para recibir una función y mandarla llamar
    //cuando llamamos el useDispatch regresa el valor de la función, es una función que regresa el llamado de esa función
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    //sirve para precargar un cierto estado en el store
    preloadedState: {
        auth: notAuthenticatedState
    }
});


describe('Pruebas en <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks());


    test('debe de mostrar el componente correctamente', () => {
        render(
            //tenemos que proveer el store
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>

        );
        //screen.debug();
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('botón de google debe de llamar el startGoogleSignIn', () => {
        render(
            //tenemos que proveer el store
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>

        );
        console.log(store.getState());
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn); //el botón esta deshabilitado y no funciona
        console.log(store.getState());
        expect(mockStartGoogleSignIn).toHaveBeenCalled();

    });

    test('submit debe de llamar startLoginWithEmailPassword', () => {
        const email = 'silvia@google.com';
        const password = '123456';
        render(
            //tenemos que proveer el store
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>

        );
        //const emailField = screen.getAllByRole('textbox', { name: 'correo' });
        //fireEvent.change(emailField, { target: { name: 'email', value: email } });
        const inputEmail = screen.getByPlaceholderText(/correo@google.com/i);
        fireEvent.input(inputEmail, { target: { value: email } });
        // const passwordField = screen.getByTestId('password');
        // fireEvent.change(passwordField, { target: { name: 'password', value: password } });
        const inputPassword = screen.getByPlaceholderText(/contraseña/i);
        fireEvent.input(inputPassword, { target: { value: password } });
        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);
        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email,
            password
        });
    });
});