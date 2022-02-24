import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      isLoading: false,
      isSubmit: false,
    };
  }

  componentDidMount = async () => {
    this.handleLoading();

    const user = await getUser();
    this.handleUser(user);

    this.handleLoading();
  };

  handleUser = (user) => this.setState({ user });

  handleLoading = () => this
    .setState((prevState) => ({ isLoading: !prevState.isLoading }));

  areFieldsValid = () => {
    const { user } = this.state;
    const EMAIL_REGEX = /^[a-z0-9]*@[a-z0-9]*[.][a-z]{2,3}$/i;

    const areFilled = !Object.values(user).some((value) => value === '');
    const isEmailValid = EMAIL_REGEX.test(user.email);

    return !!(areFilled && isEmailValid);
  };

  onChange = ({ target: { name, value } }) => this
    .setState((state) => ({ user: { ...state.user, [name]: value } }));

  onSubmit = async (e) => {
    e.preventDefault();
    this.handleLoading();

    const { user } = this.state;
    await updateUser(user);

    this.handleLoading();
    this.setState({ isSubmit: true });
  };

  render() {
    const {
      user: { name, email, image, description },
      isLoading,
      isSubmit,
    } = this.state;

    const { onChange, onSubmit, areFieldsValid } = this;

    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        {isLoading ? (
          <Loading />
        ) : (
          <form>
            <div>
              {image ? (
                <img
                  src={ image }
                  alt="profile"
                  className="profile-image"
                  data-testid="profile-image"
                />
              ) : (
                <FaUserCircle className="profile-image" />
              )}
              <input
                type="text"
                data-testid="edit-input-image"
                name="image"
                onChange={ onChange }
                value={ image }
              />
            </div>
            <p>Nome:</p>
            <p>
              <input
                type="text"
                data-testid="edit-input-name"
                name="name"
                onChange={ onChange }
                value={ name }
              />
            </p>
            <p>E-mail:</p>
            <p>
              <input
                type="email"
                data-testid="edit-input-email"
                name="email"
                onChange={ onChange }
                value={ email }
              />
            </p>
            <p>Descrição:</p>
            <p>
              <input
                type="text"
                data-testid="edit-input-description"
                name="description"
                onChange={ onChange }
                value={ description }
              />
            </p>
            <button
              type="submit"
              data-testid="edit-button-save"
              onClick={ onSubmit }
              disabled={ !areFieldsValid() }
            >
              Salvar
            </button>
          </form>
        )}
        {isSubmit ? <Redirect to="/profile" /> : null}
      </div>
    );
  }
}

export default ProfileEdit;
