/* global google */
import { PureComponent } from 'react'

import {
  applyUpdaterToNextProps,
  registerEvents,
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/MapChildHelper'

import { PolylinePropTypes } from '../../proptypes'

const eventMap = {
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRightClick: 'rightclick'
}

const updaterMap = {
  draggable(instance, draggable) {
    instance.setDraggable(draggable)
  },
  editable(instance, editable) {
    instance.setEditable(editable)
  },
  map(instance, map) {
    instance.setMap(map)
  },
  options(instance, options) {
    instance.setOptions(options)
  },
  path(instance, path) {
    instance.setPath(path)
  },
  visible(instance, visible) {
    instance.setVisible(visible)
  },
}

export class Polyline extends PureComponent {
  static propTypes = PolylinePropTypes

  constructor(props) {
    super(props);
    this.registeredEvents = [];

    this.state = {
      polyline: null
    }
  }

  componentDidMount() {
    const polyline = new google.maps.Polyline()

    this.setState({ polyline }, () => {
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: this.state.polyline
      })
    })
  }

  componentDidUpdate(prevProps) {
    unregisterEvents(this.registeredEvents)
    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.polyline
    })
  }

  componentWillUnmount() {
    unregisterEvents(this.registeredEvents)
    this.state.polyline && this.state.polyline.setMap(null)
  }

  render() {
    return null
  }

  getDraggable = () =>
    this.state.polyline.getDraggable()

  getEditable = () =>
    this.state.polyline.getEditable()

  getPath = () =>
    this.state.polyline.getPath()

  getVisible = () =>
    this.state.polyline.getVisible()

  getMap = () =>
    this.state.polyline.getMap()
}

export default Polyline
