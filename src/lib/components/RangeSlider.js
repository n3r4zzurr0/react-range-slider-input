import React, { PureComponent, createRef } from 'react'
import clsx from 'clsx'
import './index.css'

// Options
const _min = 'min'
const _max = 'max'
const _step = 'step'
const _value = 'value'
const _onInput = 'onInput'
const _disabled = 'disabled'
const _orientation = 'orientation'
const _thumbsDisabled = 'thumbsDisabled'
const _rangeSlideDisabled = 'rangeSlideDisabled'

// Data Attributes
const _dataLower = 'data-lower'
const _dataUpper = 'data-upper'
const _dataFocused = 'data-focused'
const _dataDisabled = 'data-disabled'

const _current = 'current'
const _document = document
const _parseFloat = parseFloat
const _mathAbsolute = Math.abs
const _setAttribute = 'setAttribute'
const _removeAttribute = 'removeAttribute'
const _addEventListener = 'addEventListener'
const _getComputedStyle = window.getComputedStyle

const _listenerOptions = { passive: false, capture: true }

class RangeSlider extends PureComponent {
  constructor () {
    super()

    this.element = createRef()
    this.input = [createRef(), createRef()]
    this.thumb = [createRef(), createRef()]
    this.range = createRef()

    this.isComponentMounted = false
    this.options = {}
    this.value = { min: -1, max: -1 }
  }

  componentDidMount () {
    if (!this.isComponentMounted) {
      // Thumb indexes for min and max values
      this.index = { min: 0, max: 1 }
      // Thumb width for calculation of exact positions and sizes of <thumb>s and <range>
      this.thumbWidth = { min: 0, max: 0 }
      // Slider value depending on the user interaction
      this.sliderValue = { min: 0, max: 0 }
      // Slidable range limits (active when a <thumb> is disabled)
      this.rangeLimits = { min: 0, max: 0 }

      // For dragging <thumb>s and <range>
      this.maxWidth = 0
      this.rangeWidth = 0
      this.isDragging = false
      this.thumbDrag = false
      this.thumbIndex = 0
      this.startPos = 0

      // To check if extreme values have been set
      this.maxSet = false
      this.minSet = false

      this.resetSliders()

      // Add listeners to element
      this.element[_current][_addEventListener]('pointerdown', e => { this.elementFocused(e) }, _listenerOptions)

      // Add listeners to <thumb>s and set [data-disabled] on disabled <thumb>s
      this.thumb.forEach((t, i) => {
        t[_current][_addEventListener]('pointerdown', e => { this.initiateThumbDrag(e, i, t[_current]) }, _listenerOptions)
      })

      // Add listeners to <range>
      this.range[_current][_addEventListener]('pointerdown', e => { this.initiateRangeDrag(e) }, _listenerOptions)

      // Add global listeners
      _document[_addEventListener]('pointermove', e => { this.drag(e) }, _listenerOptions)
      _document[_addEventListener]('pointerup', () => {
        if (this.isDragging) {
          this.thumb[0][_current][_removeAttribute](_dataFocused)
          this.thumb[1][_current][_removeAttribute](_dataFocused)
          this.range[_current][_removeAttribute](_dataFocused)
          this.isDragging = false
        }
      }, _listenerOptions)
      window[_addEventListener]('resize', () => {
        this.syncThumbWidth()
        this.updateThumbs()
        this.updateRange()
      })

      this.lastPropsValue = this.options[_value]
      this.isComponentMounted = true
    }
  }

  componentDidUpdate () {
    let val = false
    if (!this.areArraysSame(this.options[_value], this.lastPropsValue)) {
      val = this.options[_value]
      this.lastPropsValue = val
    }
    this.resetSliders(val ? { min: val[0], max: val[1] } : '')
  }

  resetSliders (val = '') {
    this.maxWidth = this.options[_max] - this.options[_min]
    if (this.maxWidth === 0) { this.maxWidth = 1 }
    this.syncThumbWidth()
    this.setValue(val, true, false)
    this.updateRangeLimits()

    this.thumb.forEach((t, i) => {
      if (this.options[_thumbsDisabled][i === 1 ? this.index[_max] : this.index[_min]]) { t[_current][_setAttribute](_dataDisabled, '') } else { t[_current][_removeAttribute](_dataDisabled) }
    })
    if (this.options[_disabled]) { this.element[_current][_setAttribute](_dataDisabled, '') } else { this.element[_current][_removeAttribute](_dataDisabled) }
  }

