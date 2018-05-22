import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { TabBar, TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view';

import Colors from '../../statics/colors';

import SearchBox from '../search/SearchBox';
import Title from '../../components/title/Title';
import Filters from '../filters/Filters';

class Browse extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [{ key: '1', title: '...' }],
    };

    this.onIndexChange = this.onIndexChange.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.renderPager = this.renderPager.bind(this);
    this.renderLabel = this.renderLabel.bind(this);
  }

  componentWillReceiveProps({ data }) {
    this.setState({
      routes: data.categories.map((category, key) => ({
        key: `${key}`,
        categoryId: category.id,
        title: category.name,
      })),
    });
  }

  onIndexChange(index) {
    this.setState({ index });
  }

  renderHeader(props) {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: Colors.red,
          height: StyleSheet.hairlineWidth,
        }}
        style={{
          backgroundColor: Colors.white,
          height: 45,
          borderColor: Colors.grey,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
        labelStyle={{
          color: Colors.text,
          fontSize: 11,
        }}
        renderLabel={this.renderLabel}
      />
    );
  }

  applyFilters({ filtersValues, filtersEnabled }, filterType) {
    this.props.navigation.navigate('Products', {
      filtersValues,
      filtersEnabled,
      filterType,
    });
  }

  renderScene({ route }) {
    return (
      <Filters
        filterType={route.categoryId}
        applyFilters={({ filtersEnabled, filtersValues }) =>
          this.applyFilters({ filtersEnabled, filtersValues }, route.categoryId)
        }
      />
    );
  }

  renderPager(props) {
    return <TabViewPagerPan {...props} swipeEnabled={false} />;
  }

  renderLabel({ route, focused }) {
    return (
      <Title
        size={12}
        color={focused ? Colors.red : Colors.text}
        style={{ marginTop: 5 }}
      >
        {route.title}
      </Title>
    );
  }

  render() {
    const { data } = this.props;

    if (data.loading) {
      return null;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SearchBox navigation={this.props.navigation} />
        <TabViewAnimated
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          renderPager={this.renderPager}
          onIndexChange={this.onIndexChange}
        />
      </View>
    );
  }
}

Browse.propTypes = {};
Browse.defaultProps = {};

export default Browse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.select({
      ios: 20,
      android: StatusBar.currentHeight,
    }),
  },
});
