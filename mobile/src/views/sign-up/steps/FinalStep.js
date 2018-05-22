import React from 'react';

import { StyleSheet, ActivityIndicator, View } from 'react-native';
import Title from '../../../components/title/Title';

import Colors from '../../../statics/colors';
import { translate } from '../../../i18n';

const FinalStep = () => (
  <View style={[styles.container, { justifyContent: 'space-around' }]}>
    <Title size={22} color={Colors.white}>
      {translate('thanks_trust')}
    </Title>
    <ActivityIndicator color="white" animating />
    <Title size={16} color={Colors.white}>
      {translate('gathering_articles')}
    </Title>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default FinalStep;
