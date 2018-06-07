import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { MdSave } from 'react-icons/lib/md';
import { FormattedMessage } from 'react-intl';
import { SortableElement, SortableContainer, arrayMove } from 'react-sortable-hoc';
import Select from 'react-select';
import '../ListNewProducts.css';
import Button from '../../common/components/Button';

import {
  ListAllNewProductsQuery,
} from '../../../graphql/queries/index';
import {
  UpsertNewProductsMutationOptions,
  UpsertNewProductsMutation,
} from '../../../graphql/mutations';

import '../../common/styles/Reactable.css';

const SortableItem = SortableElement((props) => (
  <li className="ListNewProducts-listItem">
    <img src={props.value.imageUrl} width="30" height="30" style={{ marginRight: 10 }}/>
    {props.value.label}
  </li>
));

const SortableList = SortableContainer((props) => {
  return (
    <div>
      {props.items.map((item, index) => (
        <SortableItem key={`item-${index}`} index={index} value={item} />
      ))}
    </div>
  );
});

class ListNewProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      products: [],
    };

    this.upsertNewProducts = this.upsertNewProducts.bind(this);
  }

  componentWillReceiveProps({ data }) {
    if (!data.loading) {
      this.setState({
        products: data.me.shop.newProducts.map((orderableProduct) => ({
          newProductId: orderableProduct.id,
          label: orderableProduct.product.name,
          value: orderableProduct.product.id,
          imageUrl: orderableProduct.product.imageUrl,
        })),
      })
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      products: arrayMove(this.state.products, oldIndex, newIndex),
    });
  };

  async upsertNewProducts() {
    const remappedBestSales = this.state.products.map((product, i) => ({
      id: product.newProductId,
      productId: product.value,
      position: i,
    }));

    this.setState({ loading: true });
    await this.props.upsertNewProducts({ newProducts: remappedBestSales });
    this.setState({ loading: false });
  }

  render() {
    const { data } = this.props;

    if (data.loading || this.state.loading) {
      return <div>Loading...</div>;
    }

    const products = data.allProducts.map(product => ({
      label: product.name,
      value: product.id,
      imageUrl: product.imageUrl,
    }));

    return (
      <div className="ListNewProducts-container">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Select
            className="ListNewProducts-select"
            placeholder="..."
            multi
            value={this.state.products}
            options={products}
            clearable={false}
            onChange={products => this.setState({ products: products })}
          />
          <Button
            color="#1abc9c"
            callback={this.upsertNewProducts}
            icon={<MdSave size={18} />}
            label={<FormattedMessage id="save" />}
          />
        </div>
        <SortableList items={this.state.products} onSortEnd={this.onSortEnd} />
      </div>
    );
  }
}

export default compose(
  graphql(ListAllNewProductsQuery),
  graphql(UpsertNewProductsMutation, UpsertNewProductsMutationOptions),
)(ListNewProducts);