  isNumber (n) {
    return +n + '' === n + ''
  }

  areArraysSame (a1, a2) {
    let i = a1.length
    while (i--) {
      if (a1[i] !== a2[i]) { return false }
    }
    return true
  }

  // Set min and max values to 1 if any of the min or max values are "invalid"
  // Setting both values 1 will disable the slider
  safeMinMaxValues () {
    let error = false
    if (!this.isNumber(this.options[_min]) || !this.isNumber(this.options[_max])) { error = true }
    this.options[_min] = error ? 1 : +this.options[_min]
    this.options[_max] = error ? 1 : +this.options[_max]
  }

  // Reframe the thumbsDisabled value if "invalid"
  safeThumbsDisabledValues () {
    if (this.options[_thumbsDisabled] instanceof Array) {
      if (this.options[_thumbsDisabled].length === 1) { this.options[_thumbsDisabled].push(false) }
      if (this.options[_thumbsDisabled].length !== 1 && this.options[_thumbsDisabled].length !== 2) { this.options[_thumbsDisabled] = [false, false] }
    } else { this.options[_thumbsDisabled] = [this.options[_thumbsDisabled], this.options[_thumbsDisabled]] }

    // Boolean Values
    this.options[_thumbsDisabled][0] = !!this.options[_thumbsDisabled][0]
    this.options[_thumbsDisabled][1] = !!this.options[_thumbsDisabled][1]
  }

  setValue (val, forceSet = false, callback = true) {
    const currentValue = {
      min: this.input[this.index[_min]][_current][_value],
      max: this.input[this.index[_max]][_current][_value]
    }

    val = val || currentValue

    this.sliderValue = val
    this.input[this.index[_min]][_current][_value] = val[_min]
    this.input[this.index[_max]][_current][_value] = (this.thumbDrag || forceSet) ? val[_max] : (val[_min] + this.rangeWidth)
    this.value[_min] = +this.input[this.index[_min]][_current][_value]
    this.value[_max] = +this.input[this.index[_max]][_current][_value]

    if (forceSet) {
      // Check if the values are correctly set
      if (this.value[_min] > this.value[_max]) {
        this.switchIndex()
        this.value[_min] = +this.input[this.index[_min]][_current][_value]
        this.value[_max] = +this.input[this.index[_max]][_current][_value]
      }
      this.sliderValue = this.value
    }

    let valueSet = false

    if (currentValue[_min] !== this.input[this.index[_min]][_current][_value] || forceSet) { valueSet = true }

    if (currentValue[_max] !== this.input[this.index[_max]][_current][_value] || forceSet) { valueSet = true }

    // Update the <thumb>s and <range> positions and widths everytime a value is set
    if (valueSet) {
      if (callback && this.options[_onInput]) { this.options[_onInput]([this.value[_min], this.value[_max]]) }
      this.updateThumbs()
      this.updateRange()
    }
  }

  // Switch <thumb> indexes whenever lower and upper <thumb>s switch positions
  switchIndex () {
    this.index[_min] = +!this.index[_min]
    this.index[_max] = +!this.index[_max]
    this.thumb[this.index[_min]][_current][_removeAttribute](_dataUpper)
    this.thumb[this.index[_max]][_current][_removeAttribute](_dataLower)
    this.thumb[this.index[_min]][_current][_setAttribute](_dataLower, '')
    this.thumb[this.index[_max]][_current][_setAttribute](_dataUpper, '')
    if (this.thumbDrag) { this.thumbDrag = this.thumbDrag === _min ? _max : _min }
  }

  updateInputState () {
    let indexSwitched = false

    if (this.thumbIndex === this.index[_min]) {
      if (this.input[this.thumbIndex][_current][_value] > this.value[_max]) {
        this.switchIndex()
        indexSwitched = true
      }
    }

    if (this.thumbIndex === this.index[_max]) {
      if (this.input[this.thumbIndex][_current][_value] < this.value[_min]) {
        this.switchIndex()
        indexSwitched = true
      }
    }

    if (indexSwitched) { this.setValue('', true) }
  }

  updateThumbs () {
    this.thumb[this.index[_min]][_current].style.left = `calc(${((this.value[_min] - this.options[_min]) / this.maxWidth) * 100}% + ${(0.5 - ((this.value[_min] - this.options[_min]) / this.maxWidth)) * this.thumbWidth[_min]}px)`
    this.thumb[this.index[_max]][_current].style.left = `calc(${((this.value[_max] - this.options[_min]) / this.maxWidth) * 100}% + ${(0.5 - ((this.value[_max] - this.options[_min]) / this.maxWidth)) * this.thumbWidth[_max]}px)`
  }

