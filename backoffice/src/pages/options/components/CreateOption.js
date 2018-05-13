import React, { Component } from 'react';
import proptypes from 'prop-types';
import Button from '../../common/components/Button';
import { MdAdd } from 'react-icons/lib/md';
import Select from 'react-select';
import { graphql, compose } from 'react-apollo';
import { UpsertOptionQuery, UpsertOptionQueryOptions } from '../../../graphql/mutations';

import { ListAllCategoriesQuery } from '../../../graphql/queries';

import '../styles/CreateOption.css';
import { MdEdit } from 'react-icons/lib/md/index';
import { FormattedMessage } from 'react-intl';

class CreateOption extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      id: '',
      name: '',
      values: [],
      editedValues: [],
      categoryId: '',
    };

    this.state = { ...this.initialState };

    this.upsertOption = this.upsertOption.bind(this);
  }

  componentWillReceiveProps({ name, id, categoryId, values }) {
    this.setState({
      name,
      id,
      categoryId,
      values,
      editedValues: values
    });
  }

  async upsertOption() {
    const { id, name, categoryId, editedValues } = this.state;

    const remappedValues = editedValues.map(optionValue => ({ id: optionValue.id, value: optionValue.name }));

    await this.props.upsertOption({ optionId: id, name, categoryId, values: remappedValues });
    this.props.closeModal();
    this.setState(this.initialState);
  }

  onOptionValuesChanged(optionValues) {
    if (optionValues.length >= this.state.values.length) {
      return this.setState({
        editedValues: optionValues.map((optionValue, i) => {
          if (this.state.values[i] && this.state.values[i].id) {
            return { id: this.state.values[i].id, name: optionValue };
          }

          return { name: optionValue };
        }),
      });
    }

    return this.setState({
      editedValues: optionValues.map((optionValue, i) => {
        if (this.state.values[i] && this.state.values[i].id) {
          return { id: this.state.values[i].id, name: optionValue };
        }

        return { name: optionValue };
      }),
    });
  }

  render() {
    if (this.props.data.loading) {
      return null;
    }

    const { allCategories } = this.props.data;

    const categories = allCategories.map(category => ({
      label: category.name,
      value: category.id,
    }));

    return (
      <div className="CreateOption-container">
        <label className="CreateOption-label">
          <FormattedMessage id="option_name" />
          <input
            className="CreateOption-input"
            value={this.state.name}
            placeholder="..."
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <label className="CreateOption-label">
          <FormattedMessage id="option_values" />
          <input
            className="CreateOption-input"
            value={this.state.editedValues.map(optionValue => optionValue.name).join(',')}
            placeholder="value1,value2,value3 (Split your values by a ,)"
            onChange={e => this.onOptionValuesChanged(e.target.value.trim().split(','))}
          />
        </label>
        <label className="CreateOption-label">
          <FormattedMessage id="category" />
          <Select
            className="CreateOption-select"
            placeholder="..."
            value={this.state.categoryId}
            options={categories}
            clearable={false}
            onChange={target => this.setState({ categoryId: target.value })}
          />
        </label>
        {this.state.name && (
          <Button
            color="#1abc9c"
            callback={this.upsertOption}
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

CreateOption.proptypes = {
  closeModal: proptypes.func.isRequired,
  id: proptypes.string,
  name: proptypes.string,
  categoryId: proptypes.string,
  values: proptypes.array,
  editing: proptypes.bool,
};

CreateOption.defaultProps = {
  id: '',
  name: '',
  categoryId: '',
  values: [],
  editing: false,
};

export default compose(
  graphql(ListAllCategoriesQuery),
  graphql(UpsertOptionQuery, UpsertOptionQueryOptions),
)(CreateOption);
