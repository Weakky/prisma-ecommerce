import React, { Component } from 'react';
import proptypes from 'prop-types';
import Button from '../../common/components/Button';
import { MdAdd } from 'react-icons/lib/md';
import { graphql, compose } from 'react-apollo';
import { UpsertBrandQuery, UpsertBrandQueryOptions } from '../../../graphql/mutations';

import { ListAllCategoriesQuery } from '../../../graphql/queries';

import '../styles/createbrand.css';
import { MdEdit } from 'react-icons/lib/md/index';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

class CreateBrand extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      id: '',
      name: '',
      categoryId: '',
    };

    this.state = { ...this.initialState };

    this.handlePost = this.handlePost.bind(this);
  }

  componentWillReceiveProps({ categoryId, name, id }) {
    this.setState({
      id,
      name,
      categoryId,
    });
  }

  async handlePost() {
    await this.upsertBrand();
    this.props.closeModal();
    this.setState(this.initialState);
  }

  async upsertBrand() {
    const { name, categoryId, id } = this.state;

    await this.props.upsertBrand({ name, categoryId, brandId: id });
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
      <div className="Createbrand-container">
        <label className="Createbrand-label">
          <FormattedMessage id="brand_name" />
          <input
            className="Createbrand-input"
            value={this.state.name}
            placeholder="..."
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <label className="Createbrand-label">
          <FormattedMessage id="category" />
          <Select
            className="Createbrand-select"
            placeholder="..."
            value={this.state.categoryId}
            options={categories}
            clearable={false}
            onChange={target => this.setState({ categoryId: target.value })}
          />
        </label>
        {this.state.name &&
          this.state.categoryId && (
            <Button
              color="#1abc9c"
              callback={this.handlePost}
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

CreateBrand.proptypes = {
  closeModal: proptypes.func.isRequired,
  categoryId: proptypes.string,
  name: proptypes.string,
  id: proptypes.string,
  editing: proptypes.bool,
};

CreateBrand.defaultProps = {
  name: '',
  categoryId: '',
  editing: false,
};

export default compose(
  graphql(ListAllCategoriesQuery),
  graphql(UpsertBrandQuery, UpsertBrandQueryOptions),
)(CreateBrand);