  updateRange () {
    const deltaLeft = ((0.5 - ((this.value[_min] - this.options[_min]) / this.maxWidth)) * this.thumbWidth[_min]) / this.element[_current].clientWidth
    const deltaWidth = ((0.5 - ((this.value[_max] - this.options[_min]) / this.maxWidth)) * this.thumbWidth[_max]) / this.element[_current].clientWidth
    this.range[_current].style.left = `${(((this.value[_min] - this.options[_min]) / this.maxWidth) + deltaLeft) * 100}%`
    this.range[_current].style.width = `${(((this.value[_max] - this.options[_min]) / this.maxWidth) - ((this.value[_min] - this.options[_min]) / this.maxWidth) - deltaLeft + deltaWidth) * 100}%`
  }

  updateRangeLimits () {
    this.rangeLimits[_min] = this.options[_thumbsDisabled][0] ? this.value[_min] : this.options[_min]
    this.rangeLimits[_max] = this.options[_thumbsDisabled][1] ? this.value[_max] : this.options[_max]
  }

  // <thumb> width value is to be synced with CSS for correct calculation of <range> width and position
  syncThumbWidth () {
    this.thumbWidth[_min] = _parseFloat(_getComputedStyle(this.thumb[this.index[_min]][_current]).width)
    this.thumbWidth[_max] = _parseFloat(_getComputedStyle(this.thumb[this.index[_max]][_current]).width)
  }

  currentPosition (e, node) {
    return ((node.offsetLeft + (e[`client${this.options[_orientation] === 'vertical' ? 'Y' : 'X'}`] - node.getBoundingClientRect()[this.options[_orientation] === 'vertical' ? 'top' : 'left']) - (this.thumbDrag ? ((0.5 - (this.value[this.thumbDrag] - this.options[_min]) / this.maxWidth) * this.thumbWidth[this.thumbDrag]) : 0)) / this.element[_current].clientWidth) * this.maxWidth + this.options[_min]
  }

  eventElementTagName (e) {
    return e.target.tagName.toLowerCase()
  }

  elementFocused (e) {
    let setFocus = false

    if (!this.options[_disabled] && ((this.eventElementTagName(e) !== 'thumb' && this.eventElementTagName(e) !== 'range') || (this.options[_rangeSlideDisabled] && this.eventElementTagName(e) !== 'thumb'))) { setFocus = true }

    if (setFocus) {
      if (this.options[_thumbsDisabled][0] && this.options[_thumbsDisabled][1]) { setFocus = false }
    }

    if (setFocus) {
      let currPos = this.currentPosition(e, this.range[_current])
      if (currPos < 0) { currPos = 0 }
      const deltaMin = _mathAbsolute(this.value[_min] - currPos)
      const deltaMax = _mathAbsolute(this.value[_max] - currPos)

      if (this.options[_thumbsDisabled][0]) {
        if (currPos >= this.value[_min]) {
          this.setValue({ min: this.value[_min], max: currPos }, true)
          this.initiateThumbDrag(e, this.index[_max], this.thumb[this.index[_max]][_current])
        }
      } else if (this.options[_thumbsDisabled][1]) {
        if (currPos <= this.value[_max]) {
          this.setValue({ min: currPos, max: this.value[_max] }, true)
          this.initiateThumbDrag(e, this.index[_min], this.thumb[this.index[_min]][_current])
        }
      } else {
        let nearestThumbIndex = 1
        if (deltaMin === deltaMax) { this.setValue({ min: this.value[_min], max: currPos }, true) } else {
          this.setValue({ min: deltaMin < deltaMax ? currPos : this.value[_min], max: deltaMax < deltaMin ? currPos : this.value[_max] }, true)
          nearestThumbIndex = deltaMin < deltaMax ? this.index[_min] : this.index[_max]
        }
        this.initiateThumbDrag(e, nearestThumbIndex, this.thumb[nearestThumbIndex][_current])
      }
    }
  }

  initiateThumbDrag (e, i, node) {
    if (!this.options[_disabled] && !this.options[_thumbsDisabled][i === 1 ? this.index[_max] : this.index[_min]]) {
      this.syncThumbWidth()
      this.startPos = this.currentPosition(e, node)
      this.thumbDrag = this.index[_min] === i ? _min : _max
      this.thumbIndex = i
      this.isDragging = true
      this.thumb[i][_current][_setAttribute](_dataFocused, '')
    }
  }

