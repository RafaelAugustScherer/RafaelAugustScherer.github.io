import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCover from '../components/AlbumCover';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      albumInfo: undefined,
      musics: [],
      favMusics: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.handleLoading();
    const { match } = this.props;
    const { id } = match.params;
    const musics = await getMusics(id);
    const favMusics = await getFavoriteSongs();

    this.handleMusics(musics, favMusics);
    this.handleLoading();
  };

  handleLoading = () => this
    .setState((prevState) => ({ isLoading: !prevState.isLoading }));

  handleMusics = (musics, favMusics) => {
    const cpMusics = [...musics];
    const albumInfo = cpMusics.shift();

    this.setState({ albumInfo, musics: cpMusics, favMusics });
  };

  isFavorite = (trackName) => {
    const { favMusics } = this.state;
    if (favMusics !== undefined && favMusics.length > 0) {
      return !!favMusics.find((song) => song.trackName === trackName);
    }
    return false;
  };

  handleFavorite = async (track) => {
    this.handleLoading();
    let { favMusics } = this.state;

    if (favMusics.some(({ trackName }) => trackName === track.trackName)) {
      favMusics = favMusics.filter(({ trackName }) => trackName !== track.trackName);
      await removeSong(track);
    } else {
      favMusics.push(track);
      await addSong(track);
    }
    this.setState({ favMusics });
    this.handleLoading();
  };

  render() {
    const { musics, albumInfo, isLoading } = this.state;
    const { handleFavorite, isFavorite } = this;
    return (
      <div data-testid="page-album" className="page-album">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {albumInfo && <AlbumCover { ...albumInfo } />}
            <div className="album-musics">
              {musics.map((props, idx) => (
                <MusicCard
                  key={ idx }
                  { ...props }
                  handleFavorite={ handleFavorite }
                  isFavorite={ isFavorite }
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
