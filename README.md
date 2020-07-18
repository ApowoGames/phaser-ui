# ui项目基于 Phaser3 引擎

## 链接

- [Phaser3](https://github.com/photonstorm/phaser)
    - [Discord channel](https://discord.gg/phaser)
    - [Forum](https://phaser.discourse.group/)
- [API](https://photonstorm.github.io/phaser3-docs/index.html)
- [Notes](https://rexuirainbow.github.io/phaser3-rexui-notes/docs/site/index.html)
    - [rexui](https://rexuirainbow.github.io/phaser3-rexui-notes/docs/site/ui-overview/)
    - [Discord channel](https://discord.gg/kWkuFZK)

### 安装

1. yarn add phaser-ui

### 使用

    - 项目入口类 import "@apowo/phaserui"
    - 对应组件 improt { Button } from "@apowo/phaserui" 其他组件可以通过rexui的api选择导入

### phaser-rexui 部分demo

- Webgl shader effect
    - [Swirl](https://codepen.io/rexuirainbow/full/RBXQBo)
    - [Pixelation](https://codepen.io/rexuirainbow/full/MqgmgE)
    - [Toonify](https://codepen.io/rexuirainbow/full/ErWNXa)
- [Virtual joystick](https://codepen.io/rexuirainbow/full/oyqvQY)
- Path finder
    - [Find area, get path](https://codepen.io/rexuirainbow/full/qvJwjJ)
    - [Move from high to low](https://codepen.io/rexuirainbow/full/NJOmQg)
    - [Energy drain](https://codepen.io/rexuirainbow/pen/vMjNNm)
- [Bejeweled](https://codepen.io/rexuirainbow/full/wEVYoY)
- [Kaleidoscope](https://codepen.io/rexuirainbow/full/RdzvVj)
- UI
    - [Dialog](https://codepen.io/rexuirainbow/pen/oQjMWE)
        - [Yes/No](https://codepen.io/rexuirainbow/pen/MPZWZG)
        - [Choice](https://codepen.io/rexuirainbow/pen/ePoRVz)
        - [Pop-up](https://codepen.io/rexuirainbow/pen/NEpjmP)
    - [Edit](https://codepen.io/rexuirainbow/pen/YbvwBw)
    - [Menu](https://codepen.io/rexuirainbow/pen/PxOEBr)
    - [Text-box](https://codepen.io/rexuirainbow/pen/MzGoJv)
    - [Text-area](https://codepen.io/rexuirainbow/pen/JzBZzy)
    - [Number bar](https://codepen.io/rexuirainbow/pen/qLZPXr)
    - [Grid table](https://codepen.io/rexuirainbow/pen/XyJbWX)
    - [Tabs](https://codepen.io/rexuirainbow/pen/qJeVza)
        - [Tabs-tables](https://codepen.io/rexuirainbow/pen/BGKvXK)
    - [Scroll-able panel](https://codepen.io/rexuirainbow/pen/YMyBom)
    - [Pages](https://codepen.io/rexuirainbow/pen/vPWzBa)
    - [Fix-width sizer](https://codepen.io/rexuirainbow/pen/WPJPdK)
    - [Chart](https://codepen.io/rexuirainbow/pen/qwVBNy)
    - [Video](https://codepen.io/rexuirainbow/pen/Gazmyz)
    - [Anchor](https://codepen.io/rexuirainbow/pen/jJqXxB)
    - [Round-rectangle](https://codepen.io/rexuirainbow/pen/ZqqJjG)
    
### 生成声明文件流程（Phaser3-ui项目）
1. 利用tsc指令将ts脚本转换成js脚本
2. 利用jsdoc的api对于js脚本属性和方法进行描述，再使用tsgen指令，生成phaserui.d.ts声明文件
3. 利用watch指令将ui库的js脚本打包成phaserui.js
4. 修改项目version，利用npm发布phaserui包
