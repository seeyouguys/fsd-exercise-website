// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

import 'jquery'

// https://www.npmjs.com/package/jquery-mask-plugin
// docs: https://igorescobar.github.io/jQuery-Mask-Plugin/docs.html
// TLDR:
//    use data-mask="00/00/0000" (or whatever other mask) as the attribute of the input
//    +text-field('masked text input')(name="date", data-mask="00/00/0000", placeholder='DD/MM/YYYY')
import 'jquery-mask-plugin'

// https://www.npmjs.com/package/item-quantity-dropdown
// slightly modified version of plugin:
// 'text plural' property now takes an array instead of a string,
// e.g. textPlural: ['гость', 'гостя', 'гостей'],
// (1 гость, 2-3 гостя, 5-9 гостей)
import './quantity-dropdown.js'
import './quantity-dropdown-config.js'

// My scripts