$(document).ready(function () {

    // Array containing paths to unique images
    const uniqueImages = [
        "./images/card_1.png", "./images/card_2.png", "./images/card_3.png",
        "./images/card_4.png", "./images/card_5.png", "./images/card_6.png",
        "./images/card_7.png", "./images/card_8.png", "./images/card_9.png",
        "./images/card_10.png", "./images/card_11.png", "./images/card_12.png",
        "./images/card_13.png", "./images/card_14.png", "./images/card_15.png",
        "./images/card_16.png", "./images/card_17.png", "./images/card_18.png",
        "./images/card_19.png", "./images/card_20.png", "./images/card_21.png",
        "./images/card_22.png", "./images/card_23.png", "./images/card_24.png"
    ];

    let selectedImages = [];

    // Initialize UI tabs
    function initUITabs() {
        $('#tabs').tabs();
    }

    // Preload images for smoother gameplay
    function preloadImages() {
        uniqueImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Prepare cards for the game
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
        });
    }

    // Display high score if available
    function displayHighScore() {
        let highScore = localStorage.getItem('highScore');
        let floatHighScore = parseFloat(highScore, 10)
        let floatHighScore2 = floatHighScore * 100;
        let formattedHighScore = `%${floatHighScore2}`;
        if (highScore) {
            $('#high_score').text(`High Score: %${floatHighScore2}`);
        }
    }

    // Calculate final score and update high score if necessary
    function calculateFinalScore() {
        let currentScore = correctClicks / amtClicks;
        let highScore = localStorage.getItem('highScore') ? parseFloat(localStorage.getItem('highScore')): 0;

        if (currentScore > highScore) {
            localStorage.setItem('highScore', currentScore.toString());
            console.log("New high score:", currentScore * 100);
            // Reset clicks for a new game session
            amtClicks = 0;
            correctClicks = 0;
        }
    }


    // Array to store flipped cards and tracking clicks
    let flippedCards = [];
    let amtClicks = 0;
    let correctClicks = 0;

    // Handle card click event
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

    // Match two flipped cards
    function matchCards() {
        if (flippedCards.length < 2) return;

        amtClicks++;

        const [firstCard, secondCard] = flippedCards;

        const firstCardID = firstCard.attr('id');
        const secondCardID = secondCard.attr('id');

        if (firstCardID === secondCardID) {
            correctClicks++;

            setTimeout(() => {
                firstCard.add(secondCard).addClass('matched').each(function () {
                    $(this).slideUp(500);
                });
                checkGameEnd();
            }, 500);
        } else {
            setTimeout(() => {
                firstCard.add(secondCard).find('img').fadeOut(500, function () {
                    $(this).attr('src', './images/back.png').fadeIn(500);
                });
            }, 2000);
        }

        flippedCards = [];
    }

    // Check if the game has ended
    function checkGameEnd() {
        const totalCards = $('#cards a').length;
        const matchedCards = $('#cards a.matched').length;

        if (matchedCards === totalCards) {
            calculateFinalScore();
            displayHighScore();
            alert("Congratulations! You've completed the game.");
        }
    }

    // Shuffle array
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    // Retrieve player name from session storage
    function GetFromSessionStorage() {
        var storedPlayerName = sessionStorage.getItem('playerName');
        if (storedPlayerName) {
            $('#player').text(`Player Name: ${storedPlayerName}`);
        }
    }

    // Add player name to session storage
    function addToSessionStorage() {
        let playerName = $('#player_name').val();
        if (!playerName) {
            alert('Please enter your name!');
        } else {
            $('#player').text(`Player Name: ${playerName}`);
            sessionStorage.setItem('playerName', playerName);
        }
    }

    // Adjust number of rows based on selected number of cards
    function adjustRows(requiredRows) {
        for (let i = 1; i <= 6; i++) {
            $('#row' + i).toggle(i <= requiredRows);
        }
    }

    // Update rows based on selected number of cards
    function updateRows() {
        let selectedNumberOfCards = parseInt($('#num_cards').val(), 10);
        let rowsMap = new Map([
            [8, 1], [16, 2], [24, 3], [32, 4], [40, 5], [48, 6]
        ]);
        let requiredRows = rowsMap.get(selectedNumberOfCards);
        adjustRows(requiredRows);
    }

    // Event handler for saving settings
    $('#save_settings').click(function () {
        prepareCards();
        addToSessionStorage();
        updateRows();
    });

    // Event handler for card clicks
    $('#cards').on('click', 'a', handleCardClick);

    // Initial setup
    preloadImages();
    initUITabs();
    GetFromSessionStorage();
    displayHighScore();
    prepareCards(); // Call updateRows to adjust the UI based on the default or previously saved settings
});

