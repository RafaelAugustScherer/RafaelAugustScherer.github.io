import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class EditDeleteButton extends Component {
  render() {
    const { id, edit, deleteExpenseAction } = this.props;

    return (
      <>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ edit }
        >
          <FaPencilAlt />
        </button>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => deleteExpenseAction(id) }
        >
          <FaTrashAlt />
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseAction: (id) => dispatch(deleteExpense(id)),
});

export default connect(null, mapDispatchToProps)(EditDeleteButton);

EditDeleteButton.propTypes = {
  deleteExpenseAction: PropTypes.func,
}.isRequired;
