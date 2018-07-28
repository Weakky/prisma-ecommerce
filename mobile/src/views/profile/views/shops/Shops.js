import React, { PureComponent } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import Container from '../../../../components/layout/Container';
import FullLoading from '../../../../components/loading/FullLoading';
import Title from '../../../../components/title/Title';
import BigRedButton from '../../../../components/big-red-button/BigRedButton';

import Colors from '../../../../statics/colors';
import font from '../../../../assets/fonts';
import Banner from '../../../../components/banner/Banner';
import { translate } from '../../../../i18n';

const Shop = ({ shop, isSelectedShop, selectShop }) => {
  return (
    <TouchableOpacity
      style={[
        { padding: 16, marginBottom: 8 },
        {
          backgroundColor: isSelectedShop
            ? 'rgba(204, 97, 85, 0.4)'
            : 'rgba(240, 240, 240, 1)',
        },
      ]}
      onPress={() => selectShop(shop.id)}
    >
      <Title color={Colors.text} font={font} size={18}>
        {shop.name}
      </Title>
    </TouchableOpacity>
  );
};

Shop.propTypes = {
  shop: PropTypes.object,
  isSelectedShop: PropTypes.bool,
  selectShop: PropTypes.func,
};

class Shops extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedShopId: null,
    };

    this.selectShop = this.selectShop.bind(this);
    this.updateSelectedShop = this.updateSelectedShop.bind(this);
  }

  selectShop({ shopId }) {
    this.setState({ selectedShopId: shopId });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      this.setState({
        selectedShopId: nextProps.data.me.selectedShop.id,
      });
    }
  }

  async updateSelectedShop() {
    this.setState({ loading: true });
    await this.props.updateSelectedShop({ selectedShopId: this.state.selectedShopId });
    this.setState({ loading: false });
  }

  render() {
    if (this.props.data.loading) {
      return <FullLoading />;
    }

    const currentShop = this.props.data.me.selectedShop;

    return (
      <Container
        navigation={this.props.navigation}
        title={translate('your_shop')}
        innerStyle={{ flex: 1 }}
      >
        <ScrollView>
          <View
            style={{
              marginBottom: 16,
            }}
          >
            <Title style={{ marginBottom: 8 }} size={16} color={Colors.text}>
              {translate('current_shop')}
            </Title>
            <Banner
              {...currentShop}
              shopId={currentShop.id}
              inverted={true}
              selected={this.state.selectedShopId === currentShop.id}
              onBannerSelected={this.selectShop}
            />
          </View>
          {this.props.data.allShops
            .filter(shop => shop.id !== currentShop.id)
            .map(shop => (
              <View key={shop.id} style={{ marginBottom: 16 }}>
                <Banner
                  {...shop}
                  shopId={shop.id}
                  inverted={true}
                  selected={this.state.selectedShopId === shop.id}
                  onBannerSelected={this.selectShop}
                />
              </View>
            ))}
        </ScrollView>
        <BigRedButton
          style={{ marginTop: 16, marginBottom: 8 }}
          label={translate('change_shop')}
          onPress={this.updateSelectedShop}
          loading={this.state.loading}
          disabled={this.state.selectedShopId === currentShop.id}
        />
      </Container>
    );
  }
}

Shops.propTypes = {};
Shops.defaultProps = {};

export default Shops;
