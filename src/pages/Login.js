import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      btnIsDisable: true,
    };
  }

  handleButton = () => {
    const { email, password } = this.state;
    const minLengthPassword = 5;
    const emailIsValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
    const passwordIsValid = password.length > minLengthPassword;
    const result = emailIsValid && passwordIsValid;
    this.setState({
      btnIsDisable: !result,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleButton());
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;
    const { dispatch } = this.props;
    dispatch(saveEmail(email));

    const { history } = this.props;
    history.push('/carteira');
  };

  render() {
    const { email, password, btnIsDisable } = this.state;
    const form = (
      <form
        className="box"
        style={ { display: 'flex',
          width: '33%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          flexDirection: 'column',
        } }
      >
        <input
          className="input is-medium mb-3 "
          type="email"
          name="email"
          onChange={ this.handleChange }
          data-testid="email-input"
          value={ email }
        />
        <input
          className="input is-medium mb-3"
          type="password"
          name="password"
          onChange={ this.handleChange }
          value={ password }
          data-testid="password-input"
        />
        <button
          className="button is-primary"
          type="submit"
          onClick={ this.handleSubmit }
          disabled={ btnIsDisable }
          style={ { display: 'flex' } }
        >
          Entrar
        </button>
      </form>
    );

    return (
      <div className="hero is-fullheight is-primary">
        <div className="hero-body">
          <div
            style={ { position: 'absolute', top: '15%', left: '0', width: '100%' } }
          >
            <h3
              className="is-size-3"
              style={ { display: 'inline-block',
                textAlign: 'center',
                width: '100%' } }
            >
              LOGIN
            </h3>
            <hr />
          </div>
          { form }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
