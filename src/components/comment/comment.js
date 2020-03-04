import './comment.scss'
const moment = require('moment')

// replace dates in comments to date-from-now text
$(document).ready(() => {
    moment.locale('ru')
    $('.comment__date').each( function() {
        const datePublished = $(this).text()
        const newText = moment(datePublished).fromNow()
        $(this).text(newText)
    })
})

// TODO: optimise moment for webpack
// see more: momentjs.com/docs/#/use-it/webpack/