import React, { PureComponent } from 'react';

import Banner from '../../../components/banner/Banner';
import { View } from 'react-native';

import Colors from '../../../statics/colors';
import Title from '../../../components/title/Title';
import Button from '../../../components/button/Button';
import NavigationButton from '../../../components/navigation-button/NavigationButton';
import { translate } from '../../../i18n';

const physicalShopData = {
  shop1: {
    shop: 'Shop1',
    address: '4671 Lightning Point Drive',
    postal: '54550',
    city: 'Memphis',
    tel: '901-542-7005',
    opening: 'Opened on Monday to Saturday, from 9AM to 7PM',
  },
  shop2: {
    shop: 'Shop2',
    address: '4671 Lightning Point Drive',
    postal: '54550',
    city: 'Memphis',
    tel: '901-542-7005',
    opening: 'Opened on Monday to Saturday, from 9AM to 7PM',
  },
};

class ThirdStep extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedShop: null,
    };

    this.onBannerSelected = this.onBannerSelected.bind(this);
  }

  onBannerSelected({ shop }) {
    this.setState({ selectedShop: shop });
  }

  render() {
    return (
      <View>
        <View style={{ marginLeft: 20 }}>
          <NavigationButton onPress={() => this.props.previousStep()} back />
          <Title
            style={{ marginBottom: 20, marginTop: 10 }}
            color={Colors.white}
            size={22}
          >
            {translate('choose_your_store')}
          </Title>
          <Title size={14} color={Colors.white} style={{ marginBottom: 30 }}>
            {translate('change_your_store_later')}
          </Title>
        </View>
        <Banner
          {...physicalShopData.shop1}
          selected={this.state.selectedShop === physicalShopData.shop1.shop}
          onBannerSelected={this.onBannerSelected}
        />
        <Banner
          {...physicalShopData.shop2}
          selected={this.state.selectedShop === physicalShopData.shop2.shop}
          onBannerSelected={this.onBannerSelected}
        />
        {this.state.selectedShop && (
          <Button
            style={{ marginLeft: 20, marginTop: 40, marginBottom: 10 }}
            label={translate('finish_sign_up')}
            onPress={() => this.props.nextStep(this.state)}
            backgroundColor={Colors.white}
            labelColor={Colors.red}
          />
        )}
      </View>
    );
  }
}

ThirdStep.propTypes = {};
ThirdStep.defaultProps = {};

export default ThirdStep;
