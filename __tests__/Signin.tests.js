import { render, fireEvent, cleanup } from '@testing-library/react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import App from '../App.js';
import Signin from '../screens/SignIn';
import { Provider } from 'react-redux';
import store from '../store.js';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('testing renderings', () => {
  afterEach(cleanup);

  test('renders username and password textInput components for Sign In page', () => {
    const { getAllByText, getAllByPlaceholderText } = render(
      <Provider store={store}>
        <Signin />
      </Provider>
    );
    const loginButton = getAllByText('Log In');
    const usernameField = getAllByPlaceholderText('Username');
    const passwordField = getAllByPlaceholderText('Password');
    expect(loginButton).toHaveLength(1);
    expect(usernameField).toHaveLength(1);
    expect(passwordField).toHaveLength(1);
  });
});

describe('test navigations', () => {
  test('navigates to signup page on signup button press', async () => {
    const { findByText, findAllByText, getAllByPlaceholderText } = render(
      <App />
    );
    const toSignUp = await findByText('Sign Up!');
    const signUpButton = await findAllByText('Sign Up!');
    expect(signUpButton).toHaveLength(1);
    fireEvent(toSignUp, 'press');
    const confirmPassword = await getAllByPlaceholderText('Confirm password');
    expect(confirmPassword).toHaveLength(1);
  });
});
