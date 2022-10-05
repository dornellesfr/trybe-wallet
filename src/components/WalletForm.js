import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../mainStyle.css';
import { editAprove,
  fetchExpenses,
  fetchTypesCoin,
  setTotalValue } from '../redux/actions';
import fetchApi from '../services/fetchApi';

const Alimentacao = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: Alimentacao,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTypesCoin());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleClickAdd = async () => {
    const { dispatch } = this.props;
    const exchangeRates = await fetchApi();
    delete exchangeRates.USDT;
    const { id, value, description, currency, method, tag } = this.state;
    this.setState({
      id: id + 1,
    });
    dispatch(fetchExpenses({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    }));

    const sum = parseFloat(value * exchangeRates[currency].ask).toFixed(2);

    dispatch(setTotalValue(sum));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
    });
  };

  handleClickEdit = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expEdit = expenses.find(({ id }) => id === idToEdit);
    expEdit.currency = currency;
    expEdit.description = description;
    expEdit.method = method;
    expEdit.tag = tag;
    expEdit.value = value;

    let counter = 0;
    expenses.forEach(({ value: newValue, exchangeRates, currency: NewCurrency }) => {
      const cambio = Number(exchangeRates[NewCurrency].ask);
      const values = Number(newValue);
      counter += values * cambio;
    });

    dispatch(editAprove(expEdit, false, counter));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentacao,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    const tags = [Alimentacao, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const buttonAddExpense = (
      <button
        type="button"
        onClick={ this.handleClickAdd }
      >
        Adicionar despesa
      </button>
    );
    const buttonEditExpense = (
      <button
        type="button"
        onClick={ this.handleClickEdit }
      >
        Editar despesa
      </button>
    );
    return (
      <div className="main">
        <input
          name="value"
          type="number"
          data-testid="value-input"
          onChange={ this.handleChange }
          value={ value }
        />
        <input
          name="description"
          type="text"
          data-testid="description-input"
          onChange={ this.handleChange }
          value={ description }
        />

        <label htmlFor="currency">
          <select
            name="currency"
            data-testid="currency-input"
            id="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            { currencies.map((coin, index) => (
              <option
                id="currency"
                key={ index }
                value={ coin }
              >
                { coin }
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="pay-method">
          <select
            name="method"
            data-testid="method-input"
            id="pay-method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option
              id="pay-method"
              value="Dinheiro"
            >
              Dinheiro
            </option>
            <option
              id="pay-method"
              value="Cartão de crédito"
            >
              Cartão de crédito
            </option>
            <option
              id="pay-method"
              value="Cartão de débito"
            >
              Cartão de débito
            </option>
          </select>
        </label>

        <label htmlFor="tag">
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            { tags.map((tagValue) => (
              <option
                id="tag"
                key={ tagValue }
                value={ tagValue }
              >
                { tagValue }
              </option>
            ))}
          </select>
        </label>
        {
        // botão de adicionar / editar despesa.
          editor ? buttonEditExpense : buttonAddExpense
        }
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  editor: store.wallet.editor,
  expenses: store.wallet.expenses,
  idToEdit: store.wallet.idToEdit,
  totalValue: store.wallet.totalValue,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(String).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
