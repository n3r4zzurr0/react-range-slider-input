[circleci-image]: https://circleci.com/gh/n3r4zzurr0/react-range-slider-input.svg?style=shield
[circleci-url]: https://circleci.com/gh/n3r4zzurr0/react-range-slider-input
[npm-image]: https://img.shields.io/npm/v/react-range-slider-input.svg
[npm-url]: https://npmjs.org/package/react-range-slider-input
[vulnerabilities-image]: https://snyk.io/test/npm/react-range-slider-input/badge.svg
[vulnerabilities-url]: https://snyk.io/test/npm/react-range-slider-input
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com
[license-image]: https://img.shields.io/github/license/n3r4zzurr0/range-slider-input.svg
[license-url]: https://github.com/n3r4zzurr0/range-slider-input/blob/main/LICENSE

# react-range-slider-input
[![circleci][circleci-image]][circleci-url] [![npm][npm-image]][npm-url] [![known vulnerabilities][vulnerabilities-image]][vulnerabilities-url] [![javascript style guide][standard-image]][standard-url] [![license][license-image]][license-url]

React component wrapper for [range-slider-input](https://github.com/n3r4zzurr0/range-slider-input) (a lightweight [~2kB] library to create range sliders that can capture a value or a range of values with one or two drag handles).

**[CodeSanbox Demo](https://codesandbox.io/s/react-range-slider-input-demo-ymw2kp?file=/src/App.js)**

[![Demo](https://n3r4zzurr0.in/static/rsi-demo600.gif)](https://n3r4zzurr0.in/range-slider-input/)


<br>

## Installation
```
npm install react-range-slider-input
```

## Usage

**v3.0.x and above (recommended)**
```js
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function () {
    return (
        <RangeSlider />
    );
}
```
**v2.1.x and below**
```js
import RangeSlider from 'react-range-slider-input';

export default function () {
    return (
        <RangeSlider />
    );
}
```

## Props

<table>
<tr>
    <th>Property</th>
    <th>Type</th>
    <th>Default value</th>
    <th>Description</th>
</tr>
<tr>
    <td><code>id</code></td>
    <td>string</td>
    <td>null</td>
    <td>Identifier string (<code>id</code> attribute value) to be passed to the range slider element.</td>
</tr>
<tr>
    <td><code>className</code></td>
    <td>string</td>
    <td>null</td>
    <td>String of classes to be passed to the range slider element.</td>
</tr>
<tr>
    <td><code>min</code></td>
    <td>number</td>
    <td>0</td>
    <td>Number that specifies the lowest value in the range of permitted values.<br>Its value must be less than that of <code>max</code>.</td>
</tr>
<tr>
    <td><code>max</code></td>
    <td>number</td>
    <td>100</td>
    <td>Number that specifies the greatest value in the range of permitted values.<br>Its value must be greater than that of <code>min</code>.</td>
</tr>
<tr>
    <td><code>step</code></td>
    <td>number / string</td>
    <td>1</td>
    <td>Number that specifies the amount by which the slider value(s) will change upon user interaction.<br>Other than numbers, the value of <code>step</code> can be a string value of <code>any</code>.<br><br>From <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#step">MDN</a>,<blockquote> A string value of <code>any</code> means that no stepping is implied, and any value is allowed (barring other constraints, such as min and max).</blockquote></td>
</tr>
<tr>
    <td><code>defaultValue</code></td>
    <td>number[]</td>
    <td>[25, 75]</td>
    <td>Array of two numbers that specify the default values of the lower and upper offsets of the range slider element respectively. <b>If set, the range slider will be rendered as an uncontrolled element. To render it as a controlled element, set the <code>value</code> property.</b></td>
</tr>
<tr>
    <td><code>value</code></td>
    <td>number[]</td>
    <td>[]</td>
    <td>Array of two numbers that specify the values of the lower and upper offsets of the range slider element respectively. <b>If set, the range slider will be rendered as a controlled element.</b></td>
</tr>
<tr>
    <td><code>onInput</code></td>
    <td>function</td>
    <td>NOOP</td>
    <td>Function to be called when there is a change in the value(s) of range sliders upon user interaction.</td>
</tr>
<tr>
    <td><code>onThumbDragStart</code></td>
    <td>function</td>
    <td>NOOP</td>
    <td>Function to be called when the <code>pointerdown</code> event is triggered for any of the thumbs.</td>
</tr>
<tr>
    <td><code>onThumbDragEnd</code></td>
    <td>function</td>
    <td>NOOP</td>
    <td>Function to be called when the <code>pointerup</code> event is triggered for any of the thumbs.</td>
</tr>
<tr>
    <td><code>onRangeDragStart</code></td>
    <td>function</td>
    <td>NOOP</td>
    <td>Function to be called when the <code>pointerdown</code> event is triggered for the range.</td>
</tr>
<tr>
    <td><code>onRangeDragEnd</code></td>
    <td>function</td>
    <td>NOOP</td>
    <td>Function to be called when the <code>pointerup</code> event is triggered for the range.</td>
</tr>
<tr>
    <td><code>disabled</code></td>
    <td>boolean</td>
    <td>false</td>
    <td>Boolean that specifies if the range slider element is disabled or not.</td>
</tr>
<tr>
    <td><code>rangeSlideDisabled</code></td>
    <td>boolean</td>
    <td>false</td>
    <td>Boolean that specifies if the range is slidable or not.</td>
</tr>
<tr>
    <td><code>thumbsDisabled</code></td>
    <td>boolean[]</td>
    <td>[false, false]</td>
    <td>Array of two Booleans which specify if the lower and upper thumbs are disabled or not, respectively. If only one Boolean value is passed instead of an array, the value will apply to both thumbs.</td>
</tr>
<tr>
    <td><code>orientation</code></td>
    <td>string</td>
    <td>horizontal</td>
    <td>String that specifies the axis along which the user interaction is to be registered. By default, the range slider element registers the user interaction along the X-axis. It takes two different values: <code>horizontal</code> and <code>vertical</code>.</td>
</tr>
</table>


## Elements

Refer to [range-slider-input's Elements section](https://github.com/n3r4zzurr0/range-slider-input#elements)


## Styling

Refer to [range-slider-input's Styling section](https://github.com/n3r4zzurr0/range-slider-input#styling)


## License

MIT © [Utkarsh Verma](https://github.com/n3r4zzurr0)
