import React, { Component } from 'react';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favMusics: [],
    };
  }

  componentDidMount = async () => {
    this.handleLoading();

    const favMusics = await getFavoriteSongs();
    this.handleMusics(favMusics);

    this.handleLoading();
  };

  handleMusics = (favMusics) => this.setState({ favMusics });

  handleLoading = () => this
    .setState((prevState) => ({ isLoading: !prevState.isLoading }));

  handleFavorite = async (track) => {
    this.handleLoading();
    let { favMusics } = this.state;

    favMusics = favMusics.filter(({ trackName }) => trackName !== track.trackName);
    this.setState({ favMusics });
    await removeSong(track);

    this.handleLoading();
  };

  render() {
    const { favMusics, isLoading } = this.state;
    const { handleFavorite } = this;
    return (
      <div data-testid="page-favorites" className="page-favorites">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {favMusics.map((props, idx) => (
              <MusicCard
                key={ idx }
                { ...props }
                isFavorite={ () => true }
                handleFavorite={ handleFavorite }
              />
            ))}
          </>
        )}
      </div>
    );
  }
}

export default Favorites;
