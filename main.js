$(document).ready(function () {
    const preloadedImages = []

    const uniqueImages = [

        "/images/card_1.png",

        "/images/card_2.png",

        "/images/card_3.png",

        "/images/card_4.png",

        "/images/card_5.png",

        "/images/card_6.png",

        "/images/card_7.png",

        "/images/card_8.png",

        "/images/card_9.png",

        "/images/card_10.png",

        "/images/card_11.png",

        "/images/card_12.png",

        "/images/card_13.png",

        "/images/card_14.png",

        "/images/card_15.png",

        "/images/card_16.png",

        "/images/card_17.png",

        "/images/card_18.png",

        "/images/card_19.png",

        "/images/card_20.png",

        "/images/card_21.png",

        "/images/card_22.png",

        "/images/card_23.png",

        "/images/card_24.png",

        "/images/card_25.png"
        

    ]

    



    // Initializes jQuery UI tabs
    function initUITabs() {

        $('#tabs').tabs();

    }

    function prepareImages() {

    }



    /*
        shuffle function:
        function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


    */


    // Retrieves and displays the player's name from sessionStorage
    function GetNameFromSessionStorage() {
        var storedPlayerName = sessionStorage.getItem('playerName');

        if (storedPlayerName)   {

            $('#player').text(`Player Name: ${storedPlayerName}`);
        }
    }





    // Adds the player's name to sessionStorage and updates the display
    function addNameToSessionStorage() {
        let playerName = $('#player_name').val();

        if (!playerName) {

            alert('Please enter your name!');

        } else {

            $('#player').text(`Player Name: ${playerName}`);

            sessionStorage.setItem('playerName', playerName);

        }
    }




    // Adjusts the visibility of rows based on the number of cards selected
    function adjustRowsVisibility(requiredRows) {
        for (let i = 1; i <= 6; i++) {
            if (i <= requiredRows) {

                $('#row' + i).show();

            } else {

                $('#row' + i).hide();

            }
        }
    }




    // Updates the visibility of rows based on the selected number of cards
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





    // Logs information about each anchor tag
    function logAnchorTags() {
        $('a').each(function (index, element) {

            console.log(`Jquery Element ${index}:`, element);

        });
    }

    // Event listener for the Save Settings button
    $('#save_settings').click(function () {

        updateRowsVisibility();

        addName();
    });

    // Initial setup
    initUITabs();

    GetNameFromSessionStorage(); // Display the player's name from sessionStorage if available
});
