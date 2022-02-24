import React, { Component } from 'react';
import AlbumCover from '../components/AlbumCover';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
      result: {
        status: undefined,
        name: '',
        albums: [],
      },
    };
  }

  onChange = ({ target: { className, value } }) => {
    this.setState({
      [className]: value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.handleLoading();

    const { name } = this.state;
    const albums = await searchAlbumsAPIs(name);
    const status = albums.length > 0;

    this.setState({
      name: '',
      result: {
        status,
        name,
        albums,
      },
    });
    this.handleLoading();
  };

  isNameValid = () => {
    const { name } = this.state;
    const MIN_NAME_LENGTH = 2;

    return name.length >= MIN_NAME_LENGTH;
  };

  handleLoading = () => this
    .setState((prevState) => ({ isLoading: !prevState.isLoading }));

  render() {
    const {
      name,
      isLoading,
      result: { status, name: resultName, albums },
    } = this.state;
    const { onChange, onSubmit, isNameValid } = this;

    return (
      <div data-testid="page-search" className="page-search">
        {isLoading ? (
          <Loading />
        ) : (
          <form className="search-form">
            <h2>Pesquisar</h2>
            <input
              type="text"
              onChange={ onChange }
              value={ name }
              className="name"
              data-testid="search-artist-input"
              placeholder="Artista, albúm ou banda..."
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ !isNameValid() }
              onClick={ onSubmit }
            >
              Pesquisar
            </button>
          </form>
        )}
        {status ? (
          <h2>
            Resultado de álbuns de:
            {' '}
            {resultName}
          </h2>
        ) : (
          status !== undefined && <p>Nenhum álbum foi encontrado</p>
        )}
        <div className="search-result">
          {albums.map((props, idx) => (
            <AlbumCover key={ idx } { ...props } />
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
