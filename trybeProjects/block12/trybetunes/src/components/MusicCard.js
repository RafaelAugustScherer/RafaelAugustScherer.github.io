import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

class MusicCard extends Component {
  render() {
    const { trackId, trackName, previewUrl, handleFavorite, isFavorite } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId } className="favorite-input">
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => handleFavorite(this.props) }
            checked={ isFavorite(trackName) }
          />
          Favorita
        </label>
        {isFavorite(trackName) ? (
          <FaHeart
            onClick={ () => handleFavorite(this.props) }
            className="favorited-icon"
          />
        ) : (
          <FaRegHeart
            onClick={ () => handleFavorite(this.props) }
            className="favorite-icon"
          />
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
