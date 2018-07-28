import React, { PureComponent } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import SettingsList from 'react-native-settings-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Container from '../../components/layout/Container';

import font from '../../assets/fonts';
import Colors from '../../statics/colors';
import { translate } from '../../i18n';

export default class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container innerStyle={styles.container} title={translate('your_settings')}>
        <SettingsList
          borderColor="#eee"
          defaultTitleStyle={styles.titleStyle}
          defaultItemSize={65}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <SettingsList.Item
            title={translate('your_account')}
            icon={
              <View style={styles.iconContainer}>
                <Ionicons name="ios-contact-outline" size={37} color={Colors.text} />
              </View>
            }
            onPress={() => null}
          />
          <SettingsList.Item
            title={translate('your_orders')}
            icon={
              <View style={styles.iconContainer}>
                <Ionicons name="ios-cart-outline" size={37} color={Colors.text} />
              </View>
            }
            onPress={() => this.props.navigation.navigate('Orders')}
          />
          <SettingsList.Item
            title={translate('your_shop')}
            icon={
              <View style={styles.iconContainer}>
                <Ionicons name="ios-home-outline" size={37} color={Colors.text} />
              </View>
            }
            onPress={() => this.props.navigation.navigate('Shops')}
          />
          <SettingsList.Item
            title={translate('logout')}
            titleStyle={[styles.titleStyle, { color: Colors.red }]}
            icon={
              <View style={styles.logoutIconContainer}>
                <Ionicons name="ios-power-outline" size={32} color={Colors.red} />
              </View>
            }
            onPress={async () => {
              await AsyncStorage.clear();
              this.props.navigation.navigate('Auth');
            }}
          />
        </SettingsList>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginTop: 24,
  },
  titleInfoStyle: {
    fontSize: 16,
    color: '#8e8e93',
  },
  titleStyle: {
    fontFamily: font,
    fontSize: 18,
    color: Colors.text,
  },
  iconContainer: {
    marginTop: 12,
    marginLeft: 10,
  },
  logoutIconContainer: {
    marginTop: 15,
    marginLeft: 10,
  },
});
