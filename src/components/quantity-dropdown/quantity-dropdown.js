/* global jQuery */

// for Russian plurals
import getPluralNoun from './pluralRus';

/* eslint-disable func-names */
(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: 'item',
    textPlural: ['items'],
    controls: {
      position: 'right',
      displayCls: 'iqdropdown-content',
      controlsCls: 'iqdropdown-item-controls',
      counterCls: 'counter',
    },
    items: {},
    onChange: () => {},
    beforeDecrement: () => true,
    beforeIncrement: () => true,
  };

  $.fn.iqDropdown = function (options) {
    this.each(function () {
      const $this = $(this);
      const $selection = $this.find('p.iqdropdown-selection').last();
      const $menu = $this.find('div.iqdropdown-menu');
      const $items = $menu.find('div.iqdropdown-menu-option');
      const $dropdownButtons = $menu.find('div.iqdropdown-menu-buttons');
      const settings = $.extend(true, {}, defaults, options);
      const itemCount = {};
      let totalItems = 0;

      // updates the head of dropdown
      function updateDisplay () {
        // break down array of word forms into pieces
        const text = getPluralNoun(totalItems, ...settings.textPlural);
        $selection.html(`${totalItems} ${text}`);
      }

      // visually disable buttons if allowed range of values for an item is exceeded
      function updateButtons ($incrementButton, $decrementButton, itemCount, item) {
        $decrementButton.toggleClass('iqdropdown-button_disabled', itemCount <= item.minCount)
        $incrementButton.toggleClass('iqdropdown-button_disabled', itemCount >= item.maxCount)

        // show "clear" button if anything was decremented/incremented
        $this.addClass('menu-changed');
      }

      function setItemSettings (id, $item) {
        const minCount = Number($item.data('mincount'));
        const maxCount = Number($item.data('maxcount'));

        settings.items[id] = {
          minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
          maxCount: Number.isNaN(Number(maxCount)) ? settings.maxItems : maxCount,
        };
      }

      // generate template for controls (2 buttons and a counter) and returns it
      function addControls (id, $item) {

        const $controls = $('<div />').addClass(settings.controls.controlsCls);
        const $decrementButton = $(`
          <button class="button-decrement ${itemCount[id] <= settings.items[id].minCount ? 'iqdropdown-button_disabled' : ''}" />
        `);
        const $incrementButton = $(`
          <button class="button-increment ${itemCount[id] >= settings.items[id].maxCount ? 'iqdropdown-button_disabled' : ''}" />
        `);
        const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);

        $item.children('div').addClass(settings.controls.displayCls);
        $controls.append($decrementButton, $counter, $incrementButton);

        (settings.controls.position === 'right') ? $item.append($controls) : $item.prepend($controls);


        // decrement event handler
        $decrementButton.click((event) => {
          const { items, minItems, beforeDecrement, onChange } = settings;
          const allowClick = beforeDecrement(id, itemCount);

          if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
            itemCount[id] -= 1;
            totalItems -= 1;
            $counter.html(itemCount[id]);
            updateDisplay();
            updateButtons($incrementButton, $decrementButton, itemCount[id], items[id])

            onChange(id, itemCount[id], totalItems);
          }

          event.preventDefault();
        });

        // increment event handler
        $incrementButton.click((event) => {
          const { items, maxItems, beforeIncrement, onChange } = settings;
          const allowClick = beforeIncrement(id, itemCount);

          
          // change totalItems and update counter if all is ok
          if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
            itemCount[id] += 1;
            totalItems += 1;
            $counter.html(itemCount[id]);
            updateDisplay();
            updateButtons($incrementButton, $decrementButton, itemCount[id], items[id])

            onChange(id, itemCount[id], totalItems);
          }
          
          event.preventDefault();
        });

        $item.click(event => event.stopPropagation());

        return $item;
      }

      // generate template for "clear" and "apply" buttons
      function addDropdownButtons () {
        // if these elements were provided by markup, work with them
        const $buttonClear = $dropdownButtons.find('.button-clear')
        $buttonClear.addClass('btn btn_text btn_text-secondary')
        
        const $buttonApply = $dropdownButtons.find('.button-apply')
        $buttonApply.addClass('btn btn_text btn_text-primary')
        
        // reset all itemCount to 0
        // TODO: it should reset to the every item's minCount instead of a 0
        $buttonClear.click(event => {
          for (let id in itemCount) {
            itemCount[id] = 0
          }
          
          $items.find('.counter').text('0')
          totalItems = 0
          updateDisplay()
          
          // temp solution
          $items.find('.button-decrement').addClass('iqdropdown-button_disabled')
          $items.find('.button-increment').removeClass('iqdropdown-button_disabled')
        })

        // functionality for "apply" button
        $buttonApply.click(event => {
          $this.toggleClass('menu-open');
        })
      }

      // hide/show dropdown if it's header was clicked
      $selection.click(() => {
        $this.toggleClass('menu-open');
      });

      $items.each(function () {
        const $item = $(this);
        const id = $item.data('id');
        const defaultCount = Number($item.data('defaultcount') || '0');

        itemCount[id] = defaultCount;
        totalItems += defaultCount;
        setItemSettings(id, $item);
        addControls(id, $item);
      });

      addDropdownButtons();
      updateDisplay();
    });

    return this;
  };
}(jQuery));
