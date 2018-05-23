import React, { Component } from 'react';
import { FlatList, Platform, StatusBar, View, StyleSheet } from 'react-native';

import sumBy from 'lodash/sumBy';
import { withApollo } from 'react-apollo';
import { Observable } from 'apollo-client-preset';

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
    return sumBy(
      this.state.cart,
      lineItem => lineItem.quantity * lineItem.variant.price,
    ).toFixed(2);
  }

  totalHT() {
    return (this.totalTTC() * 0.8).toFixed(2);
  }

  totalVAT() {
    return (this.totalTTC() - this.totalHT()).toFixed(2);
  }

  renderContinueButton() {
    if (this.state.cart.length === 0) {
      return null;
    }

    return (
      <Button
        label={translate('continue')}
        onPress={() =>
          this.props.navigation.navigate('Recap', {
            totalTTC: this.totalTTC(),
            totalHT: this.totalHT(),
            totalVAT: this.totalVAT(),
          })
        }
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
                onPressDeleteProduct={() => this.removeItemFromBasket(lineItem.id)}
              />
            </View>
          )}
        />
        <View style={styles.totalPriceContainer}>
          <Title font={font} size={15} color="#484848" weight="500">
            {translate('total_price')}
          </Title>
          <Title font={font} size={18} color="#484848" weight="700">
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
