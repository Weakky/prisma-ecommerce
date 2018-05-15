import React, {Component} from 'react';
import {Platform, StatusBar, View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

import Colors from '../../statics/colors';
import Title from '../../components/title/Title';

import {translate} from '../../i18n'
import Card from '../../components/card/Card'
import font from '../../assets/fonts'
import BigRedButton from '../../components/big-red-button/BigRedButton'
import styles from './Home.styles'

//TODO: Code add to cart button
const SimpleProductList = (props) => (
  <View style={{flex: 1, marginBottom: 20}}>
    <Title size={18} color={Colors.text}>
      {props.title}
    </Title>
    {
      props.orderableProducts.map(({id, product}) => (
        <View key={id} style={{padding: 5}}>
          <Card
            onPress={() =>
              props.navigation.navigate('Product', {
                productId: product.id,
                unavailableOptionsValues: product.unavailableOptionsValues
              })
            }
            loading={false}
            brand={product.brand.name}
            name={product.name}
            source={{uri: product.imageUrl}}
            price={product.displayPrice}
            unavailableOptionsValues={product.unavailableOptionsValues}
          />
        </View>
      ))
    }
  </View>
)

SimpleProductList.propTypes = {
  title: PropTypes.string,
  orderableProducts: PropTypes.array,
}

const RecapRow = (props) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, marginTop: 4 }}>
    <Title font={font} size={12} weight={props.bold && "700"} color={Colors.text}>{props.title}</Title>
    <Title font={font} size={12} weight={props.bold && "700"} color={Colors.text}>{props.value}</Title>
  </View>
)

const Separator = () => (
  <View style={{
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.85,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(151, 151, 151, 0.3)',
    marginBottom: 8,
    marginTop: 8,
  }}/>
)

const Ticket = (props) => (
  <View style={{ backgroundColor: 'rgba(249, 249, 249, 0.8)', borderColor: 'rgba(151, 151, 151, 0.4)', borderWidth: StyleSheet.hairlineWidth, padding: 15, marginBottom: 20}}>
    <Title style={{ marginBottom: 10 }} font={font} size={10} weight="600" color="rgba(72,72,72,0.4)">
      {translate('your_order')}
    </Title>
    {
      props.order.lineItems.map(lineItem => (
        <RecapRow key={lineItem.id} title={`${lineItem.quantity} x ${lineItem.variant.product.name}`} value={`${lineItem.variant.price * lineItem.quantity}€`}/>
      ))
    }
    <Separator />
    <RecapRow
      bold
      title={translate('total_price')}
      value={props.order.totalPrice}
    />
  </View>
)

const SmallRedButton = (props) => (
  <TouchableOpacity
    style={styles.smallRedButton}
    onPress={props.onPress}
  >
    <Title size={12} font={font} weight="400" color={Colors.white}>
      {props.label}
    </Title>
  </TouchableOpacity>
)

const LastOrder = (props) => (
  <View style={{ marginBottom: 20 }}>
    <Title style={{ marginBottom: 20 }} size={18} color={Colors.text} >{translate('your_last_order')}</Title>
    <Ticket order={props.order}/>
    {!props.clickedOnAddToCart && (
      <BigRedButton
        onPress={props.onPressAddToCart}
        label={translate('add_to_cart')}
      />
    )}
    {props.clickedOnAddToCart && (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <SmallRedButton label={translate('replace_with_cart')} onPress={() => props.addOrderToCart({ orderId: props.order.id, replace: true })}/>
        <SmallRedButton label={translate('merge_with_cart')} onPress={() => props.addOrderToCart({ orderId: props.order.id, replace: false })}/>
      </View>
    )}
  </View>
)

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedOnAddToCart: false,
    };

    this.onPressAddToCart = this.onPressAddToCart.bind(this);
    this.addOrderToCart = this.addOrderToCart.bind(this);
  }

  onPressAddToCart() {
    this.setState({ clickedOnAddToCart: true });
  }

  async addOrderToCart({ orderId, replace }) {
    this.setState({ loading: true });
    await this.props.addOrderToCart({ orderId, replace });
    this.setState({
      loading: false,
      clickedOnAddToCart: false,
    });
  }

  render() {
    if (this.props.data.loading) {
      return null;
    }

    const {me, shopMetadata} = this.props.data;

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
        <ScrollView contentContainerStyle={{padding: 15}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title size={22} color={Colors.text}>
              {`${translate('hello')}, ${capitalize(me.firstName)} !`}
            </Title>
          </View>
          <View style={{
            marginTop: 20,
            marginBottom: 20,
            padding: 15,
            backgroundColor: 'rgba(240, 240, 240, 0.4)',
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'rgba(151, 151, 151, 0.8)'
          }}>
            <Text>MESSAGE OF THE DAY (TODO LATER)</Text>
          </View>
          {
            me.orders.length === 0 && (
              <BigRedButton
                onPress={() => this.props.navigation.navigate('Browse')}
                label={translate('find_your_product')}
                icon="ios-search"
              />
            )}
          {
            me.orders.length > 0 && (
              <LastOrder
                order={me.orders[0]}
                onPressAddToCart={this.onPressAddToCart}
                clickedOnAddToCart={this.state.clickedOnAddToCart}
                addOrderToCart={this.addOrderToCart}
              />
            )
          }
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
        </ScrollView>
      </View>
    );
  }
}

Home.propTypes = {};
Home.defaultProps = {};

export default Home;
