import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import font from '../../assets/fonts';
import Colors from '../../statics/colors/index';

import Title from '../../components/title/Title';
import { translate } from '../../i18n';

const SearchBox = props => (
  <TouchableOpacity
    style={{ padding: 12 }}
    onPress={() => props.navigation.navigate('Search')}
  >
    <View style={{ flexDirection: 'row' }}>
      <Ionicons size={18} name="ios-search-outline" />
      <Title
        style={{ marginLeft: 10 }}
        color={Colors.text}
        size={12}
        weight="500"
        font={font}
      >
        {translate('know_what_you_want')}
      </Title>
    </View>
  </TouchableOpacity>
);

export default SearchBox;
