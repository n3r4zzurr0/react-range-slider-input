import React from 'react';
import RangeSlider from './lib/index.js';
import './Example.css';

class Example extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			rangeSlider1: {
				min: 0,
				max: 100,
				step: 1,
				value: [10, 20],
				orientation: 'horizontal',
				disabled: false,
				thumbsDisabled: false,
				rangeSlideDisabled: false
			}
		};
	}

	render() {
		return (
			<div className="container">
				<button onClick={() => { this.state.rangeSlider1.min = 10; this.forceUpdate(); }}>min = 10</button>
				<button onClick={() => { this.state.rangeSlider1.max = 90; this.forceUpdate(); }}>max = 90</button>
				<button onClick={() => { this.state.rangeSlider1.step = 2; this.forceUpdate(); }}>step = 2</button>
				<button onClick={() => { this.state.rangeSlider1.value = [30, 60]; this.forceUpdate(); }}>value = [30, 60]</button>
				<button onClick={() => { this.state.rangeSlider1.value = [20, 40]; this.forceUpdate(); }}>value = [20, 40]</button>
				<button onClick={() => { this.state.rangeSlider1.value = [10, 20]; this.forceUpdate(); }}>value = [10, 20]</button>
				<button onClick={() => { this.state.rangeSlider1.orientation = 'vertical'; this.forceUpdate(); }}>orientation = 'vertical'</button>
				<button onClick={() => { this.state.rangeSlider1.disabled = !this.state.rangeSlider1.disabled; this.forceUpdate(); }}>toggle disabled</button>
				<button onClick={() => { this.state.rangeSlider1.thumbsDisabled = true; this.forceUpdate(); }}>thumbsDisabled = true</button>
				<button onClick={() => { this.state.rangeSlider1.thumbsDisabled = [false, true]; this.forceUpdate(); }}>thumbsDisabled = [false, true]</button>
				<button onClick={() => { this.state.rangeSlider1.rangeSlideDisabled = !this.state.rangeSlider1.rangeSlideDisabled; this.forceUpdate(); }}>toggle rangeSlideDisabled</button>
				<RangeSlider
					id="range-slider-1"
					{...this.state.rangeSlider1}
				/>
				<RangeSlider id="range-slider-2" />
				<RangeSlider id="range-slider-3" />
				<RangeSlider id="range-slider-4" />
			</div>
		);
	}
}

export default Example;
