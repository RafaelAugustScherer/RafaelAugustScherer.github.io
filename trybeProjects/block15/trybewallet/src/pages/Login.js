import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BiWallet } from 'react-icons/bi';
import { login } from '../actions';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isEmailValid: false,
      isPasswordValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value }, () => {
      this.validateEmail();
      this.validatePassword();
    });
  }

  validateEmail() {
    const { email } = this.state;
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+[.][a-z0-9]+$/i;
    this.setState({ isEmailValid: emailRegex.test(email) });
  }

  validatePassword() {
    const { password } = this.state;
    const MIN_LENGTH = 6;

    this.setState({ isPasswordValid: password.length >= MIN_LENGTH });
  }

  handleSubmit() {
    const { email, isEmailValid, isPasswordValid } = this.state;
    const { loginAction } = this.props;

    if (isEmailValid && isPasswordValid) {
      loginAction(email);
    }
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { email, password, isEmailValid, isPasswordValid } = this.state;

    return (
      <form className="login-form">
        <h2>
          <span>Trybe Wallet</span>
          <BiWallet />
        </h2>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          id="email"
          data-testid="email-input"
          onChange={ handleChange }
          value={ email }
        />
        <input
          type="password"
          placeholder="Senha"
          name="password"
          id="password"
          data-testid="password-input"
          onChange={ handleChange }
          value={ password }
        />
        <Link to="/carteira" onClick={ handleSubmit }>
          <button type="submit" disabled={ !isEmailValid || !isPasswordValid }>
            Entrar
          </button>
        </Link>
      </form>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginAction: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  loginAction: PropTypes.func,
}.isRequired;
