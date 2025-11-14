import React, { useState, useEffect, useRef } from 'react'
import RangeSlider from './lib/index.js'
import './lib/style.css'
import './Example.css'

export default () => {
  const [toggleSecond, setToggleSecond] = useState(true)

  const [classes, setClasses] = useState()
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  const [step, setStep] = useState('any')
  const [value, setValue] = useState()
  const [value2, setValue2] = useState([30, 60])
  const [orientation, setOrientation] = useState('horizontal')
  const [disabled, setDisabled] = useState(false)
  const [thumbsDisabled, setThumbsDisabled] = useState([false, false])
  const [rangeSlideDisabled, setRangeSlideDisabled] = useState(false)

  const ref = useRef()

  useEffect(() => {
    console.log(ref.current)
  }, [value])

  useEffect(() => {
    console.log(value2)
  }, [value2])

  return (
    <div className='container'>
      <button onClick={() => { setToggleSecond(!toggleSecond) }}>Toggle Second Range Slider</button>
      <br /><br />
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
        ref={ref}
        className={classes}
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={setValue}
        defaultValue={[15, 90]}
        orientation={orientation}
        disabled={disabled}
        thumbsDisabled={thumbsDisabled}
        rangeSlideDisabled={rangeSlideDisabled}
      />
      {toggleSecond && <RangeSlider className='small' value={value2} onInput={setValue2} />}
    </div>
  )
}
