import React, { Component } from 'react';
import {Platform, StatusBar, View, StyleSheet, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

import Colors from '../../statics/colors';
import Title from '../../components/title/Title';

import {translate} from '../../i18n'
import {FindProductButton} from '../filters/Filters'
import Card from '../../components/card/Card'

const SimpleProductList = (props) => (
  <View style={{ flex: 1, marginBottom: 20 }}>
    <Title size={22} color={Colors.text}>
      {props.title}
    </Title>
    {
      props.orderableProducts.map(({ id, product }) => (
        <View key={id} style={{ padding: 5 }}>
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
            source={{ uri: product.imageUrl }}
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

class Home extends Component {
  render() {

    if (this.props.data.loading) {
      return null;
    }

    const { me, shopMetadata } = this.props.data;

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
        <ScrollView contentContainerStyle={{ padding: 15 }}>
          <View>
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
            <View style={{ marginTop: 20, marginBottom: 50, padding: 10, backgroundColor: 'rgba(249,249,249,0.8)', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(151,151,151,0.8)' }}>
              <Text>MESSAGE OF THE DAY (TODO LATER)</Text>
            </View>
          </View>
          {
            me.orders.length === 0 && (
              <FindProductButton onPress={() => { this.props.navigation.navigate('Browse') }}/>
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
        </ScrollView>
      </View>
    );
  }
}

Home.propTypes = {};
Home.defaultProps = {};

export default Home;
