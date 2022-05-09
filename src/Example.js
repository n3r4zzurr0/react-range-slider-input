import React from 'react'
import RangeSlider from './lib/index.js'
import './Example.css'

class Example extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      min: 0,
      max: 100,
      step: 1,
      value: [30, 60],
      orientation: 'horizontal',
      disabled: false,
      thumbsDisabled: false,
      rangeSlideDisabled: false
    }
  }

  updateProperty (property, value) {
    this.setState(prevState => ({
      ...prevState,
      [property]: value
    }))
  }

  render () {
    return (
      <div className='container'>
        <button onClick={() => { this.updateProperty('disabled', !this.state.disabled) }}>toggle disabled</button>
        <button onClick={() => { this.updateProperty('thumbsDisabled', !this.state.thumbsDisabled) }}>toggle thumbsDisabled</button>
        <button onClick={() => { this.updateProperty('thumbsDisabled', [false, true]) }}>thumbsDisabled = [false, true]</button>
        <button onClick={() => { this.updateProperty('thumbsDisabled', [true, false]) }}>thumbsDisabled = [true, false]</button>
        <button onClick={() => { this.updateProperty('rangeSlideDisabled', !this.state.rangeSlideDisabled) }}>toggle rangeSlideDisabled</button>
        <RangeSlider
          id='range-slider-1'
          {...this.state}
        />
      </div>
    )
  }
}

export default Example
