import React, { Component } from 'react';

import Root from './pages/layout/components/Root';
import Sidebar from './pages/layout/components/Sidebar';
import SidebarItem from './pages/layout/components/SidebarItem';
import Main from './pages/layout/components/Main';

import ListProduct from './pages/products/components/ListProduct';
import ListOrder from './pages/orders/components/ListOrder';
import ListBrand from './pages/brands/components/ListBrand';
import ListCategory from './pages/categories/components/ListCategory';
import ListOption from './pages/options/components/ListOption';
import ListAttributes from './pages/attributes/components/ListAttribute';
import ListUser from './pages/users/components/ListUser';
import ListBestSales from './pages/best-sales/components/ListBestSales';
import ListNewProducts from './pages/new-products/components/ListNewProducts';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { addLocaleData, FormattedMessage, IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom';
import {
  TiBriefcase,
  TiChartAreaOutline,
  TiShoppingBag,
  TiShoppingCart,
  TiBookmark,
  TiGroupOutline,
  TiChartLineOutline,
  TiPipette,
  TiPuzzleOutline,
} from 'react-icons/lib/ti';

import './App.css';
import 'tachyons';
import { GC_AUTH_TOKEN } from './constants/index';
import Login from './pages/login/components/Login';
import localeData from './i18n';

let frLocaleData = require('react-intl/locale-data/fr');
addLocaleData(frLocaleData);

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;
// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
// Try full locale, try locale without region code, fallback to 'en'
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = localStorage.getItem(GC_AUTH_TOKEN);
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: null,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    this.setState({ logged: localStorage.getItem(GC_AUTH_TOKEN) != null });
  }

  handleLogin() {
    this.setState({ logged: true });
  }

  handleLogout() {
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.setState({ logged: false });
  }

  render() {
    const tree = [
      {
        title: <FormattedMessage id="overall_view"/>,
        name: <FormattedMessage id="statistics"/>,
        route: '/statistics',
        icon: <TiChartAreaOutline size={19} className="App-icon" />,
      },
      {
        name: <FormattedMessage id="earnings"/>,
        route: '/earnings',
        icon: <TiChartLineOutline size={19} className="App-icon" />,
      },
      {
        title: <FormattedMessage id="e_commerce"/>,
        name: <FormattedMessage id="orders"/>,
        route: '/orders',
        icon: <TiShoppingCart size={19} className="App-icon" />,
      },
      {
        name: <FormattedMessage id="customers"/>,
        route: '/customers',
        icon: <TiGroupOutline size={19} className="App-icon" />,
      },
      {
        title: <FormattedMessage id="product_management"/>,
        name: <FormattedMessage id="products"/>,
        route: '/products',
        icon: <TiShoppingBag size={19} className="App-icon" />,
      },
      {
        name: <FormattedMessage id="options"/>,
        route: '/options',
        icon: <TiPipette size={19} className="App-icon" />,
      },
      {
        name: <FormattedMessage id="attributes"/>,
        route: '/attributes',
        icon: <TiPuzzleOutline size={19} className="App-icon" />,
      },
      {
        name: <FormattedMessage id="brands"/>,
        route: '/brands',
        icon: <TiBriefcase size={19} className="App-icon" />,
      },
      {
        name: <FormattedMessage id="categories"/>,
        route: '/categories',
        icon: <TiBookmark size={19} className="App-icon" />,
      },
      {
        title: 'Metadata',
        name: <FormattedMessage id="best_sellers"/>,
        route: '/best-sales',
        icon: <TiBookmark size={19} className="App-icon" />,
      },
      {
        name: <FormattedMessage id="new_products"/>,
        route: '/new-products',
        icon: <TiBookmark size={19} className="App-icon" />,
      },
      // {
      //   name: <FormattedMessage id="motd"/>,
      //   route: '/motd',
      //   icon: <TiBookmark size={19} className="App-icon" />,
      // },
    ];

    return (
      <ApolloProvider client={client}>
        <IntlProvider locale={language} messages={messages}>
          <Router>
            {!this.state.logged ? (
              <Login onUserAuthenticated={this.handleLogin} />
            ) : (
              <Root>
                <Sidebar onUserDisconnected={this.handleLogout}>
                  {tree.map((leaf, i) => (
                    <SidebarItem key={i}>
                      {leaf.title && <p className="App-link-title">{leaf.title}</p>}
                      <NavLink
                        activeClassName="App-link-active"
                        className="App-link"
                        to={leaf.route}
                      >
                        {leaf.icon}
                        <span className="App-link-label">{leaf.name}</span>
                      </NavLink>
                    </SidebarItem>
                  ))}
                </Sidebar>
                <Main>
                  <Route
                    exact={true}
                    path="/"
                    render={() => <Redirect from="/" to="/products" />}
                  />
                  <Route exact={true} path="/products" component={ListProduct} />
                  <Route exact={true} path="/orders" component={ListOrder} />
                  <Route exact={true} path="/brands" component={ListBrand} />
                  <Route exact={true} path="/categories" component={ListCategory} />
                  <Route exact={true} path="/options" component={ListOption} />
                  <Route exact={true} path="/attributes" component={ListAttributes} />
                  <Route exact={true} path="/customers" component={ListUser} />
                  <Route exact={true} path="/best-sales" component={ListBestSales} />
                  <Route exact={true} path="/new-products" component={ListNewProducts} />
                  {/*<Route exact={true} path="/motd" component={ListBestSales} />*/}
                </Main>
              </Root>
            )}
          </Router>
        </IntlProvider>
      </ApolloProvider>
    );
  }
}

export default App;
