import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import BigRedButton from '../big-red-button/BigRedButton';
import Title from '../title/Title';

import { translate } from '../../i18n';
import Colors from '../../statics/colors';
import font from '../../assets/fonts';
import styles from '../../views/home/Home.styles';

const RecapRow = props => (
  <View style={styles.recapRowContainer}>
    <Title font={font} size={12} weight={props.bold && '600'} color={Colors.text}>
      {props.title}
    </Title>
    <Title font={font} size={12} weight={props.bold && '600'} color={Colors.text}>
      {props.value}
    </Title>
  </View>
);

const Separator = () => <View style={styles.separator} />;

const Ticket = props => (
  <View style={styles.ticketContainer}>
    <Title
      style={{ marginBottom: 10 }}
      font={font}
      size={10}
      weight="600"
      color="rgba(72,72,72,0.4)"
    >
      {translate('your_order')}
    </Title>
    {props.order.lineItems.map(lineItem => (
      <RecapRow
        key={lineItem.id}
        title={`${lineItem.quantity} x ${lineItem.variant.product.name}`}
        value={`${(lineItem.variant.price * lineItem.quantity).toFixed(2)} €`}
      />
    ))}
    <Separator />
    <RecapRow
      bold
      title={translate('total_price')}
      value={`${props.order.totalPrice.toFixed(2)} €`}
    />
  </View>
);

const SmallRedButton = props => (
  <TouchableOpacity style={styles.smallRedButton} onPress={props.onPress}>
    <Title size={12} font={font} weight="400" color={Colors.white}>
      {props.label}
    </Title>
  </TouchableOpacity>
);

const Order = props => (
  <View style={{ marginBottom: 20 }}>
    {props.title && (
      <Title style={{ marginBottom: 20 }} size={18} color={Colors.text}>
        {props.title}
      </Title>
    )}
    <Ticket order={props.order} />
    {!props.askToReplaceOrMergeOrder && (
      <BigRedButton
        loading={props.loading}
        onPress={() =>
          props.onPressAddToCart({ orderId: props.order.id, replace: false })
        }
        label={translate('add_to_cart')}
      />
    )}
    {props.askToReplaceOrMergeOrder && (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <SmallRedButton
          label={translate('replace_with_cart')}
          onPress={() => props.addOrderToCart({ orderId: props.order.id, replace: true })}
        />
        <SmallRedButton
          label={translate('merge_with_cart')}
          onPress={() =>
            props.addOrderToCart({ orderId: props.order.id, replace: false })
          }
        />
      </View>
    )}
  </View>
);

Order.propTypes = {
  title: PropTypes.string,
  askToReplaceOrMergeOrder: PropTypes.bool.isRequired,
  addOrderToCart: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

export default Order;
