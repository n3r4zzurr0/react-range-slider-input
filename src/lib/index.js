import React, { forwardRef } from 'react'
import RangeSliderInner from './components/RangeSlider'

const RangeSlider = forwardRef((props, ref) => {
  return <RangeSliderInner {...props} forwardedRef={ref} />
})

export default RangeSlider
