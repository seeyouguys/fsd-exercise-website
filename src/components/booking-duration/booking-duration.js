import './booking-duration.scss'

// https://www.npmjs.com/package/air-datepicker
import 'air-datepicker'

$(document).ready(() => {
    $('.datepicker-init').datepicker({
        range: true,
        multipleDatesSeparator: '-',
        onSelect: function (formatedDate, date, inst) { 
            // $("#start_one").val(formatedDate.split("-")[0]);
            // $("#end_one").val(formatedDate.split("-")[1]);
            console.log(inst)
          }
    })
})