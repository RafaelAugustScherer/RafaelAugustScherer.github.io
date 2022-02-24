import React from 'react';
import PropTypes from 'prop-types';
import CategoriesCard from './CategoriesCard';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCategories: [],
    };
  }

  componentDidMount = () => this.getCategories();

  getCategories = async () => {
    const categories = await getCategories();
    this.setState({ allCategories: categories });
  };

  render() {
    const { allCategories } = this.state;
    const { onChange } = this.props;

    return (
      <div className="categories form-control">
        {allCategories.map((elem) => (
          <CategoriesCard
            key={ elem.id }
            categorie={ elem.name }
            id={ elem.id }
            onChange={ onChange }
          />
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  onChange: PropTypes.func,
}.isRequired;

export default Categories;
