import React, {Component} from 'react';
import GlobalStyles from '../../res/styles/GlobalStyles'
import {View, Image, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native';
import ViewUtils from '../../util/ViewUtils'
import Colors from '../../res/Colors'
import QRScannerPage from '../scan/QRScannerPage'
import NavigationBar from '../../common/NavigationBar'
export default class SearchMainPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      canGoBack: false,
      title: this.props.title,
      expNo: this.props.expNo,
      companyData: null
    }
  }
  render () {
    let deleteView = this.state.expNo?<TouchableOpacity
      style={styles.deleteViewStyles}
      source={require('../../res/images/ic_delete.png')}
      style={{
        width: 20,
        height:20
      }}></TouchableOpacity>: null;
    return (
      <View style={GlobalStyles.listView_container}>
        <NavigationBar
          leftButton={ViewUtils.getLeftButton(()=>this.onBackPress())}
          navigator={this.props.navigator}
          popEnabled={false}
          style={this.props.theme.styles.navBar}
          title={this.state.title}/>
        <View style={styles.scanContainerStyle}>
          <TextInput
            style={[styles.inputStyle, {borderColor: this.props.theme.themeColor}]}
            underlineColorAndroid='transparent'
            placeholder={'请输入或扫描运单号'}
            onfocus={true}
            multiline={true}
            keyboradType={'numeric'}
            placeholderTextColor={Colors.gray}
            value={this.state.expNo}
            onChangeText={(text)=>{
              this.setState({
                expNo: text
              });
              this._getExpressData(text);
            }}
          />
          {deleteView}
          <TouchableOpacity onPress={()=>this._scanClick()}>
            <Image
            source={require('../../res/images/ic_scan.png')}
            style={[{
              width: 35,
              height: 35,
              marginRight: 5
            }, this.props.theme.styles.tabBarSelectedIcon]}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  // 后退
  onBackPress () {
    this.props.navigator.pop();
    return true;
  }

  _getExpressData(expNo) {

  }
  _scanClick () {
    this.props.navigator.push({
      component: QRScannerPage,
      params: {
        title: '扫码',
        theme: this.props.theme,
        callback: (result) => {
          this.setState({
            expNo: result
          });
        }
      }
    })
  }
}
const styles = StyleSheet.create({
  deleteViewStyles: {
    position: 'absolute',
    right: 65
  },
  scanContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputStyle: {
    textAlignVertical: 'center',
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 40,
    fontSize: 16,
    height: 40,
    width: GlobalStyles.window_width - 70,
    borderWidth: 1,
    margin: 10,
    borderRadius: 2
  }
})
