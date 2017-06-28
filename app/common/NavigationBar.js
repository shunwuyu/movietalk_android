import React, {Component, PropTypes} from 'react';
import GlobalStyles from '../res/styles/GlobalStyles'

import {Platform, TouchableOpacity, StyleSheet, View, Text, StatusBar} from 'react-native';
const NAV_BAR_HEIGHT_IOS = GlobalStyles.nav_bar_height_ios
const NAV_BAR_HEIGHT_ANDROID = GlobalStyles.nav_bar_height_android
const STATUS_BAR_HEIGHT = 20;
const ButtonShape = {
  title: PropTypes.string.isRequired,
  style: PropTypes.any,
  handler: PropTypes.func
}
export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      popEnabled: true,
      hide: false
    }
  }

  leftView () {
    var leftView = this.props.leftButtonTitle?
      <Text style={styles.title}>{this.props.leftButtonTitle}</Text>: null;
    return (
      <TouchableOpacity onPress={()=>this.onLeftButtonClick()}>
        <View style={{width: 50, alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        {this.props.leftView? this.props.leftView: leftView}
        </View>
      </TouchableOpacity>
    )
  }

  onLeftButtonClick () {
      if(this.props.navigator && this.props.popEnabled) {
        this.props.navigator.pop();
      }
      if(this.props.onLeftButtonClick) {
        this.props.onLeftButtonClick();
      }
  }

  render () {
    let statusBar = (
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} barStyle="light-content" style={styles.statusBar}/>
      </View>
    );
    let titleView = this.props.titleView? this.props.titleView:
      <Text style={styles.title} ellipsizeMode="head" numberOfLines={1}>{this.props.title}</Text>;
    let content = (
      <View style={styles.navBar}>
        {this.getButtonElement(this.props.leftButton)}
        <View style={[styles.navBarTitleContainer]}>
          {titleView}
        </View>
        {this.getButtonElement(this.props.rightButton, {marginRight:8})}
      </View>
    )
    return (
      <View style={[styles.container, this.props.style]}>
        {statusBar}
        {content}
      </View>
    )
  }
  getButtonElement (data = {}, style) {
    return (
      <View style={styles.navBarButton}>
      {(!!data.props)? data: (
        <NavBarButton
          title={data.title}
          style={[data.style, style]}
          tintColor={data.tintColr}
          handler={data.handler}/>
      )}
      </View>
    )
  }
}

class NavBarButton extends Component {
  static propTypes = {
    leftButtonTitle: PropTypes.string,
    leftButton: PropTypes.oneOfType([
      PropTypes.shape(ButtonShape),
      PropTypes.element
    ])
  }
  render () {
    const {style, tintColor, margin, title, handler} = this.props;
    return (
      <TouchableOpacity style={styles.navBarButton} onPress={handler}>
        <View style={style}>
          <Text style={[styles.title,{color:tintColor}]}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4caf50'
  },
  statusBar: {
    height: Platform.OS === 'ios'?STATUS_BAR_HEIGHT:0
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios'? NAV_BAR_HEIGHT_IOS: NAV_BAR_HEIGHT_ANDROID
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    top:0,
    right:40,
    bottom:0
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF'
  },
  navBarButton: {
    alignItems: 'center'
  }
})
