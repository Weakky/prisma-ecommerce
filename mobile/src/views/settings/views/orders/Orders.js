import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { Observable } from 'apollo-client-preset';
import fecha from 'fecha';

import Container from '../../../../components/layout/Container';
import FullLoading from '../../../../components/loading/FullLoading';

import Order from '../../../../components/order/Order';
import commonQueries from '../../../../graphql/queries';
import { translate } from '../../../../i18n';

export default class Orders extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      pressedOrders: {},
      cartLength: 0,
    };

    this.onPressAddToCart = this.onPressAddToCart.bind(this);
    this.addOrderToCart = this.addOrderToCart.bind(this);
  }

  async componentWillMount() {
    const query = this.props.client.watchQuery({
      query: commonQueries.userInformation,
    });

    Observable.from(query).forEach(({ data: updatedResult }) => {
      this.setState({ cartLength: updatedResult.me.cart.length });
    });
  }

  onPressAddToCart({ orderId, replace }) {
    if (this.state.cartLength > 0) {
      return this.setState({
        pressedOrders: {
          ...this.state.pressedOrders,
          [orderId]: true,
        },
      });
    }

    return this.addOrderToCart({ orderId, replace });
  }

  async addOrderToCart({ orderId, replace }) {
    this.setState({ loading: true });
    await this.props.addOrderToCart({ orderId, replace });
    this.setState({
      loading: false,
      pressedOrders: {
        ...this.state.pressedOrders,
        [orderId]: false,
      },
    });
  }

  render() {
    if (this.props.data.loading) {
      return <FullLoading />;
    }

    return (
      <Container
        title={translate('your_orders')}
        navigation={this.props.navigation}
        innerStyle={{ flex: 1 }}
      >
        <FlatList
          data={this.props.data.me.orders}
          extraData={this.state}
          keyExtractor={order => order.id}
          renderItem={({ item: order }) => (
            <Order
              title={`${translate('order_of')} ${fecha.format(
                new Date(order.createdAt),
                'DD/MM/YY',
              )}`}
              askToReplaceOrMergeOrder={this.state.pressedOrders[order.id] || false}
              onPressAddToCart={this.onPressAddToCart}
              order={order}
              addOrderToCart={this.addOrderToCart}
              loading={this.state.loading}
            />
          )}
        />
      </Container>
    );
  }
}
