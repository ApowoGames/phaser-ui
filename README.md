# Notes of Phaser3 engine

## Links

- [Phaser3](https://github.com/photonstorm/phaser)
    - [Discord channel](https://discord.gg/phaser)
    - [Forum](https://phaser.discourse.group/)
- [API](https://photonstorm.github.io/phaser3-docs/index.html)
- [Notes](https://Tooqingrainbow.github.io/phaser3-Tooqing-notes/docs/site/index.html)
    - [tooqingui](https://Tooqingrainbow.github.io/phaser3-Tooqing-notes/docs/site/ui-overview/)
    - [Discord channel](https://discord.gg/kWkuFZK)

## Demo

### Prepare

1. Install [node.js](https://nodejs.org/en/) (ver 10+, for rollup)
2. Click `install.bat`
    - `npm install`

### Run examples

1. Click `*.bat` in folder `examples`, it will open application on browser

### Export minify file of plugins

1. Click `export-plugins.bat`
    - `npm run build`

## File structure

- Folder `dist` : Plugin minify files
- Folder `plugins`, `templates` : Source code of plugins and templates
- Folder `examples` : Test code of plugins
- Folder `docs` : Some notes of phaser3, and my plugins.
    - `site\index.html` : Entry point.

## Showcase

- Webgl shader effect
    - [Swirl](https://codepen.io/Tooqingrainbow/full/RBXQBo)
    - [Pixelation](https://codepen.io/Tooqingrainbow/full/MqgmgE)
    - [Toonify](https://codepen.io/Tooqingrainbow/full/ErWNXa)
- [Virtual joystick](https://codepen.io/Tooqingrainbow/full/oyqvQY)
- Path finder
    - [Find area, get path](https://codepen.io/Tooqingrainbow/full/qvJwjJ)
    - [Move from high to low](https://codepen.io/Tooqingrainbow/full/NJOmQg)
    - [Energy drain](https://codepen.io/Tooqingrainbow/pen/vMjNNm)
- [Bejeweled](https://codepen.io/Tooqingrainbow/full/wEVYoY)
- [Kaleidoscope](https://codepen.io/Tooqingrainbow/full/RdzvVj)
- UI
    - [Dialog](https://codepen.io/Tooqingrainbow/pen/oQjMWE)
        - [Yes/No](https://codepen.io/Tooqingrainbow/pen/MPZWZG)
        - [Choice](https://codepen.io/Tooqingrainbow/pen/ePoRVz)
        - [Pop-up](https://codepen.io/Tooqingrainbow/pen/NEpjmP)
    - [Edit](https://codepen.io/Tooqingrainbow/pen/YbvwBw)
    - [Menu](https://codepen.io/Tooqingrainbow/pen/PxOEBr)
    - [Text-box](https://codepen.io/Tooqingrainbow/pen/MzGoJv)
    - [Text-area](https://codepen.io/Tooqingrainbow/pen/JzBZzy)
    - [Number bar](https://codepen.io/Tooqingrainbow/pen/qLZPXr)
    - [Grid table](https://codepen.io/Tooqingrainbow/pen/XyJbWX)
    - [Tabs](https://codepen.io/Tooqingrainbow/pen/qJeVza)
        - [Tabs-tables](https://codepen.io/Tooqingrainbow/pen/BGKvXK)
    - [Scroll-able panel](https://codepen.io/Tooqingrainbow/pen/YMyBom)
    - [Pages](https://codepen.io/Tooqingrainbow/pen/vPWzBa)
    - [Fix-width sizer](https://codepen.io/Tooqingrainbow/pen/WPJPdK)
    - [Chart](https://codepen.io/Tooqingrainbow/pen/qwVBNy)
    - [Video](https://codepen.io/Tooqingrainbow/pen/Gazmyz)
    - [Anchor](https://codepen.io/Tooqingrainbow/pen/jJqXxB)
    - [Round-rectangle](https://codepen.io/Tooqingrainbow/pen/ZqqJjG)