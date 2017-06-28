import React, {Component} from 'react';
import {View} from 'react-native';
import QRScannerView from '../../common/QRScannerView'
export default class QRScannerPage extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View>
        <QRScannerView />
      </View>
    )
  }
}
