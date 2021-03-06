import React from 'react';
import { View, Text } from 'react-native';
import { withApollo } from 'react-apollo/withApollo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import sumBy from 'lodash/sumBy';

import commonQueries from '../../graphql/queries';

import styles from './OrderIcon.styles';

class OrderIcon extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      itemsCount: 0,
    };
  }

  async componentDidMount() {
    this.subscription = this.props.client
      .watchQuery({ query: commonQueries.userInformation })
      .subscribe(({ data }) => {
        if (data.me.cart.length > 0) {
          this.setState({
            itemsCount: sumBy(data.me.cart, lineItem => lineItem.quantity),
          });
        } else {
          this.setState({ itemsCount: 0 });
        }
      });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <View>
        {this.state.itemsCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{this.state.itemsCount}</Text>
          </View>
        )}
        <SimpleLineIcons
          name={this.state.itemsCount > 0 ? 'basket-loaded' : 'basket'}
          size={22}
          style={{ color: this.props.tintColor }}
        />
      </View>
    );
  }
}

export default withApollo(OrderIcon);
