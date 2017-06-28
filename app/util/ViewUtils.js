import React from 'react'
import Colors from '../res/Colors.js'
import {
  Image,
  TouchableOpacity,
  View
} from 'react-native';
export default class ViewUtils {
  static getLeftButton (callBack) {
    return <TouchableOpacity
      style={{padding: 8}}
      onPress={callBack}>
      <Image style={{width: 26, height: 26}}
        source={require('../res/images/ic_arrow_back_white_36pt.png')}/>
    </TouchableOpacity>
  }
  static getMoreButton(callBack) {
    return (
      <TouchableOpacity
        ref='moreMenuButton'
        underlayColor='transparent'
        style={{padding:5}}
        onPress={callBack}>
        <View style={{paddingRight:8}}>
          <Image
            style={{width:24,height:24,marginLeft:5}}
            source={require('../res/images/ic_more_vert_white_48pt.png')}/>
        </View>
      </TouchableOpacity>
    )
  }
}
