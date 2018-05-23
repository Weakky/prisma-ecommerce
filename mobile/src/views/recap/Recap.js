import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

import Container from '../../components/layout/Container';
import Button from '../../components/button/Button';
import Title from '../../components/title/Title';

import { translate } from '../../i18n';

import Colors from '../../statics/colors';
import font from '../../assets/fonts';
import styles from './Recap.styles';

const RecapRow = props => (
  <View style={styles.recapRowContainer}>
    <Title font={font} size={12} weight={props.bold && '700'} color={Colors.text}>
      {props.title}
    </Title>
    <Title font={font} size={12} weight={props.bold && '700'} color={Colors.text}>
      {props.value}
    </Title>
  </View>
);

const Separator = () => <View style={styles.separator} />;

const Ticket = props => (
  <View style={styles.ticketContainer}>
    <Title
      style={{ marginBottom: 16 }}
      font={font}
      size={10}
      weight="600"
      color="rgba(72,72,72,0.4)"
    >
      {translate('your_order')}
    </Title>
    <RecapRow title={translate('total_excl_tax')} value={`${props.totalHT}€`} />
    <Separator />
    <RecapRow title={translate('total_vat')} value={`${props.totalVAT}€`} />
    <RecapRow title={translate('total_incl_tax')} value={`${props.totalTTC}€`} />
    <Separator />
    <RecapRow bold title={translate('total_price')} value={`${props.totalTTC}€`} />
  </View>
);

const Recap = props => (
  <Container
    title={translate('summary')}
    navigation={props.navigation}
  >
    <View style={{ alignItems: 'center' }}>
      <Ticket
        totalTTC={props.totalTTC}
        totalHT={props.totalHT}
        totalVAT={props.totalVAT}
      />
      <Title
        style={{ textAlign: 'center', marginTop: 30 }}
        font={font}
        color={Colors.text}
        size={16}
        weight="600"
      >
        {translate('when_take_order')}
      </Title>
      <Button
        style={{ marginTop: 120, alignSelf: 'center' }}
        onPress={() => props.navigation.navigate('Payment')}
        label={translate('finish_order')}
        backgroundColor={Colors.red}
        labelColor={Colors.white}
        fontSize={16}
        width={Dimensions.get('window').width * 0.8}
        height={50}
      />
      <Title
        style={StyleSheet.flatten(styles.acceptGTC)}
        font={font}
        color={Colors.text}
        size={10}
      >
        {translate('accept_gtc')}
      </Title>
    </View>
  </Container>
);

Recap.propTypes = {};
Recap.defaultProps = {};

export default Recap;
