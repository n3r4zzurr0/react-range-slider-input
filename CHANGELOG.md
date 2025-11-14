### v.3.3.x
Added public ref API. 
The component now exposes DOM elements via `ref.current`:

```ts
interface ReactRangeSliderInputRef {
  element: HTMLDivElement;
  range: HTMLDivElement;
  thumb: {
    lower: HTMLDivElement;
    upper: HTMLDivElement;
  };
}
```

### v.3.2.x
New props: `ariaLabel` and `ariaLabelledBy`

### v.3.1.x
Merged a [PR](https://github.com/n3r4zzurr0/react-range-slider-input/pull/9) that adds a TypeScript declaration file.

### v3.0.x
Internal references to CSS files have been removed. The user has to import the CSS files by themselves.

### v2.1.x
New props: `onThumbDragStart`, `onThumbDragEnd`, `onRangeDragStart` and `onRangeDragEnd`


### v2.0.x
Some new features have been introduced and some of the old features have been modified.

What's new?
- Keyboard accessibility
- ARIA value attributes
- Support for negative values
- Improved vertical orientation

What's changed?
- `<range>` element is replaced by `<div class="range-slider__range"></div>`
- `<thumb>` elements are replaced by `<div class="range-slider__thumb"></div>`
- `data-focused` is renamed to `data-active`.

### v1.0.x

Initial releases.
