import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isLoading: false,
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

  render() {
    const {
      user: { name, email, image, description },
      isLoading,
    } = this.state;

    return (
      <div data-testid="page-profile" className="page-profile">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="profile-info">
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
              <button type="button" className="edit-profile-button">
                <Link to="/profile/edit">Editar perfil</Link>
              </button>
            </div>
            <p>Name:</p>
            <p className="profile-small">{name}</p>
            <p>E-mail:</p>
            <p className="profile-small">{email}</p>
            <p>Description:</p>
            <p className="profile-small">{description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
