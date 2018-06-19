import React from 'react';

import { StyleSheet, ActivityIndicator, View, StatusBar, AsyncStorage } from 'react-native';
import Title from '../../../components/title/Title';

import Colors from '../../../statics/colors';
import { translate } from '../../../i18n';
import StorageKeys from '../../../statics/storage-keys';

class FinalStep extends React.PureComponent {

  async componentWillMount() {
    const { data } =  await this.props.signUp({
      email: this.props.email,
      password: this.props.password,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      shopId: this.props.selectedShopId
    });

    await AsyncStorage.setItem(StorageKeys.GC_TOKEN, data.signup.token);

    StatusBar.setBarStyle('dark-content');
    this.props.navigation.navigate('App');
  }

  render() {
    return (
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default FinalStep;
