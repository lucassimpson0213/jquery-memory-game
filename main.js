$(document).ready(function () {
    $('#tabs').tabs();
    


    let rowsMap = new Map([
            [8, 1],
            [16, 2],
            [24, 3],
            [32, 4],
            [40, 5],
            [48, 6]
        
        ]
    )



    $('#num_cards').on('change', function () {
        var val = parseInt($(this).val(), 10);
        var requiredRows = rowsMap.get(val)
        

        for(let i = 1; i <= 6; i++){
            if(i <= requiredRows) 
            {
                $('#row' + i).show();
            } else {

                $('#row' + i).hide();
            }
        }


    })

      $('a').each(function (index, element) {
         console.log(`Jquery Element ${i}: \n \n ${element}`)
      })
        
    });
    console.log(value)






});


