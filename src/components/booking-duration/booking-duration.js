import './booking-duration.scss'
// https://www.npmjs.com/package/air-datepicker
import 'air-datepicker'
import './datepicker-config2.scss'



$(document).ready(() => {
    // date showing fields
    const $arrivalField = $('#arrival-date')
    const $departureField = $('#departure-date')
    
    // datepicker instance (initialized automatically by class '.datepicker-here')
    const $datepicker = $arrivalField.data('datepicker')
    
    // separate the date range output into 2 fields
    $datepicker.update({
        range: true,
        multipleDatesSeparator: '-',
        onSelect: (formattedDate, jsDate, inst) => {
            $arrivalField.val(formattedDate.split("-")[0])
            $departureField.val(formattedDate.split("-")[1])
        }
    })

    // show the same cal even if user clicks on the departure field
    $departureField.on('click', () => $datepicker.show())
})