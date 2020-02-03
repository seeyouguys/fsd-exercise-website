import './booking-duration.scss'
// https://www.npmjs.com/package/air-datepicker
import 'air-datepicker'
import './datepicker-config2.scss'

$(document).ready(() => {
    // date showing fields
    const $arrivalField = $('#arrival-date')
    const $departureField = $('#departure-date')
    
    // datepicker instance (initialized automatically by class '.datepicker-here')
    const $datepickerInst = $arrivalField.data('datepicker')
    
    // separate the date range output into 2 fields
    $datepickerInst.update({
        range: true,
        multipleDatesSeparator: '-',
        onSelect: (formattedDate, jsDate, inst) => {
            $arrivalField.val(formattedDate.split("-")[0])
            $departureField.val(formattedDate.split("-")[1])
        },
        onChangeMonth:  () => rerenderArrows($datepickerInst),
        onChangeYear:   () => rerenderArrows($datepickerInst),
        onChangeDecade: () => rerenderArrows($datepickerInst),
        onChangeView:   () => rerenderArrows($datepickerInst),
    })

    // show the same cal even if user clicks on the departure field
    $departureField.on('click', () => $datepickerInst.show())

    // create "clear" and "apply" buttons in the cal
    const $datepickerButtons = $(`
        <div class="datepicker--footer-buttons"></div>`
    ).appendTo($datepickerInst.$datepicker)


    const $buttonClear = $(`
        <button class="datepicker-btn btn_text-secondary">Очистить</button>
    `)
    .appendTo($datepickerButtons)
    .click(event => {
        $datepickerInst.clear()
        $datepickerInst.date = new Date() // return to current date
        rerenderArrows($datepickerInst)
        event.preventDefault()
    })

    const $buttonApply = $(`
        <button class="datepicker-btn btn_text-primary">Применить</button>
    `)
    .appendTo($datepickerButtons)
    .click(event => {
        $datepickerInst.hide()   
        event.preventDefault()
    })
    
    rerenderArrows($datepickerInst)
})

// overrides default nav arrows every time they are rendered
const rerenderArrows = (datepickerInst) => {
    datepickerInst.$datepicker.find('.datepicker--nav-action')
    .addClass('material-icons')
    .text('arrow_back')
    .last().text('arrow_forward')
}