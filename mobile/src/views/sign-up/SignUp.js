import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import FirstStep from './steps/FirstStep';
import SecondStep from './steps/SecondStep';
import ThirdStep from './steps/ThirdStep';
import FourthStep from './steps/FourthStep';
import FinalStep from './steps/FinalStep';

import KeyboardAwareCenteredView from '../../components/layout/KeyboardAwareCenteredView';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      firstName: '',
      lastName: '',
      isMajor: false,
      selectedShopId: '',
      email: '',
      password: '',
    };

    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  nextStep(data) {
    this.setState({
      step: this.state.step + 1,
      ...data,
    });
  }

  previousStep() {
    this.setState({ step: this.state.step - 1 });
  }

  renderCurrentStep() {
    switch (this.state.step) {
      case 1:
        return (
          <FirstStep
            navigation={this.props.navigation}
            previousStep={this.previousStep}
            nextStep={this.nextStep}
          />
        );
      case 2:
        return <SecondStep previousStep={this.previousStep} nextStep={this.nextStep} />;
      case 3:
        return <ThirdStep previousStep={this.previousStep} nextStep={this.nextStep} />;
      case 4:
        return <FourthStep previousStep={this.previousStep} nextStep={this.nextStep} />;
      case 5:
        return <FinalStep {...this.state} signUp={this.props.signUp} navigation={this.props.navigation} />;
    }
  }

  render() {
    return (
      <KeyboardAwareCenteredView>
        {this.renderCurrentStep()}
      </KeyboardAwareCenteredView>
    );
  }
}

SignUp.propTypes = {};
SignUp.defaultProps = {};

export default SignUp;
