import './like-btn.scss'
import 'material-icons'
import '../btn/btn'

import 'jquery'

$(document).ready(() => {
    $('.like-btn').on('click', (e) => {
        // user could click on the different parts of a like-button,
        // so you can't just take the first parent of e.target
        const likeBtn = e.target.closest('.like-btn')
        const isClicked = likeBtn.classList.contains('like-btn_active')
        
        // increment / decrement like counter
        $('.like-btn__likes-number', likeBtn).text( (_i, num) =>
            parseInt(num) + (isClicked ? -1 : +1)
        )
        
        // replace one material icon with another
        $('.like-btn__icon', likeBtn).text( 
            isClicked ? 'favorite_border' : 'favorite'
        )

        // add / remove "*_active" class
        $(likeBtn).toggleClass('like-btn_active')
    })
})