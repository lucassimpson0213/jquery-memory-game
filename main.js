$(document).ready(function () {
    const uniqueImages = [
        "./images/card_1.png",
        "./images/card_2.png",
        "./images/card_3.png",
        "./images/card_4.png",
        "./images/card_5.png",
        "./images/card_6.png",
        "./images/card_7.png",
        "./images/card_8.png",
        "./images/card_9.png",
        "./images/card_10.png",
        "./images/card_11.png",
        "./images/card_12.png",
        "./images/card_13.png",
        "./images/card_14.png",
        "./images/card_15.png",
        "./images/card_16.png",
        "./images/card_17.png",
        "./images/card_18.png",
        "./images/card_19.png",
        "./images/card_20.png",
        "./images/card_21.png",
        "./images/card_22.png",
        "./images/card_23.png",
        "./images/card_24.png"
    ];

    let selectedImages = [];

    function initUITabs() {
        $('#tabs').tabs();
    }

    function preloadImages() {
        uniqueImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }


    function prepareCards() {
        let numCards = parseInt($('#num_cards').val(), 10);
        selectedImages = uniqueImages.slice(0, numCards / 2);
        let gameCards = selectedImages.concat(selectedImages);
        shuffle(gameCards);


        $('#cards').empty();


        gameCards.forEach((src, index) => {
           let card = `
                <a id="${src}" href="#">
                    <img class="card-back" src="./images/back.png" alt="">
                </a> `

            $(card).appendTo('#cards');
        })



    }

    let flippedCards = [];

    function handleCardClick(event) {
        event.preventDefault();
        const $clickedCard = $(this);
        const isMatched = $clickedCard.hasClass('matched');
        const isAnimated = $clickedCard.is(':animated');
        const hasTwoFlipped = flippedCards.length === 2;

        // Conditions under which a card click should be ignored
        if (isMatched || isAnimated || hasTwoFlipped) {
            return;
        }

        // Proceed to flip the card
        const imageSrc = $clickedCard.attr('id');
        $clickedCard.find('img').attr('src', imageSrc).addClass('flipped');
        flippedCards.push($clickedCard);

        // If two cards are flipped, proceed to check for a match
        if (flippedCards.length === 2) {
            setTimeout(matchCards, 1000); // Add a delay before checking for a match
        }
    }

    function matchCards() {
        const [firstCard, secondCard] = flippedCards;

        // Check if the flipped cards match
        if (firstCard.attr('id') === secondCard.attr('id')) {
            // Cards match: mark them as matched
            firstCard.add(secondCard).addClass('matched');
        } else {
            // Cards do not match: flip them back after a short delay
            setTimeout(() => {
                firstCard.add(secondCard).find('img').attr('src', './images/back.png').removeClass('flipped');
            }, 500); // Adjust timing as needed
        }

        // Reset the flippedCards array for the next turn
        flippedCards = [];
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
            $('#row' + i).toggle(i <= requiredRows);
        }
    }

    function updateRows() {
        let selectedNumberOfCards = parseInt($('#num_cards').val(), 10);
        let rowsMap = new Map([
            [8, 1],
            [16, 2],
            [24, 3],
            [32, 4],
            [40, 5],
            [48, 6]
        ]);
        let requiredRows = rowsMap.get(selectedNumberOfCards);
        adjustRows(requiredRows);
    }

    $('#save_settings').click(function () {
        prepareCards();
        addToSessionStorage();
        updateRows();
    });

    $('#cards').on('click', 'a', handleCardClick);
    

    preloadImages();
    initUITabs();
    GetFromSessionStorage();
    prepareCards();// Call updateRows to adjust the UI based on the default or previously saved settings
});
