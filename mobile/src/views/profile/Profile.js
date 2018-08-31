import React, { PureComponent } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import SettingsList from 'react-native-settings-list';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Container from '../../components/layout/Container';

import font from '../../assets/fonts';
import colors from '../../statics/colors';
import { translate } from '../../i18n';

export default class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      receiveEmails: true,
      receiveNotifications: true,
    };

    this.renderIcon = this.renderIcon.bind(this);
    this.renderArrow = this.renderArrow.bind(this);
  }
  render() {
    const { navigation } = this.props;
    return (
      <Container innerStyle={styles.container} title={translate('your_settings')}>
        <SettingsList
          defaultTitleStyle={styles.titleStyle}
          defaultItemSize={49}
          borderColor={colors.liteGrey}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <SettingsList.Header
            headerText={translate('account_information')}
            headerStyle={styles.headerStyle}
          />
          <SettingsList.Item
            title={translate('your_username')}
            arrowIcon={this.renderArrow()}
            icon={this.renderIcon('user')}
            onPress={() => navigation.navigate('Username')}
          />
          <SettingsList.Item
            title={translate('your_password')}
            icon={this.renderIcon('key')}
            arrowIcon={this.renderArrow()}
            onPress={() => navigation.navigate('Password')}
          />
          <SettingsList.Header
            headerStyle={{
              margin: 4,
            }}
          />

          <SettingsList.Item
            title={translate('your_orders')}
            icon={this.renderIcon('basket-loaded')}
            arrowIcon={this.renderArrow()}
            onPress={() => navigation.navigate('Orders')}
          />
          <SettingsList.Item
            title={translate('your_shop')}
            icon={this.renderIcon('home')}
            arrowIcon={this.renderArrow()}
            onPress={() => navigation.navigate('Shops')}
          />

          <SettingsList.Header
            headerText={translate('privacy_and_security')}
            headerStyle={styles.headerStyle}
          />
          <SettingsList.Item
            title={translate('receive_notifications')}
            icon={this.renderIcon('bell')}
            hasNavArrow={false}
            hasSwitch
            switchState={this.state.receiveNotifications}
            switchOnValueChange={() =>
              this.setState({ receiveNotifications: !this.state.receiveNotifications })
            }
            onPress={() => null}
          />
          <SettingsList.Item
            title={translate('receive_emails')}
            icon={this.renderIcon('envelope')}
            hasNavArrow={false}
            hasSwitch
            switchState={this.state.receiveEmails}
            switchOnValueChange={() =>
              this.setState({ receiveEmails: !this.state.receiveEmails })
            }
            onPress={() => null}
          />

          <SettingsList.Header
            headerText={translate('legal_mentions')}
            headerStyle={styles.headerStyle}
          />
          <SettingsList.Item
            title={translate('general_terms')}
            icon={this.renderIcon('info')}
            arrowIcon={this.renderArrow()}
            onPress={() => navigation.navigate('Terms')}
          />
          <SettingsList.Header
            headerStyle={{
              margin: 4,
            }}
          />

          <SettingsList.Item
            title={translate('delete_account')}
            icon={this.renderIcon('trash')}
            arrowIcon={this.renderArrow()}
            onPress={() => navigation.navigate('Delete')}
          />
          <SettingsList.Item
            title={translate('logout')}
            icon={this.renderIcon('power')}
            arrowIcon={this.renderArrow()}
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate('Auth');
            }}
          />
        </SettingsList>
      </Container>
    );
  }

  renderIcon(name) {
    return (
      <View style={styles.iconWrapper}>
        <SimpleLineIcons name={name} size={21} color={colors.text} />
      </View>
    );
  }

  renderArrow() {
    return (
      <View style={styles.arrowWrapper}>
        <SimpleLineIcons name={'arrow-right'} size={12} color={colors.grey} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginTop: 16,
  },
  titleStyle: {
    fontFamily: font,
    fontSize: 14,
    color: colors.text,
  },
  headerStyle: {
    marginLeft: 20,
    marginTop: 24,
    marginBottom: 12,
    color: colors.grey,
    fontSize: 14,
    fontFamily: font,
  },
  iconWrapper: {
    alignSelf: 'center',
    marginLeft: 16,
    marginBottom: 2,
  },
  arrowWrapper: {
    alignSelf: 'center',
    marginRight: 16,
  },
});
