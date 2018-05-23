import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import SubTotal from './sub-total/SubTotal';

import Colors from '../../statics/colors';
import font from '../../assets/fonts';
import Title from '../title/Title';
import { translate } from '../../i18n';

const propTypes = {
  source: PropTypes.object,
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.number,
  totalPrice: PropTypes.number,
  selectedOptions: PropTypes.array,
  quantity: PropTypes.number,
  font: PropTypes.string,
  onPressViewProduct: PropTypes.func.isRequired,
  onPressDeleteProduct: PropTypes.func.isRequired,
};

const defaultProps = {
  source: require('../../assets/logo.png'),
  name: 'Bubble Gum',
  brand: 'ALFALIQUID',
  totalPrice: 11.8,
  price: 5.95,
};

const BasketCard = props => (
  <View>
    <View
      style={{
        backgroundColor: 'rgba(249, 249, 249, 0.8)',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 50, height: 50, margin: 5 }} source={props.source} />
        <View
          style={{
            height: 60,
            width: StyleSheet.hairlineWidth,
            backgroundColor: '#ddd',
            margin: 3,
          }}
        />
        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 5, marginTop: 10 }}>
          <View
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Title font={font} size={12} weight="500">
              {props.name.toUpperCase()}
              <Title font={font} size={8} weight="600" color="rgba(72, 72, 72, 0.4)">
                &nbsp;/&nbsp;{props.brand.toUpperCase()}
              </Title>
            </Title>
            <TouchableOpacity
              style={{ marginRight: 10, marginTop: -8 }}
              onPress={props.onPressDeleteProduct}
            >
              <Title
                font={font}
                weight="600"
                size={10}
                color={Colors.red}
                style={{ marginTop: 5 }}
              >
                {translate('remove_product')}
              </Title>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <TouchableOpacity onPress={props.onPressViewProduct}>
                <Title
                  font={font}
                  weight="300"
                  size={11}
                  color="#484848"
                  style={{ marginTop: 5 }}
                >
                  {translate('see_product')}
                </Title>
              </TouchableOpacity>
              <View style={{ marginTop: 5, flex: 1 }}>
                {props.selectedOptions.map(selectedOption => (
                  <View
                    key={selectedOption.id}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}
                  >
                    <Title
                      style={{ marginRight: 5 }}
                      font={font}
                      size={8}
                      color="rgba(71,71,71,0.6)"
                      weight="600"
                    >
                      {selectedOption.option.name.toUpperCase()}
                    </Title>
                    <Title font={font} size={11} color="rgba(71,71,71,0.8)" weight="600">
                      {selectedOption.value.name}
                    </Title>
                  </View>
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={{
                height: 43,
                width: 43,
                borderRadius: 5,
                backgroundColor: 'rgba(221,221,221, 0.3)',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Title font={font} size={28} color="rgba(0,0,0,0.7)" weight="300">
                {props.quantity}
              </Title>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    <SubTotal totalPrice={props.totalPrice} />
  </View>
);

BasketCard.propTypes = propTypes;
BasketCard.defaultProps = defaultProps;

export default BasketCard;
