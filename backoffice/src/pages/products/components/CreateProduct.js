import React, { Component } from 'react';
import _ from 'lodash';
import proptypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import Select from 'react-select';
import ReactTable from 'react-table';

import ImageUpload from './ImageUpload';

import {
  CreateProductMutation,
  CreateProductMutationOptions,
} from '../../../graphql/mutations';

import { AllDetailsQuery } from '../../../graphql/queries';

import '../styles/createproduct.css';
import 'react-select/dist/react-select.css';
import { FormattedMessage } from 'react-intl';

function getCombinations(arrays, combine = [], finalList = []) {
  if (!arrays.length) {
    finalList.push(combine);
  } else {
    arrays[0].forEach(now => {
      const nextArrs = arrays.slice(1);
      const copy = combine.slice();
      copy.push(now);
      getCombinations(nextArrs, copy, finalList);
    });
  }
  return finalList;
}

export const findUnavailableOptionsValues = (
  variants,
  options,
  selectedOptionsValues,
) => {
  const isOptionValueInSelectedOptions = (selectedOptions, optionValue) => {
    return !!selectedOptions.find(
      selectedOption => selectedOption.valueId === optionValue.id,
    );
  };

  const isInAllUnavailableVariants = (variants, optionValue) => {
    return (
      variants
        // Get all variants in which the option value is present
        .filter(variant =>
          isOptionValueInSelectedOptions(variant.selectedOptions, optionValue),
        )
        // Make sure those variants are all unavailable
        .every(variant => !variant.available)
    );
  };

  return _(options)
    .flatMap(option => option.values)
    .filter(optionValue => {
      const found = selectedOptionsValues.find(
        selectedOValues => selectedOValues.id === optionValue.id,
      );

      return found && found.selected;
    })
    .filter(optionValue => isInAllUnavailableVariants(variants, optionValue))
    .value();
};

