import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Banner from '../../../components/banner/Banner';
import { View } from 'react-native';

import Colors from '../../../statics/colors';
import Title from '../../../components/title/Title';
import Button from '../../../components/button/Button';
import NavigationButton from '../../../components/navigation-button/NavigationButton';
import { translate } from '../../../i18n';

class ThirdStep extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedShopId: null,
    };

    this.onBannerSelected = this.onBannerSelected.bind(this);
  }

  onBannerSelected({ shopId }) {
    this.setState({ selectedShopId: shopId });
  }

  render() {
    if (this.props.data.loading) {
      return null;
    }

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
        {
          this.props.data.allShops.map(shop => (
            <Banner
              key={shop.id}
              {...shop}
              shopId={shop.id}
              selected={this.state.selectedShopId === shop.id}
              onBannerSelected={this.onBannerSelected}
            />
          ))
        }
        {this.state.selectedShopId && (
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

export default graphql(gql`{
    allShops {
      id
      name
      address
      zipCode
      city
      phoneNumber
      openingHours
    }
  }`)(ThirdStep);
