## [PureMVC](http://puremvc.github.com/) [JavaScript](https://github.com/PureMVC/puremvc-js-multicore-framework/wiki) Demo - Employee Admin [![Playwright Tests](https://github.com/PureMVC/puremvc-js-demo-employeeadmin/actions/workflows/playwright.yml/badge.svg)](https://github.com/PureMVC/puremvc-js-demo-employeeadmin/actions/workflows/playwright.yml)
This demo illustrates techniques for performing routine client-side maintenance operations in a PureMVC-based application.

* [Live Demo](http://puremvc.org/pages/demos/JS/Demo_JS_EmployeeAdmin/ecma/)
*  [Legacy Implementation](https://github.com/PureMVC/puremvc-js-demo-employeeadmin/tree/1.1.0)

## Screenshot
![PureMVC JavaScript Demo: Employee Admin](http://puremvc.org/pages/images/screenshots/PureMVC-Shot-JS-EmployeeAdmin2.png?github)

## Features
* Semantic HTML
* CSS Architecture: [SMACSS](https://smacss.com) (Base, Layout, Module, State, Theme)
* Pure [Responsive Web Design](https://en.wikipedia.org/wiki/Responsive_web_design): Using [3 Elements](https://www.webfx.com/blog/web-design/understanding-the-elements-of-responsive-web-design/) (Fluid Grid - Flexible Images - Media Queries)
* [Closed Media Query Ranges](https://alistapart.com/article/mobile-first-css-is-it-time-for-a-rethink/)
* [plainJS](https://plainjs.com/javascript/)
* Vanilla JS Animations using [Robert Penner's Easing Functions](http://robertpenner.com/easing/) | [Cheat Sheet](https://easings.net/)

## Semantic HTML Components

```html
<section id="moduleName">
  <div class="wrapper">
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</section>
```

## CSS Property Order Reference

### Layout
- **System**: `display`, `content`
- **Grid**: `grid-template-columns`, `grid-template-rows`, `grid-column`, `grid-row`, `grid-gap`, `row-gap`, `column-gap`, `grid-template-areas`, `grid-area`, `justify-items`, `align-items`, `justify-content`, `align-content`
- **Flexbox**: `flex`, `flex-grow`, `flex-shrink`, `flex-basis`, `flex-direction`, `flex-wrap`, `flex-flow`, `justify-content`, `align-items`, `align-self`, `order`
- **Position**: `position`, `top`, `right`, `bottom`, `left`, `transform`, `float`, `clear`
- **Dimensions**: `width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `box-sizing`, `scale`, `block-size`, `aspect-ratio`
- **Margin**: `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`
- **Padding**: `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`
- **Clipping**: `overflow-x`, `overflow-y`, `clip-path`, `mask`
- **Visibility**: `visibility`, `z-index`, `opacity`, `backface-visibility`, `appearance`

### Typography, Table, Column, List
- **Color**: `color`, `accent-color`, `color-scheme`
- **Font**: `font-family`, `font-style`, `font-variant`, `font-weight`, `font-size`, `line-height`
- **Text**: `text-align`, `text-decoration`, `text-indent`, `text-shadow`, `text-transform`, `text-rendering`, `text-size-adjust`, `writing mode`, `quotes`, `hyphens`, `tab-size`
- **Spacing & Alignment**: `letter-spacing`, `word-spacing`, `word-wrap`, `white-space`, `vertical-align`
- **Table**: `table`, `table-caption`, `table-cell`, `table-header-group`, `table-footer-group`, `table-row`, `table-row-group`, `table-column`, `table-column-group`, `table-layout`, `caption-side`
- **Column**: `column-count`, `column-gap`, `column-rule-style`, `column-rule-width`, `column-rule-color`, `column-rule`, `column-span`, `column-width`
- **List**: `list-style`, `list-style-position`, `list-style-image`, `list-style-type`

### Border & Outline
- **Border**: `border`, `border-top`, `border-right`, `border-bottom`, `border-left`, `border-width`, `border-style`, `border-color`
- **Border Radius & Spacing**: `border-radius`, `border-collapse`, `border-spacing`
- **Outline**: `outline`, `outline-color`, `outline-style`, `outline-width`, `outline-offset`

### Background & Effects
- **Background**: `background-color`, `background-image`, `background-position`, `background-size`, `background-clip`, `background-repeat`, `background-origin`, `background-attachment`
- **Effects**: `box-shadow`, `filter`, `backdrop-filter`
- **Animation**: `transition`, `prefers-reduced-motion`

### Interaction
- `cursor`, `caret-color`, `pointer-events`, `user-select`, `touch-action`, `tap-highlight-color`

## Open and Closed media queries

```css
@media screen and (max-width: 320px) { /* X-Small screens (phones) */ }
@media screen and (max-width: 576px) { /* X-Small screens (phones) */ }
@media screen and (max-width: 767px) { /* Small screens (phones) */ }

@media screen and (min-width: 768px) and (max-width: 1023px) { /* Medium screens (tablets) */ }

@media screen and (min-width: 1024px) { /* large screens (desktops) */ }
@media screen and (min-width: 1200px) { /* XX-Large devices (larger desktops) */ }
@media screen and (min-width: 1920px) { /* XX-Large devices (larger desktops) */ }
@media screen and (min-width: 2560px) { /* XXX-Large devices (larger desktops) */ }
@media screen and (min-width: 3840px) { /* X4K-Large devices (larger desktops) */ }

/* High-resolution displays (Retina, etc.) */
@media screen and (-webkit-min-device-pixel-ratio: 2),
screen and (min--moz-device-pixel-ratio: 2),
screen and (-o-min-device-pixel-ratio: 2/1),
screen and (min-resolution: 192dpi),
screen and (min-resolution: 2dppx) {}
```

## CSS Frameworks
* [daisyUI](https://daisyui.com/)
* [tailwindcss](https://tailwindcss.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Material UI](https://mui.com/)
* [Materialize](https://materializecss.com/)
* [Bulma](https://bulma.io/)
* [Foundation](https://get.foundation/)
* [Semantic UI](https://semantic-ui.com/)
* [PureCSS](https://purecss.io/)
* [UIKit](https://getuikit.com/)
* [UI Components Handbook](https://www.uiguideline.com/components)

## JS Utilities
* [GSAP](https://gsap.com)
* [CreateJS](https://createjs.com)
* [Swiper](https://swiperjs.com)
* [ScrollMagic](https://scrollmagic.io)
* [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger)
* [D3](https://d3js.org)

## Status
Production - [Version 2.0](https://github.com/PureMVC/puremvc-js-demo-employeeadmin/blob/master/VERSION)

## Platforms / Technologies
* [JavaScript](http://en.wikipedia.org/wiki/JavaScript)
* [ECMA](https://en.wikipedia.org/wiki/ECMAScript)

## License
* PureMVC Javascript Demo - Employee Admin - Copyright © 2023 [Saad Shams](https://www.linkedin.com/in/muizz) [Patricia Diaz](https://www.linkedin.com/in/patriciadiaz1)
* PureMVC - Copyright © 2023 Futurescale, Inc.
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of Futurescale, Inc., PureMVC.org, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
