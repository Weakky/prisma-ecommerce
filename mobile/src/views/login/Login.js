import React from 'react';
import { Image, StatusBar, TouchableOpacity, View } from 'react-native';

import styles from './Login.styles';
import color from '../../statics/colors';
import { translate } from '../../i18n';

import Gradient from '../../components/gradient/Gradient';
import Title from '../../components/title/Title';
import Button from '../../components/button/Button';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Login = props => (
  <Gradient>
    <StatusBar barStyle="light-content" />
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Title style={{ marginBottom: 120 }} color={color.white} size={32}>
        Aromaclop
      </Title>
      <Button
        style={{ marginBottom: 20 }}
        onPress={() => props.navigation.navigate('SignIn')}
        label={translate('login')}
        fontSize={14}
      />
      <Button
        onPress={() => props.navigation.navigate('SignUp')}
        label={translate('sign_up')}
        backgroundColor={color.white}
        labelColor={color.red}
        fontSize={14}
      />
      <TouchableOpacity onPress={() => props.navigation.navigate('AskPasswordReset')}>
        <Title color={color.white} size={11} style={{ marginTop: 20 }}>
          {translate('forgot_password')}
        </Title>
      </TouchableOpacity>
      <View
        style={{
          width: 250,
          marginTop: 50,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Icon name="social-google" size={22} color={color.white} />
        <Icon name="social-facebook" size={22} color={color.white} />
        <Icon name="social-instagram" size={22} color={color.white} />
      </View>
    </View>
  </Gradient>
);

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
