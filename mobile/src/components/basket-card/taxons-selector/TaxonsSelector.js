import React, { Component } from 'react';

import { Text, View, Picker } from 'react-native';

const Selector = props => (
  <Picker
    selectedValue="java"
    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
  >
    <Picker.Item label="Javafsdfsdf" value="java" />
    <Picker.Item label="JavaScript" value="js" />
  </Picker>
);

class TaxonSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taxon: '',
      quantity: '',
    };
  }

  render() {
    return (
      <View style={{ marginRight: 40 }}>
        <Text>Select</Text>
      </View>
    );
  }
}

TaxonSelector.propTypes = {};
TaxonSelector.defaultProps = {};

export default TaxonSelector;
