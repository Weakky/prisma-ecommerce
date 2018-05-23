import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import capitalize from 'lodash/capitalize';

import Container from '../../components/layout/Container';
import FullLoading from '../../components/loading/FullLoading';
import Card from '../../components/card/Card';
import BigRedButton from '../../components/big-red-button/BigRedButton';

import Title from '../../components/title/Title';
import { translate } from '../../i18n';

import Colors from '../../statics/colors';
import font from '../../assets/fonts';
import styles from './Home.styles';

const SimpleProductList = props => (
  <View style={styles.simpleProductListContainer}>
    <Title style={{ marginBottom: 8 }}size={18} color={Colors.text}>
      {props.title}
    </Title>
    {props.orderableProducts.map(({ id, product }) => (
      <Card
        key={id}
        onPress={() =>
          props.navigation.navigate('Product', {
            productId: product.id,
            unavailableOptionsValues: product.unavailableOptionsValues,
          })
        }
        loading={false}
        brand={product.brand.name}
        name={product.name}
        source={{ uri: product.imageUrl }}
        price={product.displayPrice}
        unavailableOptionsValues={product.unavailableOptionsValues}
      />
    ))}
  </View>
);

SimpleProductList.propTypes = {
  title: PropTypes.string,
  orderableProducts: PropTypes.array,
};

const RecapRow = props => (
  <View style={styles.recapRowContainer}>
    <Title font={font} size={12} weight={props.bold && '700'} color={Colors.text}>
      {props.title}
    </Title>
    <Title font={font} size={12} weight={props.bold && '700'} color={Colors.text}>
      {props.value}
    </Title>
  </View>
);

const Separator = () => <View style={styles.separator} />;

const Ticket = props => (
  <View style={styles.ticketContainer}>
    <Title
      style={{ marginBottom: 10 }}
      font={font}
      size={10}
      weight="600"
      color="rgba(72,72,72,0.4)"
    >
      {translate('your_order')}
    </Title>
    {props.order.lineItems.map(lineItem => (
      <RecapRow
        key={lineItem.id}
        title={`${lineItem.quantity} x ${lineItem.variant.product.name}`}
        value={`${lineItem.variant.price * lineItem.quantity}€`}
      />
    ))}
    <Separator />
    <RecapRow bold title={translate('total_price')} value={props.order.totalPrice} />
  </View>
);

const SmallRedButton = props => (
  <TouchableOpacity style={styles.smallRedButton} onPress={props.onPress}>
    <Title size={12} font={font} weight="400" color={Colors.white}>
      {props.label}
    </Title>
  </TouchableOpacity>
);

const LastOrder = props => (
  <View style={{ marginBottom: 20 }}>
    <Title style={{ marginBottom: 20 }} size={18} color={Colors.text}>
      {translate('your_last_order')}
    </Title>
    <Ticket order={props.order} />
    {!props.askToReplaceOrMergeOrder && (
      <BigRedButton
        loading={props.loading}
        onPress={() =>
          props.onPressAddToCart({ orderId: props.order.id, replace: false })
        }
        label={translate('add_to_cart')}
      />
    )}
    {props.askToReplaceOrMergeOrder && (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <SmallRedButton
          label={translate('replace_with_cart')}
          onPress={() => props.addOrderToCart({ orderId: props.order.id, replace: true })}
        />
        <SmallRedButton
          label={translate('merge_with_cart')}
          onPress={() =>
            props.addOrderToCart({ orderId: props.order.id, replace: false })
          }
        />
      </View>
    )}
  </View>
);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      askToReplaceOrMergeOrder: false,
    };

    this.onPressAddToCart = this.onPressAddToCart.bind(this);
    this.addOrderToCart = this.addOrderToCart.bind(this);
  }

  onPressAddToCart({ orderId, replace }) {
    if (this.props.data.me.cart.length > 0) {
      return this.setState({ askToReplaceOrMergeOrder: true });
    }

    return this.addOrderToCart({ orderId, replace });
  }

  async addOrderToCart({ orderId, replace }) {
    this.setState({ loading: true });
    await this.props.addOrderToCart({ orderId, replace });
    this.setState({
      loading: false,
      askToReplaceOrMergeOrder: false,
    });
  }

  render() {
    if (this.props.data.loading) {
      return <FullLoading />;
    }

    const { me, shopMetadata } = this.props.data;

    return (
      <Container asScroll title={`${translate('hello')}, ${capitalize(me.firstName)} !`}>
        <View style={styles.messageOfTheDay}>
          <Text>MESSAGE OF THE DAY (TODO LATER)</Text>
        </View>
        {me.orders.length === 0 && (
          <BigRedButton
            onPress={() => this.props.navigation.navigate('Browse')}
            label={translate('find_your_product')}
            icon="ios-search"
          />
        )}
        {me.orders.length > 0 && (
          <LastOrder
            order={me.orders[0]}
            loading={this.state.loading}
            onPressAddToCart={this.onPressAddToCart}
            askToReplaceOrMergeOrder={this.state.askToReplaceOrMergeOrder}
            addOrderToCart={this.addOrderToCart}
          />
        )}
        <SimpleProductList
          title={translate('best_sales')}
          orderableProducts={shopMetadata.bestSalesProducts}
          navigation={this.props.navigation}
        />
        <SimpleProductList
          title={translate('new_products')}
          orderableProducts={shopMetadata.newProducts}
          navigation={this.props.navigation}
        />
      </Container>
    );
  }
}

Home.propTypes = {};
Home.defaultProps = {};

export default Home;
