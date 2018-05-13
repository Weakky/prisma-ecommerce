import React, { Component } from 'react';
import proptypes from 'prop-types';
import Button from '../../common/components/Button';
import { MdAdd } from 'react-icons/lib/md';
import { graphql, compose } from 'react-apollo';
import {
  UpsertAttributeQuery,
  UpsertAttributeQueryOptions,
} from '../../../graphql/mutations';

import { ListAllCategoriesQuery } from '../../../graphql/queries';

import '../styles/CreateAttribute.css';
import { MdEdit } from 'react-icons/lib/md/index';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

class CreateAttribute extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      id: '',
      value: '',
      categoryId: '',
    };

    this.state = { ...this.initialState };

    this.handleUpsert = this.handleUpsert.bind(this);
  }

  componentWillReceiveProps({ categoryId, value, id }) {
    this.setState({
      id,
      value,
      categoryId,
    });
  }

  async handleUpsert() {
    await this.upsertAttribute();
    this.props.closeModal();
    this.setState(this.initialState);
  }

  async upsertAttribute() {
    const { value, categoryId, id } = this.state;

    await this.props.upsertAttribute({ value, categoryId, attributeId: id });
  }

  render() {
    if (this.props.data.loading) {
      return null;
    }

    const { allCategories } = this.props.data;

    const categories = allCategories.map(type => ({
      label: type.name,
      value: type.id,
    }));

    return (
      <div className="CreateAttribute-container">
        <label className="CreateAttribute-label">
          <FormattedMessage id="attribute_name" />
          <input
            className="CreateAttribute-input"
            value={this.state.value}
            placeholder="..."
            onChange={e => this.setState({ value: e.target.value })}
          />
        </label>
        <label className="CreateAttribute-label">
          <FormattedMessage id="category" />
          <Select
            className="CreateAttribute-select"
            placeholder="..."
            value={this.state.categoryId}
            options={categories}
            clearable={false}
            onChange={target => this.setState({ categoryId: target.value })}
          />
        </label>
        {this.state.value &&
          this.state.categoryId && (
            <Button
              color="#1abc9c"
              callback={this.handleUpsert}
              icon={this.props.editing ? <MdEdit size={18} /> : <MdAdd size={18} />}
              label={this.props.editing
                ? <FormattedMessage id="edit" />
                : <FormattedMessage id="add" />
              }
            />
          )}
      </div>
    );
  }
}

CreateAttribute.proptypes = {
  closeModal: proptypes.func.isRequired,
  categoryId: proptypes.string,
  value: proptypes.string,
  id: proptypes.string,
  editing: proptypes.bool,
};

CreateAttribute.defaultProps = {
  value: '',
  categoryId: '',
  editing: false,
};

export default compose(
  graphql(ListAllCategoriesQuery),
  graphql(UpsertAttributeQuery, UpsertAttributeQueryOptions),
)(CreateAttribute);
