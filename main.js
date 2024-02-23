$(document).ready(function () {

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
        });
    }

    function displayHighScore() {
        let highScore = localStorage.getItem('highScore');
        let floatHighScore = parseFloat(highScore, 4)
        let floatHighScore2 = floatHighScore * 100;
        let formattedHighScore = `${floatHighScore2}%`;
        if (highScore) {
            $('#high_score').text(`high score: ${floatHighScore2}%`);
        }
    }

    function calculateFinalScore() {
        let currentScore = correctClicks / amtClicks;
        let highScore = localStorage.getItem('highScore') ? parseFloat(localStorage.getItem('highScore')): 0;

        if (currentScore > highScore) {
            localStorage.setItem('highScore', (currentScore.toFixed(2)).toString());
            console.log("New high score:", currentScore * 100);
            $('#correct').text(`correct: ${currentScore * 100}%`)
            amtClicks = 0;
            correctClicks = 0;
        }
        else {

        }
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
            setTimeout(matchCards, 1000); 
        }
    }

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
            }, 500);
        }

        flippedCards = [];
    }

    function checkGameEnd() {
        const totalCards = $('#cards a').length;
        const matchedCards = $('#cards a.matched').length;

        if (matchedCards === totalCards) {
            calculateFinalScore();
            displayHighScore();
            alert("Congratulations! You've completed the game.");
        }
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
        let selectedNumberOfCards = parseInt($('#num_cards').val(), 4);
        let rowsMap = new Map([
            [8, 1], [16, 2], [24, 3], [32, 4], [40, 5], [48, 6]
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
    displayHighScore();
    prepareCards(); // Call updateRows to adjust the UI based on the default or previously saved settings
});

