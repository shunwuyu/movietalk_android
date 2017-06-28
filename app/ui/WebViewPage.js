import React, {Component} from 'react'
import {View, WebView} from 'react-native'
import GlobalStyles from "../res/styles/GlobalStyles";

export default class WebViewPage extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <View style={GlobalStyles.listView_container}>
        <WebView
          source={{uri: this.props.url}}
        />
      </View>
    )
  }
}
