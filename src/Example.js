import React, { useState } from 'react'
import RangeSlider from './lib/index.js'
import './Example.css'

export default () => {
  const [classes, setClasses] = useState()
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  const [step, setStep] = useState('any')
  const [value, setValue] = useState()
  const [orientation, setOrientation] = useState('horizontal')
  const [disabled, setDisabled] = useState(false)
  const [thumbsDisabled, setThumbsDisabled] = useState([false, false])
  const [rangeSlideDisabled, setRangeSlideDisabled] = useState(false)

  return (
    <div className='container'>
      <button onClick={() => {
        setMin(30)
        setMax(90)
      }}
      >min = 30, max = 90
      </button>
      <button onClick={() => {
        setMin(0)
        setMax(100)
      }}
      >min = 0, max = 100
      </button>
      <button onClick={() => { setStep(2) }}>step = 2</button>
      <button onClick={() => { setStep('any') }}>step = 'any'</button>
      <button onClick={() => { setValue() }}>no value</button>
      <button onClick={() => { setValue([30, 60]) }}>value = [30, 60]</button>
      <button onClick={() => { setValue([25, 75]) }}>value = [25, 75]</button>
      <button onClick={() => { setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal') }}>toggle orientation</button>
      <button onClick={() => { setDisabled(!disabled) }}>toggle disabled</button>
      <button onClick={() => { setThumbsDisabled(!thumbsDisabled) }}>toggle thumbsDisabled</button>
      <button onClick={() => { setThumbsDisabled([false, true]) }}>thumbsDisabled = [false, true]</button>
      <button onClick={() => { setThumbsDisabled([true, false]) }}>thumbsDisabled = [true, false]</button>
      <button onClick={() => { setRangeSlideDisabled(!rangeSlideDisabled) }}>toggle rangeSlideDisabled</button>
      <button onClick={() => { setClasses(classes === 'styled' ? '' : 'styled') }}>toggle class</button>
      <RangeSlider
        id='range-slider'
        className={classes}
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={[15, 90]}
        orientation={orientation}
        disabled={disabled}
        thumbsDisabled={thumbsDisabled}
        rangeSlideDisabled={rangeSlideDisabled}
      />
    </div>
  )
}
