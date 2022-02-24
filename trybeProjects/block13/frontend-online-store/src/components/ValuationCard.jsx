import React from 'react';
import PropTypes from 'prop-types';

class ValuationCard extends React.Component {
  render() {
    const { valuationInfo } = this.props;
    const { email, rating, valuation } = valuationInfo;

    return (
      <div>
        <h3>{ email }</h3>
        <p>{ rating }</p>
        <p>{ valuation }</p>
      </div>
    );
  }
}

ValuationCard.propTypes = {
  valuationInfo: PropTypes.shape({
    email: PropTypes.string,
    rating: PropTypes.string,
    valuation: PropTypes.string,
  }).isRequired,
};

export default ValuationCard;