const flattenOValues = option => _.flatMap(option, 'values');

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.handlePost = this.handlePost.bind(this);

    this.initialState = Object.freeze({
      name: '',
      brandId: '',
      displayPrice: '',
      packages: [],
      initialPackages: [],
      selectedOptions: [],
      selectedOptionsValues: [],
      attributes: [],
      variants: [],
      file: null,
      imageUrl: '',
      productId: '',
      categoryId: '',
    });

    this.state = { ...this.initialState };

    this.onSelectedOptionChanged = this.onSelectedOptionChanged.bind(this);
    this.onVariantPriceChanged = this.onVariantPriceChanged.bind(this);
  }

  componentWillReceiveProps({
    name,
    brandId,
    selectedOptions,
    attributes,
    productId,
    displayPrice,
    categoryId,
    variants,
    imageUrl,
  }) {
    this.setState({
      name,
      displayPrice,
      brandId,
      selectedOptions,
      attributes,
      productId,
      categoryId,
      variants,
      imageUrl,
      selectedOptionsValues: this.computeSelectedOptionsValues(selectedOptions, variants),
    });
  }

  async uploadImageAndGetLink() {
    const { file } = this.state;

    if (!file) {
      return Promise.resolve(true);
    }

    const data = new FormData();

    data.append('data', file);

    // Keeping old graphcool endpoint temporarily to store images
    const {
      data: { url },
    } = await axios.post(
      'https://api.graph.cool/file/v1/cj57vba1nl6ia0181m1vbe5cr',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return url;
  }

  computeVariants(selectedOptionsChanged, selectedOValues) {
    if (selectedOptionsChanged.length === 0) {
      return [];
    }

    const optionValuesWithOptionName = selectedOptionsChanged.map(selectedOption => {
      return selectedOption.values
        .filter(
          optionValue =>
            selectedOValues.find(selectedOValue => selectedOValue.id === optionValue.id)
              .selected,
        )
        .map(optionValue => ({
          option: selectedOption,
          value: optionValue,
        }));
    });

    const combinations = getCombinations(optionValuesWithOptionName);

    const hasSameSelectedOptions = (first, second) => {
      return first.every((selectedOption, i) => {
        const optionId = selectedOption.option.id;
        const valueId = selectedOption.value.id;

        if (!second[i]) {
          return false;
        }

        return second[i].option.id === optionId && second[i].value.id === valueId;
      });
    };

    return combinations.map(combination => {
      if (this.state.variants) {
        const existingVariant = this.state.variants.find(variant =>
          hasSameSelectedOptions(variant.selectedOptions, combination),
        );

        if (!!existingVariant) {
          return existingVariant;
        }
      }

      return {
        available: true,
        price: '',
        selectedOptions: combination,
      };
    });
  }

  computeSelectedOptionsValues(selectedOptions, variants = null) {
    const { allOptions } = this.props.data;
    const { selectedOptionsValues } = this.state;

    const isOValueSelected = oValue => {
      if (!variants) {
        const selectedOValue = selectedOptionsValues.find(({ id }) => id === oValue.id);
        // If option value already in state, keep it's current selected value.
        if (!!selectedOValue) {
          return selectedOValue.selected;
        }
      }

      // Try to find from variants (used when editing a product, to compute selected option values from variants)
      if (variants) {
        return !!variants.find(
          variant =>
            !!variant.selectedOptions.find(
              selectedOption => selectedOption.value.id === oValue.id,
            ),
        );
      }

      return !flattenOValues(allOptions).find(
        propsOValue => propsOValue.id === oValue.id,
      );
    };

    return _(selectedOptions)
      .flatMap(option => option.values.map(value => ({ ...value, optionId: option.id })))
      .map(oValue => ({
        id: oValue.id,
        optionId: oValue.optionId,
        name: oValue.name,
        selected: isOValueSelected(oValue),
      }))
      .value();
  }

  onOptionValueChanged(optionValue) {
    const selectedOptionsValues = this.state.selectedOptionsValues.map(
      selectedOptionValue => {
        if (selectedOptionValue.id !== optionValue.id) {
          return selectedOptionValue;
        }

        return {
          ...selectedOptionValue,
          selected: !optionValue.selected,
        };
      },
    );

    this.setState({
      selectedOptionsValues,
      variants: this.computeVariants(this.state.selectedOptions, selectedOptionsValues),
    });
  }

  onSelectedOptionChanged(selectedOptions) {
    const remappedSelectedOptions = selectedOptions.map(option => ({
      id: !option.id ? option.value : option.id,
      name: option.label,
      label: option.label,
      values: option.values,
    }));
    const selectedOptionsValues = this.computeSelectedOptionsValues(
      remappedSelectedOptions,
    );

    this.setState({
      selectedOptions: remappedSelectedOptions,
      variants: this.computeVariants(remappedSelectedOptions, selectedOptionsValues),
      selectedOptionsValues,
    });
  }

  onVariantPriceChanged(selectedVariant, priceInput) {
    const updatedVariant = this.state.variants.map(variant => {
      if (selectedVariant.selectedOptions !== variant.selectedOptions) return variant;

      return {
        ...variant,
        price: priceInput,
      };
    });

    this.setState({
      variants: updatedVariant,
    });
  }

  onVariantAvailableChanged(selectedVariant, isAvailable) {
    const updatedVariant = this.state.variants.map(variant => {
      if (selectedVariant.selectedOptions !== variant.selectedOptions) return variant;

      return {
        ...variant,
        available: isAvailable,
      };
    });

    this.setState({
      variants: updatedVariant,
    });
  }

  renderVariantsTable() {
    if (this.state.selectedOptions.length === 0) {
      return null;
    }

    const columns = this.state.selectedOptions.map((selectedOption, i) => ({
      Header: selectedOption.name || selectedOption.label,
      accessor: `selectedOptions[${i}].value.name`,
      Cell: props => <p className="Reactable-cell">{props.value}</p>,
      filterable: true,
      width: 200,
    }));

    const columnsWithPriceAndAvailable = [
      ...columns,
      {
        Header: <FormattedMessage id="price" />,
        accessor: 'price',
        Cell: props => (
          <input
            className="Createproduct-input"
            placeholder="0.00"
            value={props.value}
            onChange={e => this.onVariantPriceChanged(props.original, e.target.value)}
          />
        ),
        filterable: true,
        width: 100,
      },
      {
        Header: <FormattedMessage id="available" />,
        accessor: 'available',
        Cell: props => (
          <input
            type="checkbox"
            className="Createproduct-input"
            placeholder="0.00"
            checked={props.value}
            onChange={e =>
              this.onVariantAvailableChanged(props.original, e.target.checked)
            }
          />
        ),
        filterable: true,
        width: 100,
      },
    ];

    return (
      <ReactTable
        style={{ height: 'unset' }}
        className="animated -striped -highlight"
        data={this.state.variants}
        columns={columnsWithPriceAndAvailable}
        pageSize={this.state.variants.length}
        defaultPageSize={this.state.variants.length}
      />
    );
  }

  async upsertProduct() {
    const {
      name,
      displayPrice,
      brandId,
      categoryId,
      selectedOptions,
      selectedOptionsValues,
      variants,
      attributes,
      productId,
      imageUrl,
      file,
    } = this.state;

    let uploadedImageUrl = null;

    if (file) {
      uploadedImageUrl = await this.uploadImageAndGetLink();
    }

    const optionIds = selectedOptions.map(option => option.id);
    const attributesIds = attributes.map(attribute => attribute.id);
    const remappedVariants = variants.map(variant => ({
      id: variant.id,
      available: variant.available,
      price: variant.price,
      selectedOptions: variant.selectedOptions.map(selectedOption => ({
        optionId: selectedOption.option.id,
        valueId: selectedOption.value.id,
      })),
    }));
    const unavailableOptionsValuesIds = findUnavailableOptionsValues(
      remappedVariants,
      selectedOptions,
      selectedOptionsValues,
    ).map(optionValue => optionValue.id);

    try {
      await this.props.upsertProduct({
        productId,
        name,
        brandId,
        categoryId,
        attributesIds,
        available: true,
        optionIds,
        variants: remappedVariants,
        displayPrice,
        unavailableOptionsValuesIds,
        imageUrl: uploadedImageUrl || imageUrl,
      });
    } catch (e) {
      //TODO: Handle error (could not add product)
      console.error('Failed creating product', e);
    }
  }

  async handlePost() {
    this.props.closeModal();

    await this.upsertProduct();

    this.setState(this.initialState);
    this.props.history.push('/products');
  }

  render() {
    const {
      allBrands,
      allOptions,
      allCategories,
      allAttributes,
      loading,
      error,
    } = this.props.data;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error !</div>;
    }

    // All options for the selects
    const options = _(allOptions)
      .filter(({ category }) => category.id === this.state.categoryId)
      .differenceBy(this.state.selectedOptions, 'id')
      .map(option => ({ label: option.name, value: option.id, values: option.values }))
      .value();

    const brands = allBrands
      .filter(({ category }) => category.id === this.state.categoryId)
      .map(brand => ({
        label: brand.name,
        value: brand.id,
      }));

    const attributes = _(allAttributes)
      .filter(({ category }) => category.id === this.state.categoryId)
      .differenceBy(this.state.attributes, 'id')
      .map(attribute => ({ label: attribute.value, value: attribute.id }))
      .value();

    const categories = allCategories.map(category => ({
      label: category.name,
      value: category.id,
    }));

    return (
      <div className="Createproduct-container">
        <div className="Createproduct-row-container">
          <div className="Createproduct-column-container">
            <label className="Createproduct-semi-label">
              <FormattedMessage id="name" />
              <input
                className="Createproduct-input"
                value={this.state.name}
                placeholder="..."
                onChange={e => this.setState({ name: e.target.value })}
              />
            </label>
            <label className="Createproduct-semi-label">
              {' '}
              <FormattedMessage id="category" />
              <Select
                placeholder="Select a category first"
                value={this.state.categoryId}
                options={categories}
                clearable={false}
                onChange={target => this.setState({ categoryId: target.value })}
              />
            </label>
            <label className="Createproduct-semi-label">
              {' '}
              <FormattedMessage id="brand" />
              <Select
                placeholder="..."
                value={this.state.brandId}
                options={brands}
                clearable={false}
                onChange={target => this.setState({ brandId: target.value })}
              />
            </label>
          </div>
          <ImageUpload
            onImageSelected={({ file }) => this.setState({ file })}
            imagePreviewUrl={this.state.imageUrl || this.state.file}
          />
        </div>
        <label className="Createproduct-label">
          <FormattedMessage id="attributes" />
          <Select
            placeholder="..."
            multi
            value={this.state.attributes}
            options={attributes}
            clearable={false}
            onChange={attributes =>
              this.setState({
                attributes: attributes.map(attribute => {
                  return {
                    id: !attribute.id ? attribute.value : attribute.id,
                    name: attribute.label,
                    label: attribute.label,
                  };
                }),
              })
            }
          />
        </label>
        <label className="Createproduct-label">
          <FormattedMessage id="options" />
          <Select
            placeholder="..."
            multi
            value={this.state.selectedOptions}
            options={options}
            onChange={this.onSelectedOptionChanged}
          />
        </label>
        <label className="Createproduct-label">
          {this.state.selectedOptions.map(option => (
            <div key={option.id}>
              <span className="Createproduct-vignette-title">{option.label}</span>
              {this.state.selectedOptionsValues
                .filter(oValue => oValue.optionId === option.id)
                .map(oValue => (
                  <span
                    key={`${option.id}-${oValue.id}`}
                    onClick={() => this.onOptionValueChanged(oValue)}
                    className="Reactable-vignette"
                    style={{ backgroundColor: oValue.selected ? '#1abc9c' : '#cc6155' }}
                  >
                    {oValue.name}
                  </span>
                ))}
            </div>
          ))}
        </label>
        {this.state.selectedOptions.length > 0 && (
          <label className="Createproduct-label">
            <FormattedMessage id="variants" />
            {this.renderVariantsTable()}
          </label>
        )}
        <label className="Createproduct-label">
          <FormattedMessage id="display_price" />
          <input
            className="Createproduct-input"
            value={this.state.displayPrice}
            placeholder="Unit price in €"
            onChange={e => this.setState({ displayPrice: e.target.value })}
          />
        </label>
        {this.state.name && (
          <button className="Createproduct-button" onClick={this.handlePost}>
            {!this.props.editMode ? (
              <FormattedMessage id="add" />
            ) : (
              <FormattedMessage id="edit" />
            )}
          </button>
        )}
      </div>
    );
  }
}

CreateProduct.proptypes = {
  closeModal: proptypes.func,
  name: proptypes.string,
  brandId: proptypes.string,
  productId: proptypes.string,
  selectedOptions: proptypes.array,
  attributes: proptypes.array,
  imageUrl: proptypes.string,
  packages: proptypes.array,
  displayPrice: proptypes.number,
  categoryId: proptypes.string,
  cloneMode: proptypes.bool,
  editMode: proptypes.bool,
};

CreateProduct.defaultProps = {
  name: '',
  brandId: '',
  selectedOptions: [],
  attributes: [],
  imageUrl: null,
  packages: [],
  displayPrice: '',
  categoryId: '',
  editMode: false,
  cloneMode: false,
};

const CreateProductWithMutationAndQueries = compose(
  graphql(AllDetailsQuery),
  graphql(CreateProductMutation, CreateProductMutationOptions),
)(CreateProduct);

export default withRouter(CreateProductWithMutationAndQueries);
