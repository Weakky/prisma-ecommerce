import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

class Profile extends PureComponent {
  render() {
    return (
      <View>
        <Text>This is my profile</Text>
      </View>
    );
  }
}

Profile.propTypes = {};
Profile.defaultProps = {};

export default Profile;
