import React from 'react';
import {TouchableOpacity, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Colors from '../../statics/colors/index'

import Title from '../../components/title/Title'
import {translate} from '../../i18n'

const SearchBox = props => (
  <TouchableOpacity
    style={{ padding: 12 }}
    onPress={() => props.navigation.navigate('SearchModal')}
  >
    <View style={{ flexDirection: 'row' }}>
      <Ionicons size={18} name="ios-search-outline" />
      <Title
        style={{ marginLeft: 10 }}
        color={Colors.text}
        size={12}
        weight="100"
      >
        {translate('know_what_you_want')}
      </Title>
    </View>
  </TouchableOpacity>
);

export default SearchBox;
