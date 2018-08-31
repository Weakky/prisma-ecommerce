import React from 'react';
import { View } from 'react-native';

import Container from '../../../../components/layout/Container';
import { translate } from '../../../../i18n';

class Terms extends React.PureComponent {
  render() {
    return (
      <Container title={translate('general_terms')} navigation={this.props.navigation}>
        <View />
      </Container>
    );
  }
}

export default Terms;
