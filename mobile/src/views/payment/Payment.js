import React from 'react';
import PropTypes from 'prop-types';
import stripe, { PaymentCardTextField } from 'tipsi-stripe';
import {View, StyleSheet, Text, Linking, Platform, StatusBar, ScrollView, KeyboardAvoidingView} from 'react-native'
import _ from 'lodash';

import {CreditCardInput} from 'react-native-credit-card-input';
import Colors from '../../statics/colors'
import {translate} from '../../i18n'
import font from '../../assets/fonts';
import NavigationButton from '../../components/navigation-button/NavigationButton'
import Title from '../../components/title/Title'
import BigRedButton from '../../components/big-red-button/BigRedButton'

const publishableKey = 'pk_test_jnC9LmAtNttjgGpR7bF1Px6Y';

stripe.setOptions({
  publishableKey,
});

function redirect3DSecure(url) {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      this.setState({ error: 'Cannot open redirect url. Please contact administator.' });
    }
  });
}

const PAYMENT_STATUSES = {
  SUBMITTED: 'SUBMITTED',
  WAITING: 'WAITING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  NONE: 'NONE'
};

const PAYMENT_STATUSES_TO_MESSAGE = {
  SUBMITTED: 'Redirection vers votre banque en cours...',
  WAITING: 'En attente de confirmation de votre banque...',
  PAID: 'Paiement effectué !',
  FAILED: 'Paiement échoué.',
  NONE: '',
}

export default class Payment extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      source: '',
      loading: false,
      paid: false,
      error: '',
      orderId: '',
      status: PAYMENT_STATUSES.WAITING,
      card: {
        number: '',
        expMonth: '',
        expYear: '',
        cvc: '',
        valid: false,
      },
    };

    this.onCreditCardInputChange = this.onCreditCardInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const newOrder = this.findNewOrder();

    if (newOrder) {
      this.setState({
        status: PAYMENT_STATUSES[newOrder.orderStatus],
        loading: newOrder.orderStatus === 'SUBMITTED'
      });
    }
  }

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null })
      const token = await stripe.createTokenWithCard({
        number: this.state.card.number,
        expMonth: this.state.card.expMonth,
        expYear: this.state.card.expYear,
        cvc: this.state.card.cvc
      });

      const { data } = await this.props.pay({
        stripeTokenId: token.tokenId
      });

      const payPayload = data.pay;

      // If payment was instantly chargeable
      if (!payPayload.redirectUrl && payPayload.order.orderStatus === 'PAID') {
        return this.setState({ loading: false, status: PAYMENT_STATUSES.PAID, orderId: payPayload.order.id});
      }

      // If 3D Secure payment
      if (payPayload.redirectUrl && payPayload.order.orderStatus === 'SUBMITTED') {
        this.setState({ orderId: payPayload.order.id, status: PAYMENT_STATUSES.SUBMITTED });

        setTimeout(() => {
          redirect3DSecure(payPayload.redirectUrl);
          this.setState({ status: PAYMENT_STATUSES.WAITING });
        }, 1500);

        this.props.waitFor3DSecure({
          orderId: payPayload.order.id
        });

        return;
      }

      // If it failed
      this.setState({ loading: false, status: PAYMENT_STATUSES.FAILED });

    } catch (error) {
      this.setState({ loading: false })
    }
  }

  findNewOrder() {
    if (this.props.orderStatuses.loading) { return null }

    const newOrder = _.last(this.props.orderStatuses.me.orders);

    return newOrder.id === this.state.orderId ? newOrder : null;
  }

  onCreditCardInputChange(form) {
    if (form.valid) {
      this.setState({
        card: {
          number: form.values.number,
          expMonth: parseInt(form.values.expiry.split('/')[0]),
          expYear: parseInt(form.values.expiry.split('/')[1]),
          cvc: form.values.cvc,
          valid: form.valid
        }
      })
    }
  }

  render() {
    if (this.props.orderStatuses.loading) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={{ marginTop: 8, marginBottom: 8 }}>
          <NavigationButton onPress={() => this.props.navigation.goBack()} back dark />
          <Title style={{ marginTop: 8 }} size={22} color={Colors.text}>
            Paiement
          </Title>
        </View>
          <CreditCardInput
            autoFocus
            cardScale={0.7}
            inputStyle={styles.creditCardInput}
            inputContainerStyle={styles.creditCardInputContainer}
            labelStyle={styles.creditCardLabel}
            labels={{
              number: translate('number'),
              expiry: translate('expiry'),
              cvc: translate('cvc')
            }}
            onChange={this.onCreditCardInputChange}
          />
          <View style={{ marginTop: 16, marginBottom: 16 }}>
            <BigRedButton
              label={
                this.state.status === PAYMENT_STATUSES.PAID
                  ? PAYMENT_STATUSES_TO_MESSAGE[this.state.status]
                  : 'Payer'
              }
              disabled={!this.state.card.valid || this.state.status === PAYMENT_STATUSES.PAID}
              loading={this.state.loading}
              onPress={this.handleCardPayPress}
            />
          </View>
          <Title font={font} color={Colors.text} style={{ alignSelf: 'center' }}>
            {
              this.state.orderId
                && this.state.status !== PAYMENT_STATUSES.PAID
                && PAYMENT_STATUSES_TO_MESSAGE[this.state.status]
            }
          </Title>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.select({
      ios: 20,
      android: StatusBar.currentHeight,
    }),
    paddingLeft: 10,
  },
  creditCardInputContainer: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  creditCardInput: {
    color: '#449aeb',
    fontFamily: font,
    fontSize: 19
  },
  creditCardLabel: {
    fontFamily: font,
    color: Colors.text,
    fontSize: 11
  }
})
