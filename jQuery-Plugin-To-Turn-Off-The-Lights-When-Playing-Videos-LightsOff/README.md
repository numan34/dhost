# LightsOff

LightsOff is a jQuery-based plugin that provides a cinema-like experience while watching a video on a page.

It is based on the [Allofthelights] plugin by Pierrinho. Given the project's inactivity and my desire to integrate this with `npm`, I decided not to fork it and instead create a new repository.

> Regarding the overlay chunk design decision, I am aware of the possibility of using z-index to lay the video over the overlay itself. However, and due to Chrome's rendering of the divs (regarding parents) and bugs regarding the usage of the css properties transform and animation (reference needed), I decided to use the original chunk approach to this problem. 

**It seems that Chrome no longer exhibits this behaviour, meaning this plugin's method isn't necessary in most situations.**

This method also doesn't require using `z-index: auto` recursively.

## Features

- Multiple video support
- Customizable overlay (color and opacity)
- Control fade animation speed
- Customizable overlay toggle switch
- LightsOn/Off Events
- Public methods to manually show or hide the overlay
- Easy integration with Youtube, Vimeo and HTML5-based players

## Compatibility

- Chrome
- Firefox
- Edge
- Opera
- Safari
- IE9+

## Installation

```shell
npm install lightsoff
```

You may also manually download the `dist/lightsoff.min.js` file.

LightsOff requires [jQuery] 1.7.0+ to work.
```html
<!-- jQuery must be loaded before this line -->
<script src="lightsoff.min.js"></script>
```

### Usage

```javascript
$('VIDEO SELECTOR(S) HERE').lightsOff();
```

#### Configuration

LightsOff supports a few configuration options that you can pass as an object.

Example:

```javascript
$('VIDEO SELECTOR(S) HERE').lightsOff({
    color: 'pink',
    allowScrolling: false
});
```

Available options:

| Key               | Default | Description                                                                                                                                                               |
|-------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| color             | 'black' | Overlay color                                                                                                                                                             |
| opacity           | 0.95    | Overlay opacity                                                                                                                                                           |
| zIndex            | 999     | Overlay z-index (max is usually 2147483647). Value must be the highest in the page                                                                                        |
| switchSelectors   | []      | Selector(s) of the element(s) that toggle(s) the overlay. Edge cases: [] to disable all switches; ['#switch1',, '#switch3'] to add switches to the 1st and 3rd video only |
| durationLightsOff | 400     | Duration of overlay fade in animation (in milliseconds)                                                                                                                   |
| durationLightsOn  | 400     | Duration of overlay fade out animation (in milliseconds)                                                                                                                  |
| allowScrolling    | true    | Controls scrolling when overlay is visible                                                                                                                                |

#### Events

When the overlay is either shown or hidden, an event is triggered which you can use to provide some aditional functionality:

```javascript
$(document).on('lightsOff', function(e, video) {
    // Executed when overlay is shown
    // Your code here
});

$(document).on('lightsOn', function(e, video) {
    // Executed when overlay is hidden
    // Your code here
});
```

The `video` variable contains the selector for the affected video. Check the demos for an example on how to leverage it.

#### Public Methods

You may also display or hide the overlay for a specific video with method calls:

```javascript
$('VIDEO SELECTOR HERE').lightsOff('show');

$('VIDEO SELECTOR HERE').lightsOff('hide');
```

#### Demos

Demos for common usages of this plugin can be found in the `demo` folder.

- Multiple HTML5 `<video/>` + manual toggle
- HTML5 `<video/>` + manual toggle + custom config
- HTML5 `<video/>` manual toggle only
- HTML5 `<video/>`
- Youtube
- Vimeo

All demos show how to fully integrate the plugin with the video itself.

## License

MIT. See `License.md` for further information.

## Author

Miguel de Moura <me@migueldemoura.com>


[Allofthelights]: <https://github.com/Pierrinho/Allofthelights.js>
[jQuery]: <https://jquery.com/>
