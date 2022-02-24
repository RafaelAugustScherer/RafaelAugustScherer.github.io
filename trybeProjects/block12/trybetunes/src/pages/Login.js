import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
      isUser: false,
    };
  }

  onChange = ({ target: { className, value } }) => {
    this.setState({
      [className]: value,
    });
  };

  onSubmit = async (e) => {
    const { name } = this.state;
    e.preventDefault();

    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({
      isLoading: false,
      isUser: true,
    });
  };

  isNameValid = () => {
    const { name } = this.state;
    const MIN_NAME_LENGTH = 3;

    return name.length >= MIN_NAME_LENGTH;
  };

  render() {
    const { name, isLoading, isUser } = this.state;
    const { onChange, onSubmit, isNameValid } = this;

    return (
      <div data-testid="page-login" className="page-login">
        {isUser ? <Redirect to="/search" /> : null}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <img src="./assets/logo.png" alt="logo" className="logo" />
            <form className="login-form">
              <input
                type="text"
                onChange={ onChange }
                value={ name }
                className="name"
                data-testid="login-name-input"
                placeholder="Nome"
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ !isNameValid() }
                onClick={ onSubmit }
              >
                Entrar
              </button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default Login;
