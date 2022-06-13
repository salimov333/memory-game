//Grab a couple of things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("#playerLivesCount");
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//Generate the data
const getData = () => [
    { imgSrc: "./images/adler-2386314__340.jpg", name: "adler-2386314__340" },
    { imgSrc: "./images/dolphin-203875__340.webp", name: "dolphin-203875__340" },
    { imgSrc: "./images/horses-2904536__340.webp", name: "horses-2904536__340" },
    { imgSrc: "./images/kingfisher-2046453__340.webp", name: "kingfisher-2046453__340" },
    { imgSrc: "./images/lion-3576045__340.jpg", name: "lion-3576045__340" },
    { imgSrc: "./images/owl-50267__340.jpg", name: "owl-50267__340" },
    { imgSrc: "./images/parrot-3601194__340.webp", name: "parrot-3601194__340" },
    { imgSrc: "./images/sea-2361247__340.jpg", name: "sea-2361247__340" },
    { imgSrc: "./images/adler-2386314__340.jpg", name: "adler-2386314__340" },
    { imgSrc: "./images/dolphin-203875__340.webp", name: "dolphin-203875__340" },
    { imgSrc: "./images/horses-2904536__340.webp", name: "horses-2904536__340" },
    { imgSrc: "./images/kingfisher-2046453__340.webp", name: "kingfisher-2046453__340" },
    { imgSrc: "./images/lion-3576045__340.jpg", name: "lion-3576045__340" },
    { imgSrc: "./images/owl-50267__340.jpg", name: "owl-50267__340" },
    { imgSrc: "./images/parrot-3601194__340.webp", name: "parrot-3601194__340" },
    { imgSrc: "./images/sea-2361247__340.jpg", name: "sea-2361247__340" }
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList.add("card");
        face.classList.add("face");
        back.classList.add("back");
        //Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute("name", item.name)
        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        card.addEventListener("click", (e) => {
            e.currentTarget.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};


//Check Cards Functon
const checkCards = (e) => {
    const clickedCard = e.currentTarget;
    //console.log(clickedCard);
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    //Logic
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            //console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });

        } else {
            //console.log("wrong");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => {
                    card.classList.remove("toggleCard");
                }, 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("👎 try again!");
            }
        }
    }
    //Run a check to see if we won the game
    if (toggleCard.length === 16) {
        restart("💪 you won");
    }
};

//Restart
const restart = (text) => {
    const cardData = randomize();
    const faces = document.querySelectorAll(".face");
    const cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => {
        window.alert(text);
    }, 100);
};

cardGenerator();