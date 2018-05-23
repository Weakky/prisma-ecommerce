import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, createTabNavigator, TabBarBottom } from 'react-navigation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApolloProvider } from 'react-apollo';

import SignUp from './src/views/sign-up/SignUp';
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

import Colors from './src/statics/colors';

import StackModalNavigator from './src/helpers/StackModalNavigator';
import { setupApolloClient } from './src/graphql/setupApollo';

import OrderIcon from './src/components/order-icon/OrderIcon';

const TempView = ({ navigation }) => (
  <TouchableOpacity
    style={{
      flex: 1,
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={() => navigation.goBack()}
  >
    <Text>Press me to go back</Text>
  </TouchableOpacity>
);

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

const BasketNavigator = StackModalNavigator(
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

const MainView = createTabNavigator(
  {
    WelcomeTab: {
      screen: HomeContainer,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({ tintColor }) => (console.log(tintColor) ||
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
      screen: TempView,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person-outline" size={22} style={{ color: tintColor }} />
        ),
      },
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
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

const Application = createStackNavigator(
  {
    Login: { screen: Login },
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    MainView: { screen: MainView },
  },
  {
    headerMode: 'none',
  },
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
        <Application />
      </ApolloProvider>
    );
  }
}
