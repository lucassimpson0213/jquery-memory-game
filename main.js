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

    function handleCardClick() {
        
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

    $('#cards').on('click', 'a', function () {
        event.preventDefault(); // Prevent the default anchor action
        // Your logic here
        console.log('Card clicked:', this.id); // Example action
    });

    preloadImages();
    initUITabs();
    GetFromSessionStorage();
    prepareCards();// Call updateRows to adjust the UI based on the default or previously saved settings
});
