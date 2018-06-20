import React, { Component } from 'react';
import { View, Alert, } from 'react-native';
import OneSignal from 'react-native-onesignal';
import PropTypes from 'prop-types';

import capitalize from 'lodash/capitalize';

import Container from '../../components/layout/Container';
import FullLoading from '../../components/loading/FullLoading';
import Card from '../../components/card/Card';
import BigRedButton from '../../components/big-red-button/BigRedButton';
import Order from '../../components/order/Order';

import Title from '../../components/title/Title';
import { translate } from '../../i18n';

import Colors from '../../statics/colors';
import font from '../../assets/fonts'
import styles from './Home.styles';
import commonQueries from '../../graphql/queries';

const SimpleProductList = props => (
  <View style={styles.simpleProductListContainer}>
    <Title style={{ marginBottom: 8 }} size={18} color={Colors.text}>
      {props.title}
    </Title>
    {props.orderableProducts.map(({ id, product }) => (
      <Card
        key={id}
        style={{ padding: 5 }}
        onPress={() =>
          props.navigation.navigate('Product', {
            productId: product.id,
            unavailableOptionsValues: product.unavailableOptionsValues,
          })
        }
        loading={false}
        brand={product.brand.name}
        name={product.name}
        available={product.available}
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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      askToReplaceOrMergeOrder: false,
      cartLength: 0
    };

    this.oneSignalUserId = null;
    this.onPressAddToCart = this.onPressAddToCart.bind(this);
    this.addOrderToCart = this.addOrderToCart.bind(this);
    this.onIds = this.onIds.bind(this);
  }

  componentWillMount() {
    OneSignal.init("22fcdd38-fb1c-43ce-8619-947d613c84d4", { kOSSettingsKeyAutoPrompt: true });
    OneSignal.configure();

    OneSignal.addEventListener('ids', this.onIds);

    this.subscription = this.props.client
      .watchQuery({ query: commonQueries.userInformation })
      .subscribe(({ data: updatedResult }) => {
        this.setState({ cartLength: updatedResult.me.cart.length });
      });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
    this.subscription.unsubscribe();
  }

  onIds(device) {
    if (device.userId) {
      this.oneSignalUserId = device.userId;
    }
  }

  shouldUpdateOneSignalUserId(currentUserId, newUserId) {
    if (!currentUserId && !newUserId) {
      return false;
    }

    if (currentUserId && !newUserId) {
      return false;
    }

    // Update only if oneSignalUserId has changed
    if (currentUserId && newUserId && currentUserId === newUserId) {
      return false;
    }

    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && this.shouldUpdateOneSignalUserId(nextProps.data.me.oneSignalUserId, this.oneSignalUserId)) {
      return this.props.updateOneSignalUserId({ oneSignalUserId: this.oneSignalUserId });
    }
  }


  onPressAddToCart({ orderId, replace }) {
    if (this.state.cartLength > 0) {
      return this.setState({ askToReplaceOrMergeOrder: true });
    }

    return this.addOrderToCart({ orderId, replace });
  }

  async addOrderToCart({ orderId, replace }) {
    this.setState({ loading: true });

    try {
      await this.props.addOrderToCart({ orderId, replace });
    } catch (e) {
      const error = e.graphQLErrors[0];

      Alert.alert(error.message);
    }

    this.setState({
      loading: false,
      askToReplaceOrMergeOrder: false,
    });
  }

  render() {
    if (this.props.data.loading) {
      return <FullLoading />;
    }

    const { me } = this.props.data;

    return (
      <Container asScroll title={`${translate('hello')}, ${capitalize(me.firstName)} !`}>
        <View style={styles.messageOfTheDay}>
          {
            !!me.selectedShop.MOTD && <Title font={font} size={16}>{me.selectedShop.MOTD}</Title>
          }
        </View>
        {me.orders.length === 0 && (
          <BigRedButton
            style={{ marginBottom: 16 }}
            onPress={() => this.props.navigation.navigate('Browse')}
            label={translate('find_your_product')}
            icon="ios-search"
          />
        )}
        {me.orders.length > 0 && (
          <Order
            title={translate('your_last_order')}
            order={me.orders[0]}
            loading={this.state.loading}
            onPressAddToCart={this.onPressAddToCart}
            askToReplaceOrMergeOrder={this.state.askToReplaceOrMergeOrder}
            addOrderToCart={this.addOrderToCart}
          />
        )}
        {me.selectedShop.bestSellerProducts.length > 0 && (
          <SimpleProductList
            title={translate('best_sales')}
            orderableProducts={me.selectedShop.bestSellerProducts}
            navigation={this.props.navigation}
          />
        )}
        {me.selectedShop.newProducts.length > 0 && (
          <SimpleProductList
            title={translate('new_products')}
            orderableProducts={me.selectedShop.newProducts}
            navigation={this.props.navigation}
          />
        )}
      </Container>
    );
  }
}

Home.propTypes = {};
Home.defaultProps = {};

export default Home;
