import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import Container from '../../components/layout/Container';

export default class Settings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container title="Settings" asScroll>
        <Text>Toto</Text>
      </Container>
    );
  }
}
