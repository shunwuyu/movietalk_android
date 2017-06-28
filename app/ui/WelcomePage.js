import React, {Component} from 'react';
import {Image, StyleSheet, View, InteractionManager} from 'react-native';
import HomePage from './main/HomePage.js'
import HistorySearchDao from '../dao/HistorySearchDao.js'
var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window')
export default class WelcomePage extends Component {
  componentDidMount () {
    const {navigator} = this.props
    this.theme = new HistorySearchDao().loadThemeDataFromLocal().then((theme)=>{
      this.theme = theme;
    })

    // 推晚点运行
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        // 重置向某路由
        navigator.resetTo({
          component: HomePage,
          name: 'HomePage',
          // 传参
          params: {
            theme: this.theme
          }
        })
      }, 2000)
    })
  }
  render () {
      return (
        <View>
          <Image style={{width:width, height:height}} resizeMode={'contain'}
            source={require('../res/images/ic_welcome_screen.png')}
          />
        </View>
      )
  }
}
