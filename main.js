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


    function displayHighScore() {
        // If there have been no clicks or there is no high score, don't proceed.
        if (amtClicks === 0 || !localStorage.getItem('highScore')) {
            return;
        }

        // Retrieve the high score from localStorage.
        let highScore = localStorage.getItem('highScore');

        // Update the HTML element designated to show the high score.
        // Assuming you have an element with the ID 'high_score' for this purpose.
        $('#high_score').text(`High Score: ${highScore}`);
    }


    function storeHighScore(highScore) {
        localStorage.setItem('highScore', highScore.toString());
        
    }

    let flippedCards = [];
    let amtClicks = 0;
    let correctClicks = 0;

    function handleCardClick(event) {
        event.preventDefault();
        const $clickedCard = $(this);
        const isMatched = $clickedCard.hasClass('matched');
        const isAnimated = $clickedCard.is(':animated');
        const hasTwoFlipped = flippedCards.length === 2;

        if (isMatched || isAnimated || hasTwoFlipped) {
            return;
        }

        const imageSrc = $clickedCard.attr('id');
        $clickedCard.find('img').fadeOut(500, function () {
            $(this).attr('src', imageSrc).fadeIn(500);
        });
        flippedCards.push($clickedCard);

        if (flippedCards.length === 2) {
            setTimeout(matchCards, 1000); // Add a delay before checking for a match
        }
    }

    function matchCards() {
        if (flippedCards.length < 2) {
            return; // Ensure we have exactly two cards flipped before proceeding.
        }

        const [firstCard, secondCard] = flippedCards;

        // Check if the cards match
        if (firstCard.attr('id') === secondCard.attr('id')) {
            amtClicks++;
            correctClicks++;
            // If the cards match, wait 1 second, then hide them with a sliding motion
            setTimeout(() => {
                firstCard.add(secondCard).find('img').slideUp(500, function () {
                    $(this).parent().addClass('matched'); // Optionally, hide or visually indicate matched cards
                });
            }, 1000);
        } else {
            amtClicks++;
            
            // If the cards do not match, wait 2 seconds, fade them out, flip back to the back image, then fade back in
            setTimeout(() => {
                firstCard.add(secondCard).find('img').fadeOut(500, function () {
                    $(this).attr('src', './images/back.png').fadeIn(500);
                }).removeClass('flipped');
            }, 2000);
        }

        flippedCards = []; // Reset flipped cards array for the next turn
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
