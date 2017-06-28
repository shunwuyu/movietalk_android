import {
  Dimensions
} from 'react-native'
import Colors from "../../res/Colors";
const { height, width } = Dimensions.get('window')
module.exports = {
  window_width:width,
  nav_bar_height_ios: 44,
  nav_bar_height_android: 50,
  listView_container:{
    flex: 1,
    backgroundColor: Colors.white,
  }
}
