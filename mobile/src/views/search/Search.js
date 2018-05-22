import React from 'react';
import { View, FlatList, Keyboard, StyleSheet } from 'react-native';

import { EnhancedSearch } from './SearchHOC';

import Input from '../../components/input/Input';
import Colors from '../../statics/colors/index';

import Title from '../../components/title/Title';
import ModalNavigationBar from '../../components/modal-navigation-bar/ModalNavigationBar';
import Card from '../../components/card/Card';
import { translate } from '../../i18n';

const Search = props => (
  <View style={styles.container}>
    <ModalNavigationBar
      onPressRight={props.resetSearch}
      rightText={translate('reinitialize')}
      closeModal={() => Keyboard.dismiss() || props.navigation.goBack()}
    />
    <Input
      onSubmit={Keyboard.dismiss}
      autoFocus
      onChangeText={props.performSearch}
      placeHolder={translate('what_you_looking_for')}
      placeHolderColor={Colors.grey}
      cursorColor={Colors.grey}
      returnKey="done"
      style={styles.searchInput}
      value={props.queryText}
    />

    {props.products.length > 0 && (
      <Title size={20} color={Colors.text} style={{ marginBottom: 15 }}>
        {translate('your_results')}
      </Title>
    )}

    <FlatList
      data={props.products}
      keyExtractor={item => item.node.id}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag"
      renderItem={({ item: { node: product } }) => (
        <View key={product.id} style={{ marginBottom: 5 }}>
          <Card
            onPress={() =>
              props.navigation.navigate('Product', {
                productId: product.id,
                unavailableOptionsValues: product.unavailableOptionsValues,
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
    />
  </View>
);

Search.propTypes = {};
Search.defaultProps = {};

export default EnhancedSearch(Search);
