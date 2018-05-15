import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, ScrollView, View } from 'react-native';

import ModalNavigationBar from '../../components/modal-navigation-bar/ModalNavigationBar';
import BigRedButton from '../../components/big-red-button/BigRedButton'

import EnhancedFilters from './HOC/FiltersHOC';

import CategoryFilters from './filterByFields/CategoryFilters';
import BrandFilters from './filterByFields/BrandFilters';
import OptionsFilters from './filterByFields/OptionsFilters';

import Colors from '../../statics/colors'
import styles from './Filters.styles'
import {translate} from '../../i18n'

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
        <BigRedButton
          onPress={props.applyFilters}
          label={translate('find_your_product')}
          icon="ios-search"
        />
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
