$(document).ready(function () {
    $('#tabs').tabs();
    


    let rows = new Map([
            [8, 1],
            [16, 2],
            [24, 3],
            [32, 4],
            [40, 5],
            [48, 6]
        
        ]
    )



    $('#num_cards').on('change', function () {
        var val = $(this).val();
        var numRows = rows.get(val);
        var amtRows = getRows(rows);

        for(let i = 0; i <= amtRows; i++){
            $(`#row${i}`).hide();
        }


    })



});


function getRows(cardsAmt) {
    return 6 - cardsAmt;
}

