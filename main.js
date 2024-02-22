$(document).ready(function () {


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

                "/images/card_24.png"

            

    ]

    



    // Initializes jQuery UI tabs
    function initUITabs() {
        $('#tabs').tabs();
    }

    const preloadedImages = [];

    function preloadImages() {
        uniqueImages.forEach(function(src) {
            const img = new Image();
            img.src = src;
            preloadedImages.push(img);
        });
    }

    let cards = []; // Use this array to track cards for the game

    function prepareCards(amountCards) {
        let cardsMap = new Map([
            [8, 4],
            [16, 8],
            [24, 12],
            [32, 16],
            [40, 20],
            [48, 24]
        ]);

        let numberOfUniqueCardsNeeded = cardsMap.get(amountCards);
        cards = uniqueImages.slice(0, numberOfUniqueCardsNeeded).flatMap(src => [src, src]);
        shuffle(cards);
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function GetFromSessionStorage() {
        var storedPlayerName = sessionStorage.getItem('playerName');
        if (storedPlayerName) {
            $('#player').text(`Player Name: ${storedPlayerName}`);
        }
    }

    function addToSessionStorage() {
        let playerName = $('#player_name').val();
        if (!playerName) {
            alert('Please enter your name!');
        } else {
            $('#player').text(`Player Name: ${playerName}`);
            sessionStorage.setItem('playerName', playerName);
        }
    }

    function adjustRows(requiredRows) {
        for (let i = 1; i <= 6; i++) {
            if (i <= requiredRows) {
                $('#row' + i).show();
            } else {
                $('#row' + i).hide();
            }
        }
    }

    function updateRows() {
        let rowsMap = new Map([
            [8, 1],
            [16, 2],
            [24, 3],
            [32, 4],
            [40, 5],
            [48, 6]
        ]);

        let selectedNumberOfCards = parseInt($('#num_cards').val(), 10);
        prepareCards(selectedNumberOfCards); // This needs to adjust based on the actual value
        let requiredRows = rowsMap.get(selectedNumberOfCards); // Fixed the undefined variable by using the selected number of cards
        adjustRows(requiredRows);
    }

    function logAnchorTags() {
        $('a').each(function(index, element) {
            console.log(`Jquery Element ${index}:`, element);
        });
    }

    $('#save_settings').click(function() {
        updateRows();
        addToSessionStorage();
    });

    // Initial setup
    preloadImages();
    initUITabs();
    GetFromSessionStorage();
    prepareCards(48); // Preparing for the default case of 48 cards
    
    // Display the player's name from sessionStorage if available
});
