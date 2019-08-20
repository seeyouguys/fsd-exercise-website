// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

import 'jquery'


// https://www.npmjs.com/package/item-quantity-dropdown
// slightly modified version of plugin:
// 'text plural' property now takes an array instead of a string,
// e.g. textPlural: ['гость', 'гостя', 'гостей'],
// (1 гость, 2-3 гостя, 5-9 гостей)
import './quantity-dropdown.js'
import './quantity-dropdown-config.js'