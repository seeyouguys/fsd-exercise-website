// item-quantity-dropdown jQuery plugin settings
// basic usage: https://www.npmjs.com/package/item-quantity-dropdown
// advanced example: https://github.com/reservamos/item-quantity-dropdown/tree/master/test


$(document).ready(() => {


    $('.iqdropdown').iqDropdown({
        // text to show on the dropdown
        selectionText: 'item',        
        // text to show for multiple items
        textPlural: ['гость', 'гостя', 'гостей'],

        // fires when an item quantity changes
        onChange: (id, count, totalItems) => {},
      });

});