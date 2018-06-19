import React, { Component } from 'react';
import ReactTable from 'react-table';
import { compose, graphql } from 'react-apollo';
import {
  MdAdd,
  MdClose,
  MdEdit,
  MdRefresh,
  MdLibraryAdd,
} from 'react-icons/lib/md';

import { FormattedMessage } from 'react-intl';

import CreateProduct from './CreateProduct';
import Buttons from '../../common/components/Buttons';

import {
  DeleteProductQuery,
  DeleteProductQueryOptions,
} from '../../../graphql/mutations/index';

import { ListAllProductsQuery } from '../../../graphql/queries/index';

import '../styles/listproduct.css';
import 'react-table/react-table.css';
import '../../common/styles/Reactable.css';

const filterCaseInsensitive = (filter, row) => {
  const id = filter.pivotId || filter.id;

  return row[id]
    ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
    : true;
};

class ListProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      loading: false,
      clone: false,
      edit: false,
      productToEditOrClone: null,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
  }

  openCreateModal() {
    this.setState({ visible: true });
  }

  closeCreateModal() {
    this.setState({
      visible: false,
      productToEditOrClone: null,
    });
  }

  async handleDelete(id) {
    await this.props.deleteProduct({ productId: id });
    await this.props.data.refetch();
  }

  async handleRefresh() {
    this.setState({ loading: true });
    await this.props.data.refetch();
    this.setState({ loading: false });
  }

  cloneOrEditProduct(product, { clone = false, edit = false }) {
    this.setState({
      productToEditOrClone: {
        productId: product.id,
        name: product.name,
        description: product.description,
        available: product.available,
        displayPrice: product.displayPrice,
        categoryId: product.category.id,
        brandId: product.brand.id,
        attributes: product.attributes.map(attribute => ({
          id: attribute.id,
          label: attribute.value,
        })),
        options: product.options.map(option => ({
          id: option.id,
          label: option.name,
          values: option.values,
        })),
        variants: product.variants,
        imageUrl: product.imageUrl,
      },
      visible: true,
      clone,
      edit,
    });
  }

  renderCreateOrEditModal() {
    const { productToEditOrClone, edit, clone } = this.state;

    if (productToEditOrClone && edit) {
      return (
        <CreateProduct
          closeModal={this.closeCreateModal}
          productId={productToEditOrClone.productId}
          name={productToEditOrClone.name}
          available={productToEditOrClone.available}
          description={productToEditOrClone.description}
          displayPrice={productToEditOrClone.displayPrice}
          brandId={productToEditOrClone.brandId}
          attributes={productToEditOrClone.attributes}
          categoryId={productToEditOrClone.categoryId}
          selectedOptions={productToEditOrClone.options}
          variants={productToEditOrClone.variants}
          imageUrl={productToEditOrClone.imageUrl}
          editMode
        />
      );
    }

    if (productToEditOrClone && clone) {
      return (
        <CreateProduct
          closeModal={this.closeCreateModal}
          displayPrice={productToEditOrClone.displayPrice}
          brandId={productToEditOrClone.brandId}
          attributes={productToEditOrClone.attributes}
          categoryId={productToEditOrClone.categoryId}
          selectedOptions={productToEditOrClone.options}
          variants={productToEditOrClone.variants}
          imageUrl={productToEditOrClone.imageUrl}
          cloneMode
        />
      );
    }

    return <CreateProduct closeModal={this.closeCreateModal} />;
  }

  render() {
    const columns = [
      {
        accessor: 'imageUrl',
        Cell: props => (
          <img
            alt="product"
            style={{ height: 60, width: 60 }}
            className="Reactable-img"
            src={props.value}
          />
        ),
        width: 75,
      },
      {
        Header: <FormattedMessage id="name" />,
        accessor: 'name',
        Cell: props => <p className="Reactable-cell">{props.value}</p>,
        filterable: true,
        width: 200,
      },
      {
        Header: <FormattedMessage id="brand" />,
        accessor: 'brand.name',
        Cell: props => <p className="Reactable-cell">{props.value}</p>,
        filterable: true,
        width: 150,
      },
      {
        Header: <FormattedMessage id="category" />,
        accessor: 'category.name',
        Cell: props => <p className="Reactable-cell">{props.value}</p>,
        filterable: true,
        width: 150,
      },
      {
        Header: <FormattedMessage id="options" />,
        accessor: 'options',
        Cell: props =>
          props.value.map(option => (
            <span key={option.id} className="Reactable-vignette">
              {option.name}
            </span>
          )),
        width: 250,
      },
      {
        Header: <FormattedMessage id="attributes" />,
        accessor: 'attributes',
        Cell: props => (
          <div className="Reactable-cell-container">
            {props.original.attributes.map((prop, k) => (
              <span key={k} className="Reactable-vignette">
                {prop.value}
              </span>
            ))}
          </div>
        ),
        filterable: false,
        width: 250,
      },
      {
        Header: <FormattedMessage id="display_price" />,
        accessor: 'displayPrice',
        Cell: props => (
          <div className="Reactable-cell-container">
            <span className="Reactable-vignette">{props.value}€</span>
          </div>
        ),
        filterable: false,
      },
      {
        Header: <FormattedMessage id="edit" />,
        Cell: ({ original: product }) => (
          <p style={{ textAlign: 'center', margin: 0 }}>
            <span
              onClick={() => this.cloneOrEditProduct(product, { edit: true })}
              className="Reactable-edit"
            >
              <MdEdit />
            </span>
          </p>
        ),
        filterable: false,
        sortable: false,
        width: 70,
      },
      {
        Header: <FormattedMessage id="clone" />,
        Cell: ({ original: product }) => (
          <p style={{ textAlign: 'center', margin: 0 }}>
            <span
              onClick={() => this.cloneOrEditProduct(product, { clone: true })}
              className="Reactable-edit"
            >
              <MdLibraryAdd />
            </span>
          </p>
        ),
        filterable: false,
        sortable: false,
        width: 70,
      },
      {
        Header: <FormattedMessage id="delete" />,
        Cell: props => (
          <p style={{ textAlign: 'center', margin: 0 }}>
            <span
              onClick={() => this.handleDelete(props.original.id)}
              className="Reactable-delete"
            >
              <MdClose />
            </span>
          </p>
        ),
        width: 70,
      },
    ];
    const listButtons = [
      {
        color: 'transparent',
        callback: this.handleRefresh,
        icon: <MdRefresh size={18} />,
        label: <FormattedMessage id="reload_product" />,
      },
      {
        color: 'transparent',
        callback: this.openCreateModal,
        icon: <MdAdd size={18} />,
        label: <FormattedMessage id="add_product" />,
      },
    ];
    const createButtons = [
      {
        color: 'transparent',
        callback: () => this.setState({ visible: false }),
        icon: <MdRefresh size={18} />,
        label: <FormattedMessage id="back_to_list" />,
      },
    ];

    return (
      <div>
        <Buttons buttons={this.state.visible ? createButtons : listButtons} />

        {this.state.visible && this.renderCreateOrEditModal()}
        {!this.state.visible && (
          <ReactTable
            loadingText={<FormattedMessage id="reloading_data" />}
            loading={this.state.loading}
            noDataText={<FormattedMessage id="no_data" />}
            className="animated Reactable-table -highlight"
            data={this.props.data.allProducts}
            columns={columns}
            defaultFilterMethod={filterCaseInsensitive}
          />
        )}
      </div>
    );
  }
}

export default compose(
  graphql(ListAllProductsQuery, { options: { variables: { nullValue: null } } }),
  graphql(DeleteProductQuery, DeleteProductQueryOptions),
)(ListProduct);
