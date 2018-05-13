import React, { Component } from 'react';
import proptypes from 'prop-types';

import { graphql, compose } from 'react-apollo';

import { MdAdd } from 'react-icons/lib/md';
import { MdEdit } from 'react-icons/lib/md/index';
import Button from '../../common/components/Button';

import {
  UpsertCategoryQuery,
  CreateCategoryQueryOptions,
} from '../../../graphql/mutations';

import { ListAllCategoriesQuery } from '../../../graphql/queries';

import '../styles/CreateCategory.css';
import { FormattedMessage } from 'react-intl';

class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      id: '',
      name: '',
    };

    this.state = { ...this.initialState };

    this.upsertCategory = this.upsertCategory.bind(this);
  }

  componentWillReceiveProps({ id, name }) {
    this.setState({
      id,
      name,
    });
  }

  async upsertCategory() {
    const { id, name } = this.state;

    await this.props.upsertCategory({ categoryId: id, name });

    this.props.closeModal();
    this.setState(this.initialState);
  }

  render() {
    if (this.props.data.loading) {
      return null;
    }

    return (
      <div className="CreateCategory-container">
        <label className="CreateCategory-label">
          <FormattedMessage id="category_name" />
          <input
            className="CreateCategory-input"
            value={this.state.name}
            placeholder="..."
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        {this.state.name && (
          <Button
            color="#1abc9c"
            callback={this.upsertCategory}
            icon={this.props.editing ? <MdEdit size={18} /> : <MdAdd size={18} />}
            label={
              this.props.editing
                ? <FormattedMessage id="edit" />
                : <FormattedMessage id="add" />
            }
          />
        )}
      </div>
    );
  }
}

CreateCategory.proptypes = {
  id: proptypes.string,
  name: proptypes.string,
  editing: proptypes.bool,
  closeModal: proptypes.func.isRequired,
};

CreateCategory.defaultProps = {
  name: '',
  editing: false,
};

export default compose(
  graphql(ListAllCategoriesQuery),
  graphql(UpsertCategoryQuery, CreateCategoryQueryOptions),
)(CreateCategory);
