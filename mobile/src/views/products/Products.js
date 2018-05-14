import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';

import NavigationButton from '../../components/navigation-button/NavigationButton';
import Title from '../../components/title/Title';
import Card from '../../components/card/Card';
import Colors from '../../statics/colors';

import Filters from '../filters/Filters';
import {translate} from '../../i18n'

class Products extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filtersModalVisible: false,
      filtersEnabled: props.filtersEnabled,
      filtersValues: props.filtersValues,
      refreshing: false,
    };

    this.applyFilters = this.applyFilters.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.loadMoreProducts = this.loadMoreProducts.bind(this);
    this.refetchProducts = this.refetchProducts.bind(this);
  }

  componentWillMount() {
    this.props.subscribeToProductUpdates();
  }

  applyFilters({ filtersEnabled, filtersValues }) {
    this.setState({
      filtersModalVisible: false,
      filtersEnabled,
      filtersValues
    }, () => {
      this.refetchProducts();
    });
  }

  refetchProducts() {
    return this.props.refetchProducts({
      filtersEnabled: this.state.filtersEnabled,
      filtersValues: this.state.filtersValues,
      filterType: this.props.filterType,
    });
  }

  closeModal() {
    this.setState({ filtersModalVisible: false });
  }

  renderFiltersModal() {
    return (
      <Modal
        visible={this.state.filtersModalVisible}
        animationType="slide"
        onRequestClose={() => this.setState({ filtersModalVisible: false })}
      >
        <Filters
          asModal
          filterType={this.props.filterType}
          closeModal={this.closeModal.bind(this)}
          applyFilters={this.applyFilters}
          filtersEnabled={this.state.filtersEnabled}
        />
      </Modal>
    );
  }

  loadMoreProducts() {
    if (this.props.hasMore() && !this.state.refreshing) {
      this.setState({ refreshing: true }, () => {
        this.props.loadMoreProducts().then(() => {
          this.setState({ refreshing: false });
        });
      });
    }
  }

  render() {
    if (this.props.data.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator animating />
        </View>
      );
    }

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
        {this.renderFiltersModal()}
        <View style={{ padding: 15 }}>
          <NavigationButton
            dark
            back
            onPress={() => this.props.navigation.goBack()}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title size={22} color={Colors.text}>
              {translate('your_results')}
            </Title>
            <TouchableOpacity
              onPress={() => this.setState({ filtersModalVisible: true })}
            >
              <Title size={14} color={Colors.text}>
                {translate('filter')}
              </Title>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={this.props.data.products.edges}
          keyExtractor={({ node: product }) => product.id}
          renderItem={({ item: { node: product } }) => (
            <View style={{ padding: 5 }}>
              <Card
                onPress={() =>
                  this.props.navigation.navigate('Product', {
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
          )}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMoreProducts}
        />
      </View>
    );
  }
}

Products.propTypes = {
  filtersEnabled: PropTypes.object,
  filtersValues: PropTypes.object,
  filterType: PropTypes.string.isRequired,
};

Products.defaultProps = {
  filtersEnabled: {},
  filtersValues: {},
};

export default Products;
