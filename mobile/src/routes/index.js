import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import { withMappedNavigationProps } from 'react-navigation-props-mapper';

import FullLoading from '../components/loading/FullLoading';
import StorageKeys from '../statics/storage-keys';

import SignUp from '../views/sign-up/SignUpContainer';
import SignIn from '../views/sign-in/SignInContainer';
import Login from '../views/login/Login';
import Product from '../views/product/ProductContainer';
import Search from '../views/search/Search';
import Browse from '../views/browse/BrowseContainer';
import Products from '../views/products/ProductsContainer';
import Basket from '../views/basket/BasketContainer';
import Recap from '../views/recap/Recap';
import Home from '../views/home/HomeContainer';
import Payment from '../views/payment/PaymentContainer';
import AfterPayment from '../views/payment/AfterPayment';
import Profile from '../views/profile/Profile';
import Orders from '../views/profile/views/orders/OrdersContainer';
import Shops from '../views/profile/views/shops/ShopsContainer';
import Username from '../views/profile/views/username/UsernameContainer';
import Password from '../views/profile/views/password/PasswordContainer';
import Delete from '../views/profile/views/delete/DeleteContainer';
import Terms from '../views/profile/views/terms/Terms';
import Recovery from '../views/password-reset/AskPasswordResetContainer';
import OrderIcon from '../components/order-icon/OrderIcon';
import Colors from '../statics/colors';

const ICON_TAB_SIZE = 21;
const TAB_BAR_HEIGHT = 49;

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: Colors.white,
  },
  tabBarStyle: {
    borderTopColor: Colors.liteGrey,
    height: TAB_BAR_HEIGHT,
  },
});

const ProductWithMappedProps = withMappedNavigationProps(Product);

const BrowseStack = createStackNavigator(
  {
    Browse: { screen: Browse },
    Search: { screen: Search },
    Products: { screen: withMappedNavigationProps(Products) },
    Product: { screen: ProductWithMappedProps },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Browse',
  },
);

const BasketStack = createStackNavigator(
  {
    Basket: { screen: Basket },
    Recap: { screen: withMappedNavigationProps(Recap) },
    Payment: { screen: withMappedNavigationProps(Payment) },
    AfterPayment: { screen: AfterPayment },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Basket',
  },
);

const ProfileStack = createStackNavigator(
  {
    Profile: { screen: Profile },
    Orders: { screen: Orders },
    Shops: { screen: Shops },
    Username: { screen: Username },
    Password: { screen: Password },
    Delete: { screen: Delete },
    Terms: { screen: Terms },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Profile',
  },
);

const AppTabs = createBottomTabNavigator(
  {
    HomeTab: { screen: Home },
    BrowseTab: { screen: BrowseStack },
    BasketTab: { screen: BasketStack },
    ProfileTab: { screen: ProfileStack },
  },
  {
    initialRouteName: 'HomeTab',
    order: ['HomeTab', 'BrowseTab', 'BasketTab', 'ProfileTab'],
    tabBarOptions: {
      activeTintColor: Colors.red,
      inactiveTintColor: Colors.text,
      style: styles.tabBarStyle,
      tabStyle: styles.tabStyle,
      showLabel: false,
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        switch (navigation.state.key) {
          case 'HomeTab':
            return (
              <SimpleLineIcons
                name="home"
                size={ICON_TAB_SIZE}
                style={{ color: tintColor }}
              />
            );
          case 'BrowseTab':
            return (
              <SimpleLineIcons
                name="magnifier"
                size={ICON_TAB_SIZE}
                style={{ color: tintColor }}
              />
            );
          case 'BasketTab':
            return <OrderIcon tintColor={tintColor} />;
          case 'ProfileTab':
            return (
              <SimpleLineIcons
                name="settings"
                size={ICON_TAB_SIZE}
                style={{ color: tintColor }}
              />
            );
        }
      },
    }),
  },
);

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login },
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    Recovery: { screen: Recovery },
  },
  {
    headerMode: 'none',
  },
);

class Switch extends React.PureComponent {
  constructor() {
    super();

    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem(StorageKeys.GC_TOKEN);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return <FullLoading />;
  }
}

const RootSwitch = createSwitchNavigator(
  {
    Switch: Switch,
    Auth: AuthStack,
    App: AppTabs,
  },
  {
    initialRouteName: 'Switch',
  },
);

export default RootSwitch;
