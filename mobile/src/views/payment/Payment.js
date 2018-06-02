import React from 'react';
import { View, StyleSheet, Linking, Platform, StatusBar } from 'react-native';

import _ from 'lodash';
import { CreditCardInput } from 'react-native-credit-card-input';
import stripe from 'tipsi-stripe';

import Container from '../../components/layout/Container';
import Title from '../../components/title/Title';
import BigRedButton from '../../components/big-red-button/BigRedButton';

import { translate } from '../../i18n';

import Colors from '../../statics/colors';
import font from '../../assets/fonts';

const publishableKey = 'pk_test_jnC9LmAtNttjgGpR7bF1Px6Y';

stripe.setOptions({
  publishableKey,
});

function redirect3DSecure(url) {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      this.setState({ error: 'Cannot open redirect url. Please contact administrator.' });
    }
  });
}

const PAYMENT_STATUSES = {
  SUBMITTED: 'SUBMITTED',
  WAITING: 'WAITING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  NONE: 'NONE',
};

const PAYMENT_STATUSES_TO_MESSAGE = {
  SUBMITTED: translate('status_submitted'),
  WAITING: translate('status_waiting'),
  PAID: translate('status_paid'),
  FAILED: translate('status_failed'),
  NONE: '',
};

export default class Payment extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      source: '',
      loading: false,
      paid: false,
      error: '',
      orderId: '',
      status: PAYMENT_STATUSES.NONE,
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
    const newOrder = this.findNewOrder(nextProps.orderStatuses);

    if (newOrder) {
      this.setState({
        status: PAYMENT_STATUSES[newOrder.orderStatus],
        loading: newOrder.orderStatus === 'SUBMITTED',
      });
    }
  }

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null });
      const token = await stripe.createTokenWithCard({
        number: this.state.card.number,
        expMonth: this.state.card.expMonth,
        expYear: this.state.card.expYear,
        cvc: this.state.card.cvc,
      });

      const { data } = await this.props.pay({
        stripeTokenId: token.tokenId,
      });

      const payPayload = data.pay;

      // If payment was instantly chargeable
      if (!payPayload.redirectUrl && payPayload.order.orderStatus === 'PAID') {
        return this.setState({
          loading: false,
          status: PAYMENT_STATUSES.PAID,
          orderId: payPayload.order.id,
        });
      }

      // If 3D Secure payment
      if (payPayload.redirectUrl && payPayload.order.orderStatus === 'SUBMITTED') {
        this.setState({
          orderId: payPayload.order.id,
          status: PAYMENT_STATUSES.SUBMITTED,
        });

        setTimeout(() => {
          redirect3DSecure(payPayload.redirectUrl);
          this.setState({ status: PAYMENT_STATUSES.WAITING });
        }, 1500);

        this.props.waitFor3DSecure({
          orderId: payPayload.order.id,
        });

        return;
      }

      // If it failed
      this.setState({ loading: false, status: PAYMENT_STATUSES.FAILED });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  findNewOrder(orderStatuses) {
    if (orderStatuses.loading) {
      return null;
    }

    const newOrder = _.last(orderStatuses.me.orders);

    return newOrder && newOrder.id === this.state.orderId ? newOrder : null;
  }

  onCreditCardInputChange(form) {
    if (form.valid) {
      this.setState({
        card: {
          number: form.values.number,
          expMonth: parseInt(form.values.expiry.split('/')[0]),
          expYear: parseInt(form.values.expiry.split('/')[1]),
          cvc: form.values.cvc,
          valid: form.valid,
        },
      });
    }
  }

  render() {
    if (this.props.orderStatuses.loading) {
      return null;
    }

    return (
      <Container title={translate('pay')} navigation={this.props.navigation}>
        <CreditCardInput
          autoFocus
          cardScale={0.7}
          inputStyle={styles.creditCardInput}
          inputContainerStyle={styles.creditCardInputContainer}
          labelStyle={styles.creditCardLabel}
          labels={{
            number: translate('number'),
            expiry: translate('expiry'),
            cvc: translate('cvc'),
          }}
          onChange={this.onCreditCardInputChange}
        />
        <View style={{ marginTop: 16, marginBottom: 16 }}>
          <BigRedButton
            label={
              this.state.status === PAYMENT_STATUSES.PAID
                ? PAYMENT_STATUSES_TO_MESSAGE[this.state.status]
                : translate('pay_button')
            }
            disabled={
              !this.state.card.valid || this.state.status === PAYMENT_STATUSES.PAID
            }
            loading={this.state.loading}
            onPress={this.handleCardPayPress}
          />
        </View>
        <Title font={font} color={Colors.text} style={{ alignSelf: 'center' }}>
          {this.state.orderId &&
            this.state.status !== PAYMENT_STATUSES.PAID &&
            PAYMENT_STATUSES_TO_MESSAGE[this.state.status]}
        </Title>
      </Container>
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
    fontSize: 19,
  },
  creditCardLabel: {
    fontFamily: font,
    color: Colors.text,
    fontSize: 11,
  },
});
