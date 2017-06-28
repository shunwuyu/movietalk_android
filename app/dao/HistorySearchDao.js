// 快递查询历史
import React, {Component} from "react"
import {storage} from 'react-native'
import ThemeFactory, {ThemeFlags} from '../res/styles/ThemeFactory';
export default class HistorySearchDao {
  constructor () {
  }
  loadThemeDataFromLocal () {
    return new Promise((resolve, reject) => {
      resolve(ThemeFactory.createTheme(ThemeFlags.Blue))
    })
  }
}
