import React, {Component} from 'react';
import {RefreshControl, BackHandler,View, Text, StyleSheet, Swipeout, ListView, Image, TouchableOpacity} from 'react-native';
import MoreMenu, {MORE_MENU} from '../../common/MoreMenu'
// import Swipeout from "react-native-swipeout";
import Toast from 'react-native-easy-toast';
import WebViewPage from "../WebViewPage";
import SearchMainPage from '../search/SearchMainPage';
import JAdView from './JAdView';
import ViewUtils from '../../util/ViewUtils.js';
import Colors from '../../res/Colors';
import NavigationBar from '../../common/NavigationBar';
import TracesDataDao from '../../dao/TracesDataDao';
import QRScannerPage from '../scan/QRScannerPage.js'
var tracesDataDao = new TracesDataDao();
export default class HomePage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      theme: this.props.theme,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      isLoading: false,
      isEmptyOrFail: false,
      emptyOrFailTip: '当前没有数据',
      traceDatas: null
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='易快递'
          style={this.state.theme.styles.navBar}
          statusBar={{backgroundColor: this.state.theme.themeColor}}
          rightButton={this._renderRightView()}
          hide={false}
        />
        {this._renderMenuView()}
        <JAdView
          onClick={(url, title) => this._onClickAd(url, title)}
          theme={this.state.theme}/>

        <Toast ref={e => this.toast = e}/>
      </View>
    )
  }
  _renderMenuView () {
    return (
      <View style={[styles.menuContainerStyles, this.state.theme.styles.navBar]}>
        <TouchableOpacity activeOpacity={0.5} style={styles.menuItemStyles}
          onPress={() => this._onClickMenu("查快递")}>
          <Image source={require('../../res/images/ic_search.png')}
            style={styles.menuImageStyles}/>
          <Text style={styles.menuFontStyles}>查快递</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={styles.menuItemStyles}
          onPress={() => this._onClickMenu("寄快递")}>
          <Image source={require('../../res/images/ic_post.png')}
            style={styles.menuImageStyles}/>
          <Text style={styles.menuFontStyles}>寄快递</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={styles.menuItemStyles}
          onPress={() => this._onClickMenu("扫码")}>
          <Image source={require('../../res/images/ic_sweep.png')}
            style={styles.menuImageStyles}/>
          <Text style={styles.menuFontStyles}>扫码</Text>
        </TouchableOpacity>
      </View>
    )
  }
  _renderRightView () {
    return ViewUtils.getMoreButton(() => {
      // this.refs.moreMenu.open()
    })
  }
  _onClickAd (url, title) {
    this.props.navigator.push({
      component: WebViewPage,
      params: {
        url: url,
        ittle: title,
        theme: this.state.theme
      }
    })
  }
  _onClickMenu (menuTitle) {
    switch(menuTitle) {
      case '查快递':
        this.props.navigator.push({
          component: SearchMainPage,
          params: {
            title: menuTitle,
            theme: this.state.theme
          }
        })
      break;
      case '扫码':
        this.props.navigator.push({
          component: QRScannerPage,
          params: {
            'title': menuTitle,
            'theme': this.state.theme
          }
        })
      break;
    }
  }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress',(e) => this._onHardwareBackPress(e));
    // 初始化数据
    this._loadData();
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', (e) => this._onHardwareBackPress(e));
  }
  _loadData () {
    this.setState({
      isLoading: true,
      isEmptyOrFail: false
    })


    tracesDataDao.loadTracesDataByRecentSearch().then((tracesDatas) => {
        // console.log('traceData' + tracesDatas);
      this.setState({
        isLoading: false,
        isEmptyOrFail: false,
        traceDatas: tracesDatas,
        dataSource: this.state.dataSource.cloneWithRows(traceDatas)
      })
      this.toast.show(JSON.stringify(tracesDatas));
    }).catch((err) => {
      this.toast.show('error');
      this.setState({
        isLoading: false,
        isEmptyOrFail: true,
        // emptyOrFailTip:Con
      })
    })
  }
  _onHardwareBackPress(e) {

  }
  renderEmptyOrFailView () {
    return <View style={{flex:1, backgroundColor:Colors.white, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{alignItems: 'center'}}>
        <Image source={require('../../res/images/ic_no_exist.png')}
          style={{width: 100, height: 100, marginTop: 10}}
          resizeMode={'contain'}/>
        <Text style={{padding: 8, color: Colors.gray}}>{this.state.emptyOrFailTip}</Text>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  menuContainerStyles: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuItemStyles: {
    alignItems: 'center',
    flex: 1
  },
  menuFontStyles: {
    fontSize: 16,
    color: Colors.white,
    marginTop: 8
  },
  menuImageStyles: {
    width: 38,
    height: 38,
    padding:8
  }
})
