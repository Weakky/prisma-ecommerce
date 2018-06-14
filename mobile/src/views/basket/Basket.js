import React, { Component } from 'react';
import { FlatList, Platform, StatusBar, View, StyleSheet, Alert } from 'react-native';

import sumBy from 'lodash/sumBy';
import { withApollo } from 'react-apollo';

import Container from '../../components/layout/Container';
import Button from '../../components/button/Button';
import BasketCard from '../../components/basket-card/BasketCard';
import Title from '../../components/title/Title';

import { translate } from '../../i18n';

import Colors from '../../statics/colors';
import font from '../../assets/fonts';

import commonQueries from '../../graphql/queries';

class Basket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      loading: false,
    };

    this.removeItemFromBasket = this.removeItemFromBasket.bind(this);
    this.continueIfValidCart = this.continueIfValidCart.bind(this);
  }

  async componentWillMount() {
    this.subscription = this.props.client
      .watchQuery({ query: commonQueries.userInformation })
      .subscribe(({ data: updatedResult }) => {
        this.setState({ cart: updatedResult.me.cart });
      });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  async removeItemFromBasket(lineItemId) {
    try {
      await this.props.removeItemFromBasket({ lineItemId });
    } catch (e) {
      const error = e.graphQLErrors[0];

      if (error) {
        Alert.alert(error.message);
        // Refetch basket
        await this.props.client.query({
          query: commonQueries.userInformation,
          fetchPolicy: 'network-only',
        });
      }
    }
  }

  totalTTC() {
    return sumBy(
      this.state.cart,
      lineItem => lineItem.quantity * lineItem.variant.price,
    ).toFixed(2);
  }

  totalHT() {
    return (this.totalTTC() / 1.2).toFixed(2);
  }

  totalVAT() {
    return (this.totalTTC() - this.totalHT()).toFixed(2);
  }

  async continueIfValidCart() {
    try {
      this.setState({ loading: true });

      const { data } = await this.props.client.query({
        query: commonQueries.userInformation,
        fetchPolicy: 'network-only',
      });

      this.setState({ loading: false });

      // Check if any lineItem was deleted
      if (data.me.cart.some(lineItem => lineItem.deletedAt !== null)) {
        return Alert.alert(
          translate('invalid_cart_title'),
          translate('invalid_cart_deleted'),
        );
      }

      // Check if some variants aren't available anymore
      if (data.me.cart.some(lineItem => this.isLineItemUnavailable(lineItem))) {
        return Alert.alert(
          translate('invalid_cart_title'),
          translate('invalid_cart_not_available'),
        );
      }

      this.props.navigation.navigate('Recap', {
        totalTTC: this.totalTTC(),
        totalHT: this.totalHT(),
        totalVAT: this.totalVAT(),
      });
    } catch (e) {
      const error = e.graphQLErrors[0];

      Alert.alert('', error.message);
    }
  }

  isLineItemUnavailable(lineItem) {
    const lineItemsValues = lineItem.variant.selectedOptions.map(
      option => option.value.id,
    );

    return lineItem.variant.product.unavailableOptionsValues.some(optionValue =>
      lineItemsValues.includes(optionValue.id),
    );
  }

  renderContinueButton() {
    if (this.state.cart.length === 0) {
      return null;
    }

    return (
      <Button
        label={translate('continue')}
        onPress={this.continueIfValidCart}
        loading={this.state.loading}
        backgroundColor={Colors.red}
        labelColor={Colors.white}
        fontSize={16}
        width={150}
        height={35}
      />
    );
  }

  render() {
    if (!this.state.cart) {
      return null;
    }

    return (
      <Container
        title={translate('your_cart')}
        leftButton={this.renderContinueButton()}
        innerStyle={{ marginTop: 16, padding: 0, flex: 1 }}
      >
        <FlatList
          data={this.state.cart}
          keyExtractor={item => item.id}
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
                    unavailableOptionsValues:
                      lineItem.variant.product.unavailableOptionsValues,
                  });
                }}
                isDeleted={lineItem.deletedAt !== null}
                isUnavailable={this.isLineItemUnavailable(lineItem)}
                onPressDeleteProduct={() => this.removeItemFromBasket(lineItem.id)}
              />
            </View>
          )}
        />
        <View style={styles.totalPriceContainer}>
          <Title font={font} size={15} color="#484848" weight="500">
            {translate('total_price')}
          </Title>
          <Title font={font} size={18} color="#484848" weight="600">
            {this.totalTTC()}
            €
          </Title>
        </View>
      </Container>
    );
  }
}

Basket.propTypes = {};
Basket.defaultProps = {};

export default withApollo(Basket);

const styles = StyleSheet.create({
  totalPriceContainer: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: 'rgba(249, 249, 249, 0.8)',
    borderColor: 'rgba(151, 151, 151, 0.5)',
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.select({
      ios: 20,
      android: StatusBar.currentHeight,
    }),
  },
});
