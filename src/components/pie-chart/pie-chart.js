import './pie-chart.scss'
import getPluralNoun from '../../theme/utils/getPluralNoun';

// draw chart
$(document).ready(() => {

    $('.chart').each((i, el) => {
        const chartInstance = $(el)

        // show total votes count
        const voteCountTotal = chartInstance[0].dataset.totalCount
        chartInstance
            .find('.chart__total-votes')
            .text(voteCountTotal)

        // show caption in a correct form
        const captionText = getPluralNoun(voteCountTotal, 'голос', 'голоса', 'голосов')
        chartInstance
            .find('.chart__votes-caption')
            .text(captionText)
        
        // calc dasharray and dashoffset properties for every segment
        let offset = -0.5
        chartInstance
            .find('.chart__segment')
            .each((i, el) => {
                const voteCount = el.dataset.count
                const percent = voteCount / voteCountTotal * 100
                
                // -1 is for the gap between segments
                $(el).css({
                    "stroke-dasharray": `${ percent - 1 } 100`,
                    "stroke-dashoffset": offset
                })
    
                // every new segment should have an offset equal to the length of the previous ones
                offset -= percent
            })
    })  
})