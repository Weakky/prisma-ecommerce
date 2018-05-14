import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../statics/colors'
import Title from '../../components/title/Title';
import ModalNavigationBar from '../../components/modal-navigation-bar/ModalNavigationBar';

import EnhancedFilters from './HOC/FiltersHOC';

import CategoryFilters from './filterByFields/CategoryFilters';
import BrandFilters from './filterByFields/BrandFilters';
import OptionsFilters from './filterByFields/OptionsFilters';

import styles from './Filters.styles'
import {translate} from '../../i18n'

export const FindProductButton = (props) => (
  <TouchableOpacity
    style={styles.findProductContainer}
    onPress={props.onPress}
  >
    <Title size={16} weight="100" style={{ marginRight: 14 }} color={Colors.white}>
      {translate('find_your_product')}
    </Title>
    <View style={{ marginTop: 3 }}>
      <Ionicons size={22} color={Colors.white} name="ios-search" />
    </View>
  </TouchableOpacity>
)

FindProductButton.propTypes = {
  onPress: PropTypes.func,
};

const Filters = (props) => {
  if (props.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20,
      }}
    >
      { props.asModal && (
        <ModalNavigationBar
          rightText="Appliquer"
          onPressRight={props.applyFilters}
          closeModal={props.closeModal}
        />
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CategoryFilters
          filtersEnabled={props.filtersEnabled}
          filtersValues={props.filtersValues}
          setFilter={props.setFilter}
          filterType={props.filterType}
        />
        <BrandFilters
          filtersEnabled={props.filtersEnabled}
          filtersValues={props.filtersValues}
          setFilter={props.setFilter}
          filterType={props.filterType}
        />
        <OptionsFilters
          filtersEnabled={props.filtersEnabled}
          filtersValues={props.filtersValues}
          setFilter={props.setFilter}
          filterType={props.filterType}
        />
      </ScrollView>
      { !props.asModal && (
        <FindProductButton onPress={props.applyFilters} />
      )}
    </View>
  );
}

Filters.propTypes = {
  filtersEnabled: PropTypes.object,
  filterType: PropTypes.any,
  applyFilters: PropTypes.func,
  closeModal: PropTypes.func,
  asModal: PropTypes.bool,
  setFilter: PropTypes.func,
};

Filters.defaultProps = {
  filtersEnabled: {},
  closeModal: () => {},
  asModal: false,
  applyFilters: () => {},
};

export default EnhancedFilters(Filters);
