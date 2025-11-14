import React from 'react'
import { render, screen } from '@testing-library/react'
import RangeSlider from '../lib/index.js'

describe('RangeSlider specs', () => {
  it('should render properly', () => {
    render(<RangeSlider />)
    const element = screen.queryAllByTestId('element')
    const thumbs = element[0].querySelectorAll('.range-slider__thumb')
    const range = element[0].querySelectorAll('.range-slider__range')
    
    expect(element.length).toEqual(1)
    expect(thumbs.length).toEqual(2)
    expect(range.length).toEqual(1)
  })

  it('should have default aria values', () => {
    render(<RangeSlider />)
    const element = screen.queryAllByTestId('element')
    const thumbs = element[0].querySelectorAll('.range-slider__thumb')
    
    Array.from(thumbs).forEach(t => {
      expect(t.getAttribute('aria-valuemin')).toEqual('0')
      expect(t.getAttribute('aria-valuemax')).toEqual('100')
    })
    expect(thumbs[0].getAttribute('aria-valuenow')).toEqual('25')
    expect(thumbs[1].getAttribute('aria-valuenow')).toEqual('75')
  })

  it('should render with custom props', () => {
    render(<RangeSlider className={'custom-class'} min={10} max={50} defaultValue={[10, 30]} />)
    const element = screen.queryAllByTestId('element')
    const thumbs = element[0].querySelectorAll('.range-slider__thumb')

    expect(element[0].className).toEqual('range-slider custom-class')
    Array.from(thumbs).forEach(t => {
      expect(t.getAttribute('aria-valuemin')).toEqual('10')
      expect(t.getAttribute('aria-valuemax')).toEqual('50')
    })
    expect(thumbs[0].getAttribute('aria-valuenow')).toEqual('10')
    expect(thumbs[1].getAttribute('aria-valuenow')).toEqual('30')
  })

  it('should expose API methods via ref', () => {
    const ref = React.createRef()
    render(<RangeSlider ref={ref} />)
    expect(ref.current).toBeDefined()
    expect(ref.current.element).toBeInstanceOf(HTMLDivElement)
    expect(ref.current.range).toBeInstanceOf(HTMLDivElement)
    expect(ref.current.thumb.lower).toBeInstanceOf(HTMLDivElement)
    expect(ref.current.thumb.upper).toBeInstanceOf(HTMLDivElement)
  })
})
