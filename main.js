$(document).ready(function () {
    // Initializes jQuery UI tabs
    function initTabs() {
        $('#tabs').tabs();
    }

    // Retrieves and displays the player's name from sessionStorage
    function addNameFromStorage() {
        var storedPlayerName = sessionStorage.getItem('playerName');
        if (storedPlayerName) {
            $('#player').text(`Player Name: ${storedPlayerName}`);
        }
    }

    // Adds the player's name to sessionStorage and updates the display
    function addName() {
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
    initTabs();
    addNameFromStorage(); // Display the player's name from sessionStorage if available
});
