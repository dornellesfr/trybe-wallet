import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decreaseValue, deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  excludeExpense = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter(({ id }) => (id !== Number(target.id)));
    dispatch(deleteExpense(newExpenses));
    let counter = 0;
    newExpenses.forEach(({ value, exchangeRates, currency }) => {
      const cambio = Number(exchangeRates[currency].ask);
      const values = Number(value);
      counter += values * cambio;
    });
    dispatch(decreaseValue(counter));
  };

  editTheExpense = (idTable) => {
    const { dispatch, expenses } = this.props;
    const getExpense = expenses.find(({ id }) => (id === Number(idTable)));
    dispatch(editExpense(getExpense, true));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(
            ({ id, description, tag, method, value, exchangeRates, currency }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ (exchangeRates[currency].ask * value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editTheExpense(id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    id={ id }
                    onClick={ this.excludeExpense }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ),
          ) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(String).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
