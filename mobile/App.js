import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApolloProvider } from 'react-apollo';

import SignUp from './src/views/sign-up/SignUpContainer';
import SignIn from './src/views/sign-in/SignInContainer';
import Login from './src/views/login/Login';
import Product from './src/views/product/ProductContainer';

import Search from './src/views/search/Search';
import Browse from './src/views/browse/BrowseContainer';
import Products from './src/views/products/ProductsContainer';
import Basket from './src/views/basket/BasketContainer';
import Recap from './src/views/recap/Recap';
import HomeContainer from './src/views/home/HomeContainer';
import PaymentContainer from './src/views/payment/PaymentContainer';
import Settings from './src/views/settings/Settings';
import Orders from './src/views/settings/views/orders/OrdersContainer'
import Shops from './src/views/settings/views/shops/ShopsContainer';

import OrderIcon from './src/components/order-icon/OrderIcon';
import FullLoading from './src/components/loading/FullLoading';

import StorageKeys from './src/statics/storage-keys'
import Colors from './src/statics/colors';

import { setupApolloClient } from './src/graphql/setupApollo';

const ProductWithMappedProps = withMappedNavigationProps(Product);

const BrowseNavigator = createStackNavigator(
  {
    Browse: { screen: Browse },
    Search: { screen: Search },
    Products: { screen: withMappedNavigationProps(Products) },
    Product: { screen: ProductWithMappedProps },
  },
  {
    headerMode: 'none',
  },
);

const BasketNavigator = createStackNavigator(
  {
    Basket: { screen: Basket },
    Product: { screen: ProductWithMappedProps },
    Recap: { screen: withMappedNavigationProps(Recap) },
    Payment: { screen: withMappedNavigationProps(PaymentContainer) },
  },
  {
    headerMode: 'none',
  },
);

const SettingsNavigator = createStackNavigator(
  {
    Settings: { screen: Settings },
    Orders: { screen: Orders },
    Shops: { screen: Shops },
  },
  {
    headerMode: 'none',
  },
);

const MainView = createBottomTabNavigator(
  {
    WelcomeTab: {
      screen: HomeContainer,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home-outline" size={22} style={{ color: tintColor }} />
        ),
      },
    },
    BrowseTab: {
      screen: BrowseNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-search-outline" size={22} style={{ color: tintColor }} />
        ),
      },
    },
    BasketTab: {
      screen: BasketNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({ tintColor }) => <OrderIcon tintColor={tintColor} />,
      },
    },
    ProfileTab: {
      screen: SettingsNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person-outline" size={22} style={{ color: tintColor }} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.red,
      inactiveTintColor: Colors.text,
      style: {
        borderTopColor: Colors.grey,
        height: 40,
      },
      tabStyle: {
        backgroundColor: Colors.white,
      },
      showLabel: false,
    },
  },
);

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login },
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
  },
  {
    headerMode: 'none'
  }
);

class AuthLoadingScreen extends React.PureComponent {
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
    return (
      <FullLoading />
    );
  }
}


const SwitchStack = createSwitchNavigator(
  {
    AuthLoadingScreen: AuthLoadingScreen,
    Auth: AuthStack,
    App: MainView
  }
);

// Change screen: with the view you wanna render the app
const DebugView = createStackNavigator(
  {
    Temp: {
      screen: Login,
    },
  },
  {
    headerMode: 'none',
  },
);

const apolloClient = setupApolloClient();

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <SwitchStack />
      </ApolloProvider>
    );
  }
}
