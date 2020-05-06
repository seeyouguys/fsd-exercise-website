import './room-preview.scss'

// https://github.com/stevenwanderski/bxslider-4
import 'bxslider/dist/jquery.bxslider.min'
import 'bxslider/dist/jquery.bxslider.min.css'
import './bx-slider-config.scss'

$(document).ready(() => {
    $('.bxslider').bxSlider({
        controls: true,
        nextText: 'chevron_left',
        prevText: 'chevron_left',
        mode: 'fade'
    });

    // slider customization
    $('.bx-prev, .bx-next').addClass('material-icons')

    // it is hidden with css by default
    $('.bx-item').removeClass('bx-item_hidden')
});