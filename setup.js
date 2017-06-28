import React, {Component} from 'react'
import { Navigator } from 'react-native-deprecated-custom-components'
import { View, Text } from 'react-native'
import WelcomePage from './app/ui/WelcomePage'
export default class Setup extends Component {
  _renderScene(route, navigator) {
    let Component = route.component;
    return (
      <Component {...route.params} navigator={navigator}/>
    )
  }
  render() {
    return (
      <Navigator
        initialRoute={{
          name: 'WelcomePage',
          component: WelcomePage
        }}
        renderScene={(e,i)=>this._renderScene(e,i)}
      />
    )
  }
}
