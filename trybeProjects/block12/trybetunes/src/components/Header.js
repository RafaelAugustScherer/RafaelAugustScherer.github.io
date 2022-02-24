import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      isLoading: false,
      isInnerPage: false,
    };
  }

  componentDidMount = async () => {
    this.handleLoading();
    await this.searchUser();
    this.handleLoading();
  };

  handleLoading = () => this
    .setState((prevState) => ({ isLoading: !prevState.isLoading }));

  searchUser = async () => {
    const user = await getUser();
    this.setState({ user });
  };

  isCurrent = (pageToCheck) => {
    const { currentPage } = this.props;
    const { isInnerPage } = this.state;
    const pageDivision = currentPage.split('/');
    if (pageDivision[2] && !isInnerPage) {
      this.setState({ isInnerPage: true });
    }

    return pageDivision[1] === pageToCheck
      ? 'selected'
      : '';
  };

  render() {
    const {
      user: { name, image },
      isLoading,
      isInnerPage,
    } = this.state;
    const { isCurrent } = this;
    const pages = ['Search', 'Favorites', 'Profile'];

    return (
      <div data-testid="header-component">
        {isLoading ? (
          <Loading />
        ) : (
          <header>
            <div>
              <img
                src={ `${isInnerPage ? '.' : ''}./assets/header-logo.png` }
                alt="logo"
                className="header-logo"
              />
              <div className="header-user">
                {image ? (
                  <img src={ image } alt="profile" className="profile-image" />
                ) : (
                  <FaUserCircle className="profile-image" />
                )}
                <span data-testid="header-user-name">{name}</span>
              </div>
            </div>
            <nav className="header-nav">
              {pages.map((pageName, idx) => {
                const minPageName = pageName.toLowerCase();

                return (
                  <Link
                    to={ `/${minPageName}` }
                    key={ idx }
                    data-testid={ `link-to-${minPageName}` }
                    className={ isCurrent(minPageName) }
                  >
                    {pageName}
                  </Link>
                );
              })}
            </nav>
          </header>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default Header;
