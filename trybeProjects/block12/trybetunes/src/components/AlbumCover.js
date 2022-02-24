import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCover extends Component {
  render() {
    const { artistName, collectionName, artworkUrl100, collectionId } = this.props;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        className="album-cover"
      >
        <div>
          <img src={ artworkUrl100 } alt="album-cover" />
          <p data-testid="album-name">{collectionName}</p>
          <p data-testid="artist-name">{artistName}</p>
        </div>
      </Link>
    );
  }
}

AlbumCover.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default AlbumCover;
