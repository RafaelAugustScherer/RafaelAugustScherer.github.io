import React, { useState } from 'react';
import { useHistory } from 'react-router';

function Login() {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const areFieldsValid = () => {
    const { email, password } = login;
    const emailRegex = /[a-z0-9]*@[a-z0-9]*\.[a-z]{2,3}/i;

    const MIN_CHARACTERS = 6;

    return password.length > MIN_CHARACTERS
    && emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    const { email } = login;
    e.preventDefault();

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/comidas');
  };

  return (
    <div className="container-login">
      <h1 className="title-page">Comes & Bebes</h1>
      <main className="container">
        <h3>Login</h3>
        <form onSubmit={ handleSubmit }>
          <div className="input-field">
            <input
              data-testid="email-input"
              type="text"
              placeholder="Email"
              onChange={ ({ target: { value } }) => setLogin({ ...login, email: value }) }
              value={ login.email }
            />
            <div className="underline" />
          </div>
          <div className="input-field">
            <input
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              onChange={
                ({ target: { value } }) => setLogin({ ...login, password: value })
              }
              value={ login.password }
            />
            <div className="underline" />
          </div>
          <button
            data-testid="login-submit-btn"
            type="submit"
            disabled={ !areFieldsValid() }
          >
            Continuar
          </button>
        </form>
        <div className="footer">
          <span>Ou Conecte Com Uma Rede Social</span>
          <div className="social-fields">
            <div className="social-field twitter">
              <a href="#">
                <i className="fab fa-twitter" />
                Entrar com Twitter
              </a>
            </div>
            <div className="social-field facebook">
              <a href="#">
                <i className="fab fa-facebook-f" />
                Entrar com Facebook
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
