import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import render from './helpers/renderWithRouterAndRedux';

describe('<Login />', () => {
  it('shoul load a page login = "/"', () => {
    render(<App />);

    const loading = screen.getByRole('heading', { name: /login/i });
    expect(loading).toBeInTheDocument();
  });
  it('should button page to be enable', () => {
    render(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    userEvent.type(email, 'john@test.com');
    userEvent.type(password, '1235678');

    expect(button).toBeEnabled();
  });
  it('should button page redirect to "/carteira"', () => {
    const { history } = render(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'john@test.com');
    userEvent.type(password, '1235678');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
