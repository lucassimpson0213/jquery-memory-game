$(document).ready(function () {
    function addNameFromStorage() {
        var storedPlayerName = sessionStorage.get('playerName');
        if(storedPlayerName){
            $('#player').text(`Player Name: ${storedPlayerName}`);
        }
        
    }

    addNameFromStorage();
    function initTabs() {
        $('#tabs').tabs();
    }


    function addName() {

        let playerName = $('#player_name').val();

        if (!playerName) {
            alert('please enter your name!')
        }
        else {
            $('#player').text(`Player Name: ${playerName}`);
            sessionStorage.setItem('playerName', playerName);
        }
    }


    

    function adjustRowsVisibility(requiredRows) {
        for (let i = 1; i <= 6; i++) {
            if (i <= requiredRows) {
                $('#row' + i).show();
            } else {
                $('#row' + i).hide();
            }
        }
    }

    function updateRowsVisibility() {
        let rowsMap = new Map([
            [8, 1],
            [16, 2],
            [24, 3],
            [32, 4],
            [40, 5],
            [48, 6]
        ]);

        var val = parseInt($('#num_cards').val(), 10);
        var requiredRows = rowsMap.get(val);
        adjustRowsVisibility(requiredRows);
    }

    function logAnchorTags() {
        $('a').each(function (index, element) {
            console.log(`Jquery Element ${index}:`, element);
        });
    }

    $('#save_settings').click(function () {
        updateRowsVisibility();
        addName();
    });

    initTabs();
});
