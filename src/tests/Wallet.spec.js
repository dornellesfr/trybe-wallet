import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import render from './helpers/renderWithRouterAndRedux';
import mockData from './helpers/mockData';

describe('<Wallet />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        ...mockData,
      }),
    });
  });

  it('should verify the elements in the screen', () => {
    render(<App />, undefined, '/carteira');

    const initialTotalValue = screen.getByText(/0\.00/i);
    const value = screen.getByTestId('value-input');
    const description = screen.getByRole('textbox');
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(initialTotalValue).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(addExpense).toBeInTheDocument();
  });
  it('should verify the elements in screen after click in add new expense', async () => {
    render(<App />, undefined, '/carteira');

    const initialTotalValue = screen.getByText(/0\.00/i);
    const value = screen.getByTestId('value-input');
    const description = screen.getByRole('textbox');
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(initialTotalValue, '10');
    userEvent.type(value);
    userEvent.type(description, 'Dinheiro gasto');
    userEvent.click(addExpense);

    await waitFor(() => {
      expect(screen.getByText(/Alimentação/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Dinheiro gasto/i)).toBeInTheDocument();
    });
  });
  // expect(fetch).toBeCalledTimes(2);
});
