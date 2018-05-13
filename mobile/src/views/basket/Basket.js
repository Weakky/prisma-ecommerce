import React, { Component } from 'react';
import { FlatList, Platform, StatusBar, View, StyleSheet } from 'react-native';

import sumBy from 'lodash/sumBy'
import { withApollo } from 'react-apollo';
import { Observable } from 'apollo-client-preset';

import Colors from '../../statics/colors';
import font from '../../assets/fonts';
import Title from '../../components/title/Title';

import commonQueries from '../../graphql/queries';

import BasketCard from '../../components/basket-card/BasketCard';
import Button from '../../components/button/Button';
import {translate} from '../../i18n'

class Basket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: []
    };

    this.removeItemFromBasket = this.removeItemFromBasket.bind(this);
  }

  async componentWillMount() {
    const query = this.props.client.watchQuery({
      query: commonQueries.userInformation,
    });

    Observable.from(query).forEach(({ data: updatedResult }) => {
      this.setState({ cart: updatedResult.me.cart });
    });
  }

  async removeItemFromBasket(lineItemId) {
    await this.props.removeItemFromBasket({ lineItemId });
  }

  totalTTC() {
    return sumBy(this.state.cart, lineItem => lineItem.quantity * lineItem.variant.price);
  }

  totalHT() {
    return parseFloat(this.totalTTC() * 0.8).toFixed(2);
  }

  totalVAT() {
    return parseFloat(this.totalTTC() - this.totalHT()).toFixed(2);
  }

  render() {
    if (!this.state.cart) {
      return null;
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingTop: Platform.select({
            ios: 20,
            android: StatusBar.currentHeight,
          }),
        }}
      >
        <View style={{ padding: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title size={22} color={Colors.text}>
              {translate('your_cart')}
            </Title>
            {
              this.state.cart.length > 0 && (
                <Button
                  label={translate('continue')}
                  onPress={() => this.props.navigation.navigate('Recap', {
                    totalTTC: this.totalTTC(),
                    totalHT: this.totalHT(),
                    totalVAT: this.totalVAT()
                  })}
                  backgroundColor={Colors.red}
                  labelColor={Colors.white}
                  fontSize={16}
                  width={150}
                  height={35}
                />
              )
            }
          </View>
        </View>
        <FlatList
          data={this.state.cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item: lineItem }) => (
            <View style={{ padding: 5 }}>
              <BasketCard
                brand={lineItem.variant.product.brand.name}
                name={lineItem.variant.product.name}
                source={{ uri: lineItem.variant.product.imageUrl }}
                price={lineItem.variant.product.displayPrice}
                selectedOptions={lineItem.variant.selectedOptions}
                quantity={lineItem.quantity}
                totalPrice={lineItem.quantity * lineItem.variant.price}
                onPressViewProduct={() => {
                  this.props.navigation.navigate('Product', {
                    productId: lineItem.variant.product.id,
                  });
                }}
                onPressDeleteProduct={() => this.removeItemFromBasket(lineItem.id)}
              />
            </View>
          )}
        />
        <View style={{ flexDirection: 'row', height: 44, backgroundColor: 'rgba(249, 249, 249, 0.8)', borderColor: 'rgba(151, 151, 151, 0.5)', borderTopWidth: StyleSheet.hairlineWidth, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
          <Title font={font} size={15} color="#484848" weight="500">{translate('total_price')}</Title>
          <Title font={font} size={18} color="#484848" weight="700">
            {
              this.totalTTC()
            }
            €</Title>
        </View>
      </View>
    );
  }
}

Basket.propTypes = {};
Basket.defaultProps = {};

export default withApollo(Basket);
