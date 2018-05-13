import React from 'react';
import { Platform, StatusBar, View, StyleSheet, Dimensions } from 'react-native';


import Colors from '../../statics/colors';
import font from '../../assets/fonts';
import Title from '../../components/title/Title';
import Button from '../../components/button/Button';
import NavigationButton from '../../components/navigation-button/NavigationButton'

import styles from './Recap.styles'
import {translate} from '../../i18n'

const RecapRow = (props) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, marginTop: 4 }}>
    <Title font={font} size={12} weight={props.bold && "700"} color={Colors.text}>{props.title}</Title>
    <Title font={font} size={12} weight={props.bold && "700"} color={Colors.text}>{props.value}</Title>
  </View>
)

const Separator = () => (
  <View style={{
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.85,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(151, 151, 151, 0.3)',
    marginBottom: 8,
    marginTop: 8,
  }}/>
)

const Ticket = (props) => (
  <View style={{ backgroundColor: 'rgba(249, 249, 249, 0.8)', borderColor: 'rgba(151, 151, 151, 0.8)', borderWidth: StyleSheet.hairlineWidth, padding: 15}}>
    <Title style={{ marginBottom: 16 }} font={font} size={10} weight="600" color="rgba(72,72,72,0.4)">
      {translate('your_order')}
    </Title>
    <RecapRow title={translate('total_excl_tax')} value={`${props.totalHT}€`}/>
    <Separator />
    <RecapRow title={translate('total_vat')} value={`${props.totalVAT}€`}/>
    <RecapRow title={translate('total_incl_tax')} value={`${props.totalTTC}€`}/>
    <Separator />
    <RecapRow bold title={translate('total_price')} value={`${props.totalTTC}€`}/>
  </View>
)

const Recap = (props) => (
  <View
    style={{
      flex: 1,
      backgroundColor: Colors.white,
      paddingTop: Platform.select({
        ios: 20,
        android: StatusBar.currentHeight,
      }),
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
    }}
  >
    <View style={{ marginTop: 10 }}>
      <NavigationButton onPress={() => props.navigation.goBack()} back dark />
      <Title style={{ marginBottom: 30, marginTop: 10 }} size={22} color={Colors.text}>
        {translate('summary')}
      </Title>
    </View>
    <View style={{ alignItems: 'center' }}>
      <Ticket totalTTC={props.totalTTC} totalHT={props.totalHT} totalVAT={props.totalVAT}/>
      <Title style={{ textAlign: 'center', marginTop: 30 }} font={font} color={Colors.text} size={16} weight="700">
        {translate('when_take_order')}
      </Title>
      <Button
        style={{ marginTop: 120, alignSelf: 'center' }}
        onPress={props.checkout}
        label={translate('finish_order')}
        backgroundColor={Colors.red}
        labelColor={Colors.white}
        fontSize={16}
        width={Dimensions.get('window').width * 0.8}
        height={50}
      />
      <Title style={{ textAlign: 'center', marginTop: 24, paddingLeft: 20, paddingRight: 20 }} font={font} color={Colors.text} size={10}>
        {translate('accept_gtc')}
      </Title>
    </View>
  </View>
)

Recap.propTypes = {};
Recap.defaultProps = {};

export default Recap;
