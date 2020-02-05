import 'bxslider/dist/jquery.bxslider.min'
import 'bxslider/dist/jquery.bxslider.min.css'
import './room-preview.scss'

$(document).ready(() => {
    $('.bxslider').bxSlider({
        controls: true,
        nextText: 'chevron_left',
        prevText: 'chevron_left',
        mode: 'fade'
    });

    // slider customization
    $('.bx-prev, .bx-next').addClass('material-icons')
});