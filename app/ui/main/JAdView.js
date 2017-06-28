import React from 'react'
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import GlobalStyles from '../../res/styles/GlobalStyles'
var AdData = require('../../../LocalData/AdData.json');
var JAdView = React.createClass({
  _startTimer () {
    var scrollView = this.refs.scrollView;
    var imagesCount = AdData.data.length;
    this.timer = setInterval(() => {
      var activePage;
      if((this.state.activePage + 1) >= imagesCount ) {
        activePage = 0;
      } else {
        activePage = this.state.activePage + 1;
      }
      var currentX = activePage * GlobalStyles.window_width;
      scrollView.scrollResponderScrollTo({x: currentX, y: 0, animated: true});
      this.setState({
        activePage: activePage
      })
    }, this.state.timer)
  },
  componentDidMount () {
    this._startTimer()
  },
  getInitialState () {
    return {
      activePage: 0,
      timer: 3000,
    }
  },
  _renderIndicator() {
    var indicatorArr = [], style = {color: 'gray'};
    for(var i = 0; i < 3; i++) {
      indicatorArr.push(
        <Text key={i} style={[{fontSize: 22}, style]}>&bull;</Text>
      )
    }
    return indicatorArr
  },
  _onClickAd (url, title) {
    if(this.props.onClickAd == null) return;
    this.props.onClickAd(url, title);
  },
  _onScrollAnimationEnd (e) {
    var page = Math.floor(e.nativeEvent.contentOffset.x / GlobalStyles.window_width);
    this.setState({
        activePage: page
    });
  },
  _onScrollEndDrag () {
    this._startTimer();
  },
  _onScrollBeginDrag () {
    clearInterval(this.timer);
  },
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          onMomentumScrollEnd={this._onScrollAnimationEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          onScrollBeginDrag={this._onScrollBeginDrag}
          ref="scrollView"
          horizontal={true}
          showHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          {this._renderScrollItem()}
        </ScrollView>
        <View style={styles.indicatorViewStyle}>
          {this._renderIndicator()}
        </View>
        <Text numberOfLines={1} style={styles.adTitleStyle}>{AdData.data[this.state.activePage].title}</Text>
      </View>
    )
  },
  _renderScrollItem () {
    var itemArr = [];
    var dataArr = AdData.data;
    for (var i = 0; i < dataArr.length; i++) {
      itemArr.push(
        <TouchableOpacity
          onPress={()=>this._onClickAd(dataArr[this.state.activePage].url, dataArr[this.state.activePage].title)}
          key={i}>
          <Image source={{uri: dataArr[i].imageUrl}} style={styles.adImageStyles} resizeMode={'cover'} />
        </TouchableOpacity>
      )
    }
    return itemArr
  }

})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  indicatorViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    width: GlobalStyles.window_width,
    bottom: 6
  },
  adImageStyles: {
    width: GlobalStyles.window_width,
    height: 100,
    backgroundColor: "white"
  },
  adTitleStyle: {
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    width: GlobalStyles.window_width,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    paddingBottom: 3,
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5
  }
})
export default JAdView
