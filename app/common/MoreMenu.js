import React, {Component, PropTypes} from 'react';
import Popover from '../common/Popover'
export default class MoreMenu extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isVisible: false,
      buttonRect: {}
    }
  }

  renderMoreView () {
    let view = <Popover>
    </Popover>
    return view;
  }

  render () {
    return (this.renderMoreView())
  }
}
