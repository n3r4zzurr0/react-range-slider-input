[travis-image]: https://img.shields.io/travis/n3r4zzurr0/react-range-slider-input/master.svg
[travis-url]: https://app.travis-ci.com/github/n3r4zzurr0/react-range-slider-input
[npm-image]: https://img.shields.io/npm/v/react-range-slider-input.svg
[npm-url]: https://npmjs.org/package/react-range-slider-input
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

# react-range-slider-input
[![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![javascript style guide][standard-image]][standard-url]

React component for [range-slider-input](https://www.npmjs.com/package/range-slider-input).

## Installation
```
npm install react-range-slider-input
```

## Usage
```js
import RangeSlider from 'react-range-slider-input';

function App() {
    return (
        <RangeSlider />
    );
}

export default App;
```

## Props

### `id`

Identifier string (`id` attribute value) to be passed to the range slider element.

### `className`

String of classes to be passed to the range slider element.

All the other props (**`min`,  `max`,  `step`,  `value` , `disabled`,  `rangeSlideDisabled`, `thumbsDisabled`** and **`orientation`**) are same as the properties set by `options` in [range-slider-input](https://www.npmjs.com/package/range-slider-input#options).

## License

MIT © [Utkarsh Verma](https://github.com/n3r4zzurr0)