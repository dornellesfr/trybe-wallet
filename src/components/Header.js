import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header className="navbar is-primary">
        <nav className="navbar-end">
          <p className="navbar-item" data-testid="email-field">
            { email }
          </p>

          <p className="navbar-item" data-testid="total-field">
            { totalValue }
          </p>

          <p className="navbar-item" data-testid="header-currency-field">
            BRL
          </p>

        </nav>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  totalValue: store.wallet.totalValue,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(Header);
