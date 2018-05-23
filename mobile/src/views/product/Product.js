import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Picker from 'react-native-picker';

import Title from '../../components/title/Title';
import FullLoading from '../../components/loading/FullLoading';

import queries from './queries.gql';

import colors from '../../statics/colors';
import font from '../../assets/fonts';
import styles from './Product.styles';

const propTypes = {
  productId: PropTypes.string.isRequired,
  unavailableOptionsValues: PropTypes.array,
};

const defaultProps = {
  productId: '',
  unavailableOptionsValues: [],
};

const PickerActivator = props => (
  <TouchableOpacity onPress={props.promptPicker} style={styles.pickerActivatorContainer}>
    <Title
      style={{ marginRight: 10 }}
      font={font}
      size={10}
      color={props.value ? 'rgba(72, 72, 72, 1)' : 'rgba(72, 72, 72, 0.24)'}
    >
      {`${props.prefix}: ${props.value || props.defaultValue}`}
    </Title>
    <View style={styles.pickerActivatorChoiceIcon}>
      <EntypoIcons name="triangle-down" color="rgba(72, 72, 72, 0.55)" />
    </View>
  </TouchableOpacity>
);

PickerActivator.propTypes = {
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  prefix: PropTypes.string,
  promptPicker: PropTypes.func,
};

const Selectors = props => (
  <View style={{ marginTop: 20 }}>
    {props.options.map(option => {
      return (
        <PickerActivator
          key={option.id}
          prefix={option.name.toUpperCase()}
          defaultValue=""
          value={props.selectedOptions[option.id] || ''}
          promptPicker={() => props.configPicker(option)}
        />
      );
    })}
    <PickerActivator
      prefix="QUANTITÉ"
      defaultValue="1"
      value={props.quantity}
      promptPicker={() => {
        props.configPicker(null, true);
      }}
    />
  </View>
);

const ProductSheet = ({
  product,
  selectedOptions,
  unavailableOptionsValues,
  quantity,
  configPicker,
}) => (
  <View style={styles.productSheetContainer}>
    <View style={styles.imageContainer}>
      <Image
        resizeMode="contain"
        source={{ uri: product.imageUrl }}
        style={styles.image}
      />
    </View>

    <View style={styles.productSheetDetails}>
      <Title font={font} size={18} color={colors.text}>
        {product.name.toUpperCase()}
      </Title>
      <Title style={{ marginTop: 3 }} font={font} size={11} color="rgba(72, 72, 72, 0.4)">
        {product.brand.name.toUpperCase()}
      </Title>
    </View>

    <Selectors
      options={product.options}
      selectedOptions={selectedOptions}
      unavailableOptionsValues={unavailableOptionsValues}
      quantity={quantity}
      configPicker={configPicker}
    />

    <Title font={font} weight="600" size={18} style={{ marginBottom: 10, marginTop: 20 }}>
      {product.displayPrice}&nbsp;€
    </Title>

    <Title
      size={12}
      font={font}
      style={StyleSheet.flatten(styles.productSheetDescription)}
    >
      {product.description || 'Default description'}
    </Title>
  </View>
);

class Product extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      selectedOptions: {},
      quantity: 1,
      addingItemToCart: false,
    };

    this.configPicker = this.configPicker.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  async componentWillMount() {
    const { data } = await this.props.client.query({
      query: queries.queryProductInfo,
      variables: { productId: this.props.productId },
    });

    // TODO: Later, allow to edit a variant of a cart's lineItem ?
    // => Navigate to Product view with options already configured

    // let selectedOptions = {};
    //
    // if (this.props.lineItem) {
    //   selectedOptions = this.props.lineItem.variant.selectedOptions.reduce((acc, selectedOption) => {
    //     acc[selectedOption.option.id] = selectedOption.value.name;
    //     return acc;
    //   }, {});
    // }

    this.setState({
      product: data.product,
    });
  }

  configPicker(option, forQuantity = false) {
    const optionsValues =
      option &&
      option.values
        .filter(
          value =>
            !this.props.unavailableOptionsValues.find(
              optionValue => optionValue.id === value.id,
            ),
        )
        .map(value => value.name);
    const quantities = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    Picker.init({
      pickerData: forQuantity ? quantities : optionsValues,
      selectedValue: [forQuantity ? '1' : optionsValues[0]],
      onPickerConfirm: ([selectedOption]) => {
        if (!selectedOption) {
          return;
        }

        if (forQuantity) {
          return this.setState({ quantity: selectedOption });
        }

        this.setState({
          selectedOptions: {
            ...this.state.selectedOptions,
            [option.id]: selectedOption,
          },
        });
      },
      pickerTitleText: '',
      pickerConfirmBtnColor: [204, 97, 85, 1],
      pickerCancelBtnColor: [204, 97, 85, 1],
      pickerConfirmBtnText: 'Confirmer',
      pickerCancelBtnText: 'Annuler',
    });

    Picker.show();
  }

  findVariantFromSelectedOptions() {
    if (this.state.selectedOptions.length < this.state.product.options.length) {
      return null;
    }

    const variant = this.state.product.variants.find(variant => {
      return variant.selectedOptions.every(selectedOption => {
        return (
          this.state.selectedOptions[selectedOption.option.id] &&
          this.state.selectedOptions[selectedOption.option.id] ===
            selectedOption.value.name
        );
      });
    });

    if (!variant) {
      return null;
    }

    return {
      variantId: variant.id,
      quantity: parseInt(this.state.quantity),
    };
  }

  async addItemToCart() {
    const variant = this.findVariantFromSelectedOptions();

    if (variant) {
      this.setState({ addingItemToCart: true });
      await this.props.addItemToCart(variant);
      this.setState({ addingItemToCart: false });
    }
  }

  shouldButtonBeEnabled() {
    return !!this.findVariantFromSelectedOptions() && !this.state.addingItemToCart;
  }

  render() {
    if (!this.state.product) {
      return <FullLoading />;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.close}
        >
          <Icon name="ios-arrow-back-outline" size={21} color={colors.text} />
        </TouchableOpacity>
        <ProductSheet
          product={this.state.product}
          selectedOptions={this.state.selectedOptions}
          unavailableOptionsValues={this.props.unavailableOptionsValues}
          quantity={this.state.quantity}
          configPicker={this.configPicker}
        />

        <TouchableOpacity
          style={styles.addToCart}
          onPress={this.addItemToCart}
          disabled={!this.shouldButtonBeEnabled()}
        >
          <Icon name="ios-cart" color={colors.white} size={35} />
        </TouchableOpacity>
      </View>
    );
  }
}

Product.propTypes = propTypes;
Product.defaultProps = defaultProps;

export default Product;