  initiateRangeDrag (e) {
    if (!this.options[_disabled] && !this.options[_rangeSlideDisabled]) {
      this.syncThumbWidth()
      this.rangeWidth = this.value[_max] - this.value[_min]
      this.startPos = this.currentPosition(e, this.range[_current])
      this.thumbDrag = false
      this.isDragging = true
      this.range[_current][_setAttribute](_dataFocused, '')
    }
  }

  valuesUpdated (lastPos) {
    this.startPos = lastPos
    this.updateInputState()
  }

  drag (e) {
    if (this.isDragging) {
      const lastPos = this.currentPosition(e, this.range[_current])
      const delta = lastPos - this.startPos

      let min = this.value[_min]
      let max = this.value[_max]
      const lower = this.thumbDrag ? this.rangeLimits[_min] : this.options[_min]
      const upper = this.thumbDrag ? this.rangeLimits[_max] : this.options[_max]

      if (!this.thumbDrag || this.thumbDrag === _min) { min = this.thumbDrag ? lastPos : (this.sliderValue[_min] + delta) }
      if (!this.thumbDrag || this.thumbDrag === _max) { max = this.thumbDrag ? lastPos : (this.sliderValue[_max] + delta) }

      if (min >= lower && min <= upper && max >= lower && max <= upper) {
        this.setValue({ min, max })
        this.valuesUpdated(lastPos)
        this.maxSet = false
        this.minSet = false
      } else {
        // When min thumb reaches upper limit
        if (min > upper && this.thumbDrag && !this.minSet) {
          this.setValue({ min: upper, max: upper })
          this.valuesUpdated(lastPos)
          this.minSet = true
        }
        // When max thumb reaches lower limit
        if (max < lower && this.thumbDrag && !this.maxSet) {
          this.setValue({ min: lower, max: lower })
          this.valuesUpdated(lastPos)
          this.maxSet = true
        }
        // When range / min thumb reaches lower limit
        if (min < lower && !this.minSet) {
          if (!this.thumbDrag) { this.setValue({ min: lower, max: this.value[_max] - this.value[_min] + lower }) } else { this.setValue({ min: lower, max: this.value[_max] }) }
          this.valuesUpdated(lastPos)
          this.minSet = true
        }
        // When range / max thumb reaches upper limit
        if (max > upper && !this.maxSet) {
          if (!this.thumbDrag) { this.setValue({ min: this.value[_min] - this.value[_max] + upper, max: upper }) } else { this.setValue({ min: this.value[_min], max: upper }) }
          this.valuesUpdated(lastPos)
          this.maxSet = true
        }
      }
      if (!this.thumbDrag) { this.updateRangeLimits() }
    }
  }

  setDefaultIfNotSet (property, defaultValue) {
    this.options[property] = {}.hasOwnProperty.call(this.props, property) ? this.props[property] : defaultValue
  }

  render () {
    this.setDefaultIfNotSet(_rangeSlideDisabled, false)
    this.setDefaultIfNotSet(_thumbsDisabled, [false, false])
    this.setDefaultIfNotSet(_orientation, 'horizontal')
    this.setDefaultIfNotSet(_disabled, false)
    this.setDefaultIfNotSet(_onInput, false)
    this.setDefaultIfNotSet(_value, [0.25, 0.75])
    this.setDefaultIfNotSet(_step, 'any')
    this.setDefaultIfNotSet(_min, 0)
    this.setDefaultIfNotSet(_max, 1)

    this.safeMinMaxValues()
    this.safeThumbsDisabledValues()

    return (
      <div id={this.props.id} ref={this.element} className={clsx('range-slider', this.props.className)}>
        <input ref={this.input[0]} type='range' min={this.options[_min]} max={this.options[_max]} step={this.options[_step]} value={this.value[_min] === -1 ? this.options[_value][0] : this.value[_min]} onChange={() => {}} />
        <input ref={this.input[1]} type='range' min={this.options[_min]} max={this.options[_max]} step={this.options[_step]} value={this.value[_max] === -1 ? this.options[_value][1] : this.value[_max]} onChange={() => {}} />
        <thumb ref={this.thumb[0]} is='custom' data-lower />
        <thumb ref={this.thumb[1]} is='custom' data-upper />
        <range ref={this.range} is='custom' />
      </div>
    )
  }
};

export default RangeSlider
