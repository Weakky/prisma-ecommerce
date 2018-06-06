import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

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
  isDeleted: PropTypes.bool,
  isUnavailable: PropTypes.bool,
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

const ItemDeletedOverlay = (props) => (
  <TouchableOpacity
    onPress={props.removeItemFromCart}
    style={{ position: 'absolute', width: props.width, height: props.height, backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 100, justifyContent: 'center', alignItems: 'center', padding: 15 }}
  />
);

ItemDeletedOverlay.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  removeItemFromCart: PropTypes.func
};

const ItemDeletedSubBanner = (props) => (
  <View
    style={{
      padding: 7,
      backgroundColor: 'rgba(215, 133, 46, 0.8)',
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#ddd',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        fontSize: 11,
        color: 'white'
      }}
    >
      { props.text }
    </Text>
  </View>
);

ItemDeletedSubBanner.propTypes = {
  text: PropTypes.string,
};

// Find a way to put an overlay over the basket card
class BasketCard extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      containerSize: null
    };
  }

  isValid() {
    return !this.props.isDeleted && !this.props.isUnavailable;
  }

  render() {
    return (
      <View onLayout={(event) => {
        const { width , height} = event.nativeEvent.layout;
        this.setState({ containerSize: { width, height } });
      }}>
        <View style={styles.basketCardContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.thumbnail} source={this.props.source} />
            <View style={styles.separator} />
            <View style={styles.basketCardSubContainer}>
              <View style={styles.topContainer}>
                <Title font={font} size={12} weight="500">
                  {this.props.name.toUpperCase()}
                  <Title font={font} size={8} weight="600" color="rgba(72, 72, 72, 0.4)">
                    &nbsp;/&nbsp;{this.props.brand.toUpperCase()}
                  </Title>
                </Title>
                <TouchableOpacity
                  style={{ marginRight: 10, marginTop: -8 }}
                  onPress={this.props.onPressDeleteProduct}
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
              <View style={styles.bottomContainer}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <TouchableOpacity onPress={this.props.onPressViewProduct}>
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
                    {this.props.selectedOptions.map(selectedOption => (
                      <View key={selectedOption.id} style={styles.optionContainer}>
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
                {this.isValid() && (
                  <TouchableOpacity style={styles.quantityContainer}>
                    <Title font={font} size={28} color="rgba(0,0,0,0.7)" weight="300">
                      {this.props.quantity}
                    </Title>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
        {this.isValid() && (
          <SubTotal totalPrice={this.props.totalPrice} />
        )}
        {!this.isValid() && (
          <ItemDeletedSubBanner
            text={this.props.isDeleted ? translate('product_deleted') : translate('product_not_available')}
          />
        )}
      </View>
    );
  }
}

BasketCard.propTypes = propTypes;
BasketCard.defaultProps = defaultProps;

export default BasketCard;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  quantityContainer: {
    height: 43,
    width: 43,
    borderRadius: 5,
    backgroundColor: 'rgba(221,221,221, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 8
  },
  topContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  basketCardSubContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    marginTop: 10,
  },
  separator: {
    height: 60,
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    margin: 3,
  },
  thumbnail: { width: 50, height: 50, margin: 5 },
  basketCardContainer: {
    backgroundColor: 'rgba(249, 249, 249, 0.8)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
