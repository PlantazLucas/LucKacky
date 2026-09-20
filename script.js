// ========================================
// FILTRES DES MAPS
// ========================================

const filterButtons = document.querySelectorAll(".filter-button");
const mapCards = document.querySelectorAll(".map-card");


// Fonction qui applique un filtre
function applyMapFilter(filter) {

    // Met à jour le bouton sélectionné
    filterButtons.forEach(button => {

        if (button.dataset.filter === filter) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }

    });


    // Affiche ou masque les maps
    mapCards.forEach(card => {

        if (filter === "all" || card.dataset.version === filter) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

}


// Quand on clique sur un filtre
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        // Enregistre le choix
        localStorage.setItem("luckackyMapFilter", filter);

        // Applique le filtre
        applyMapFilter(filter);

    });

});


// ========================================
// RESTAURE LE DERNIER FILTRE CHOISI
// ========================================

if (filterButtons.length > 0) {

    const savedFilter =
        localStorage.getItem("luckackyMapFilter") || "all";

    applyMapFilter(savedFilter);

}

// ========================================
// BANDEAU COMMUN DU SITE
// ========================================

const siteHeader = document.getElementById("site-header");

if (siteHeader) {
    siteHeader.innerHTML = `
        <div class="header-top">

            <!-- Bouton Maps -->
            <a href="index.html"
               class="round-nav-button maps-button"
               aria-label="Maps">

                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 5.1 9 3 3 5.1v15.8l6-2.1 6 2.1 6-2.1V3l-6 2.1zm0 2.1 4-1.4v11.6l-4 1.4V7.2zm-2 11.6-4-1.4V5.2l4 1.4v12.2zM5 6.6l2-.7v11.5l-2 .7V6.6z"/>
                </svg>

            </a>


            <!-- Informations centrales -->
            <div class="current-info">

                <div class="current-map">

                    <span class="info-title">
                        CURRENT MAP
                    </span>

                    <span class="current-map-name" id="current-map-name">
                        <span class="blue">Luc</span><span class="yellow">Kacky</span>
                        <span class="blue" id="current-map-number">#--</span>
                    </span>

                </div>


                <div class="time-left">

                    <span class="info-title">
                        TIME LEFT
                    </span>

                    <div class="flip-clock">
                        <span id="timer-m1">0</span>
                        <span id="timer-m2">0</span>
                        <b>:</b>
                        <span id="timer-s1">0</span>
                        <span id="timer-s2">0</span>
                    </div>

                </div>

            </div>


            <!-- Bouton Leaderboard -->
            <a href="leaderboard.html"
               class="round-nav-button leaderboard-button"
               aria-label="Leaderboard">

                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16 4h-1.2A3 3 0 0 0 12 2a3 3 0 0 0-2.8 2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 16H8V6h1v2h6V6h1v14zm-6-8h4v2h-4v-2zm0 4h4v2h-4v-2z"/>
                </svg>

            </a>

        </div>
    `;
}

// ========================================
// MAP EN COURS
// ========================================

let currentMapNumber = null;
let waitingForNewMapTimer = false;
let previousMapTimer = null;

function updateCurrentMap() {

    fetch("https://luckacky-api.plantaz-perso.workers.dev/current-map")
        .then(response => response.json())
        .then(data => {

            const mapNumber = document.getElementById("current-map-number");

            if (!mapNumber || !data.number) {
                return;
            }

            // Première récupération au chargement du site
            if (currentMapNumber === null) {
                currentMapNumber = data.number;
            }

            // Une nouvelle map vient d'être détectée
            else if (data.number !== currentMapNumber) {

    // Mémorise le temps restant de l'ancienne map
    previousMapTimer = lastServerTimerSeconds;

    currentMapNumber = data.number;
    waitingForNewMapTimer = true;

    document.getElementById("timer-m1").textContent = "?";
    document.getElementById("timer-m2").textContent = "?";
    document.getElementById("timer-s1").textContent = "?";
    document.getElementById("timer-s2").textContent = "?";
}



            mapNumber.textContent = "#" + data.number;

        })
        .catch(error => {
            console.error("Unable to load current map:", error);
        });
}


// Charge immédiatement la map
updateCurrentMap();


// Puis vérifie toutes les 10 secondes
setInterval(updateCurrentMap, 1000);

// ========================================
// DONNEES DES MAPS
// ========================================

const mapsData = {

    1: {
        name: "LucKacky #1",
        youtubeId: "xNQeFOY2xz4"
    },

    2: {
        name: "LucKacky #2",
        youtubeId: "9vMGflQ1YPE"
    },

    3: {
        name: "LucKacky #3",
        youtubeId: "uvtdJ_5zO2k"
    },

    4: {
        name: "LucKacky #4",
        youtubeId: "t9_zdLl0oCk"
    },

    5: {
        name: "LucKacky #5",
        youtubeId: "Kx2kqJpbBSU"
    },

    6: {
        name: "LucKacky #6",
        youtubeId: "1IGf7dg2cB4"
    },

    7: {
        name: "LucKacky #7",
        youtubeId: "XEPBm5migtM"
    },

    8: {
        name: "LucKacky #8",
        youtubeId: "kHEtYPFAFmU"
    },

    9: {
        name: "LucKacky #9",
        youtubeId: "WShy5hu8jjk"
    },

    10: {
        name: "LucKacky #10",
        youtubeId: "odhi8K7Dhug"
    },

    11: {
        name: "LucKacky #11",
        youtubeId: "rceS2R6Xelg"
    },

    12: {
        name: "LucKacky #12",
        youtubeId: "Ycy8GGO8k20"
    },

    13: {
        name: "LucKacky #13",
        youtubeId: "mSoCVXGNCSo"
    },

    14: {
        name: "LucKacky #14",
        youtubeId: "3dlysiR9WT8"
    },

    15: {
        name: "LucKacky #15",
        youtubeId: "lroAQVuAw5A"
    },

    16: {
        name: "LucKacky #16",
        youtubeId: "AbpHy-kP65Q"
    },

    17: {
        name: "LucKacky #17",
        youtubeId: "AWY7wOH-fJM"
    },

    18: {
        name: "LucKacky #18",
        youtubeId: "Edb2YmHimVo"
    },

    19: {
        name: "LucKacky #19",
        youtubeId: "485waP9WFME"
    },

    20: {
        name: "LucKacky #20",
        youtubeId: "6JBPGwq8z1A"
    }

};

// ========================================
// PAGE D'UNE MAP
// ========================================

const mapTitle = document.getElementById("map-title");

if (mapTitle) {

    // Récupère le numéro de la map dans l'URL
    // Exemple : map.html?id=7
    const params = new URLSearchParams(window.location.search);
    const mapId = params.get("id");
    const mapData = mapsData[mapId];

    // Affiche le titre
    mapTitle.innerHTML = `
        <span class="blue">Luc</span><span class="yellow">Kacky</span>
        <span class="blue">#${mapId}</span>
    `;

    // ========================================
    // VIDEO GPS
    // ========================================

    const gpsContainer = document.getElementById("gps-container");

    if (mapData && mapData.youtubeId) {

        gpsContainer.innerHTML = `
            <iframe
                src="https://www.youtube.com/embed/${mapData.youtubeId}"
                title="GPS ${mapData.name}"
                allowfullscreen>
            </iframe>
        `;

    } else {

        gpsContainer.innerHTML = `
            <div class="no-gps">
                GPS not available
            </div>
        `;

    }

// ========================================
// LEADERBOARD REEL DE LA MAP
// ========================================

let mapLeaderboard = [];

const leaderboardContainer =
    document.getElementById("map-leaderboard");

const paginationContainer =
    document.getElementById("leaderboard-pagination");

const playersPerPage = 15;

let currentPage = 1;


// ========================================
// FORMATAGE DU TEMPS
// ========================================

function formatMapTime(timeMs) {

    const totalCentiseconds = Math.floor(timeMs / 10);

    const minutes =
        Math.floor(totalCentiseconds / 6000);

    const seconds =
        Math.floor((totalCentiseconds % 6000) / 100);

    const centiseconds =
        totalCentiseconds % 100;

    return (
        minutes +
        ":" +
        String(seconds).padStart(2, "0") +
        "." +
        String(centiseconds).padStart(2, "0")
    );
}


// ========================================
// AFFICHAGE DU LEADERBOARD
// ========================================

function displayLeaderboardPage(page) {

    const totalPages =
        Math.max(
            1,
            Math.ceil(mapLeaderboard.length / playersPerPage)
        );

    page = Math.max(1, Math.min(page, totalPages));

    currentPage = page;

    leaderboardContainer.innerHTML = "";


    // Header

    const leaderboardHeader =
        document.createElement("div");

    leaderboardHeader.className = "leaderboard-header";

    leaderboardHeader.innerHTML = `
        <span>#</span>
        <span>PLAYER</span>
        <span>TIME</span>
    `;

    leaderboardContainer.appendChild(leaderboardHeader);


    // Joueurs de cette page

    const start =
        (currentPage - 1) * playersPerPage;

    const end =
        start + playersPerPage;

    const players =
        mapLeaderboard.slice(start, end);


    players.forEach(entry => {

        const row =
            document.createElement("div");

        row.className = "leaderboard-row";


        const rank =
            document.createElement("span");

        rank.className = "leaderboard-rank";
        rank.textContent = entry.rank;


        const player =
            document.createElement("span");

        player.className = "leaderboard-player";
        player.textContent = entry.nick;


        const time =
            document.createElement("span");

        time.className = "leaderboard-time";
        time.textContent =
            formatMapTime(entry.time);


        row.appendChild(rank);
        row.appendChild(player);
        row.appendChild(time);

        leaderboardContainer.appendChild(row);

    });


    displayPagination();
}


// ========================================
// PAGINATION
// ========================================

function displayPagination() {

    paginationContainer.innerHTML = "";

    const totalPages =
        Math.ceil(mapLeaderboard.length / playersPerPage);


    if (totalPages <= 1) {
        return;
    }


    createPageButton(
        "«",
        1,
        currentPage === 1
    );

    createPageButton(
        "‹",
        currentPage - 1,
        currentPage === 1
    );


    let startPage =
        Math.max(1, currentPage - 2);

    let endPage =
        Math.min(
            totalPages,
            startPage + 4
        );

    startPage =
        Math.max(
            1,
            endPage - 4
        );


    for (
        let page = startPage;
        page <= endPage;
        page++
    ) {

        createPageButton(
            page,
            page,
            false,
            page === currentPage
        );

    }


    createPageButton(
        "›",
        currentPage + 1,
        currentPage === totalPages
    );

    createPageButton(
        "»",
        totalPages,
        currentPage === totalPages
    );
}


// ========================================
// CREATION D'UN BOUTON
// ========================================

function createPageButton(
    text,
    page,
    disabled = false,
    active = false
) {

    const button =
        document.createElement("button");

    button.textContent = text;

    button.className = "pagination-button";


    if (active) {
        button.classList.add("active");
    }


    if (disabled) {
        button.disabled = true;
    }


    button.addEventListener("click", () => {

        displayLeaderboardPage(page);

    });


    paginationContainer.appendChild(button);
}


// ========================================
// RECUPERATION DU LEADERBOARD CLOUDFLARE
// ========================================

function updateMapLeaderboard() {

    fetch(
        `https://luckacky-api.plantaz-perso.workers.dev/map-leaderboard/${mapId}`
    )
        .then(response => response.json())
        .then(data => {

            if (!Array.isArray(data.records)) {
                return;
            }

            mapLeaderboard = data.records;

            // Garde la page actuellement affichée
            displayLeaderboardPage(currentPage);

        })
        .catch(error => {

            console.error(
                "Unable to load map leaderboard:",
                error
            );

        });
}


// Charge immédiatement le leaderboard
updateMapLeaderboard();


// Puis vérifie les nouvelles données toutes les 10 secondes
setInterval(updateMapLeaderboard, 10000);

}


// ========================================
// OUVERTURE DES PAGES DE MAPS
// ========================================

mapCards.forEach((card, index) => {

    card.addEventListener("click", () => {

        const mapId = index + 1;

        window.location.href = `map.html?id=${mapId}`;

    });

});

// ========================================
// LEADERBOARD GENERAL
// ========================================

const globalLeaderboardContainer =
    document.getElementById("global-leaderboard");

const globalPaginationContainer =
    document.getElementById("global-leaderboard-pagination");


if (globalLeaderboardContainer) {

// ========================================
// DONNEES REELLES XAseco
// ========================================

let globalLeaderboard = [];


    const playersPerPage = 25;

    let currentGlobalPage = 1;


    // ========================================
    // AFFICHAGE D'UNE PAGE
    // ========================================

    function displayGlobalLeaderboardPage(page) {

        const totalPages =
            Math.ceil(globalLeaderboard.length / playersPerPage);

        page = Math.max(1, Math.min(page, totalPages));

        currentGlobalPage = page;

        globalLeaderboardContainer.innerHTML = "";


        // Header
        const header = document.createElement("div");

        header.className = "global-leaderboard-header";

        header.innerHTML = `
            <span>#</span>
            <span>PLAYER</span>
            <span>FINISHES</span>
            <span>AVERAGE</span>
        `;

        globalLeaderboardContainer.appendChild(header);


        // Joueurs
        const start =
            (currentGlobalPage - 1) * playersPerPage;

        const end =
            start + playersPerPage;

        const players =
            globalLeaderboard.slice(start, end);


        players.forEach((entry, index) => {

            const rank = start + index + 1;

            const row = document.createElement("div");

            row.className = "global-leaderboard-row";

            row.innerHTML = `
                <span class="global-rank">
                    ${rank}
                </span>

                <span class="global-player">
                    ${entry.nick}
                </span>

                <span class="global-finishes">
                    ${entry.maps}
                </span>

                <span class="global-average">
                    ${entry.average}
                </span>
            `;

            globalLeaderboardContainer.appendChild(row);

        });


        displayGlobalPagination();

    }


    // ========================================
    // PAGINATION
    // ========================================

    function displayGlobalPagination() {

        globalPaginationContainer.innerHTML = "";

        const totalPages =
            Math.ceil(globalLeaderboard.length / playersPerPage);


        if (totalPages <= 1) {
            return;
        }


        createGlobalPageButton(
            "«",
            1,
            currentGlobalPage === 1
        );

        createGlobalPageButton(
            "‹",
            currentGlobalPage - 1,
            currentGlobalPage === 1
        );


        let startPage =
            Math.max(1, currentGlobalPage - 2);

        let endPage =
            Math.min(totalPages, startPage + 4);

        startPage =
            Math.max(1, endPage - 4);


        for (
            let page = startPage;
            page <= endPage;
            page++
        ) {

            createGlobalPageButton(
                page,
                page,
                false,
                page === currentGlobalPage
            );

        }


        createGlobalPageButton(
            "›",
            currentGlobalPage + 1,
            currentGlobalPage === totalPages
        );

        createGlobalPageButton(
            "»",
            totalPages,
            currentGlobalPage === totalPages
        );

    }


    function createGlobalPageButton(
        text,
        page,
        disabled = false,
        active = false
    ) {

        const button =
            document.createElement("button");

        button.textContent = text;
        button.className = "pagination-button";


        if (active) {
            button.classList.add("active");
        }


        if (disabled) {
            button.disabled = true;
        }


        button.addEventListener("click", () => {

            displayGlobalLeaderboardPage(page);

        });


        globalPaginationContainer.appendChild(button);

    }


// ========================================
// RECUPERATION DU LEADERBOARD XAseco
// ========================================

function updateGlobalLeaderboard() {

    fetch("https://luckacky-api.plantaz-perso.workers.dev/leaderboard")
        .then(response => response.json())
        .then(data => {

            globalLeaderboard = data.map(entry => ({
                nick: entry.nick,
                maps: entry.maps,
                average: Number(entry.avg).toFixed(2)
            }));

            // Garde la page actuellement affichée
            displayGlobalLeaderboardPage(currentGlobalPage);

        })
        .catch(error => {
            console.error("Unable to load leaderboard:", error);
        });
}


// Charge immédiatement le leaderboard
updateGlobalLeaderboard();


// Puis vérifie les nouvelles données toutes les 10 secondes
setInterval(updateGlobalLeaderboard, 10000);

}

// ========================================
// TIMER EN DIRECT
// ========================================

let timerSeconds = 0;
let timerLoaded = false;
let lastServerTimerSeconds = null;

function displayTimer() {

    if (waitingForNewMapTimer) {
        return;
    }

    const secondsLeft = Math.max(0, Math.floor(timerSeconds));

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    const m1 = document.getElementById("timer-m1");
    const m2 = document.getElementById("timer-m2");
    const s1 = document.getElementById("timer-s1");
    const s2 = document.getElementById("timer-s2");

    if (!m1 || !m2 || !s1 || !s2) {
        return;
    }

    m1.textContent = formattedMinutes[0];
    m2.textContent = formattedMinutes[1];
    s1.textContent = formattedSeconds[0];
    s2.textContent = formattedSeconds[1];
}

function updateTimer() {

    fetch("https://luckacky-api.plantaz-perso.workers.dev/timer")
        .then(response => response.json())
        .then(data => {

            if (
                typeof data.seconds !== "number" ||
                typeof data.updatedAt !== "number"
            ) {
                return;
            }

            // Si une nouvelle map vient de commencer,
            // on ignore l'ancien timer jusqu'à recevoir
            // une valeur supérieure à 2 minutes.
            if (waitingForNewMapTimer) {

    // Tant que le timer reçu n'est pas STRICTEMENT supérieur
    // à la dernière valeur serveur de l'ancienne map,
    // on reste sur ??:??
    if (
        previousMapTimer !== null &&
        data.seconds <= previousMapTimer
    ) {
        return;
    }

    // Le timer est strictement supérieur :
    // c'est celui de la nouvelle map.
    waitingForNewMapTimer = false;
    previousMapTimer = null;
}

// Mémorise la dernière valeur brute reçue de Cloudflare
lastServerTimerSeconds = data.seconds;


            // Calcule l'âge de la donnée reçue
            const elapsedSeconds = Math.max(
                0,
                Math.floor((Date.now() - data.updatedAt) / 1000)
            );

            // Reconstitue le timer actuel
            timerSeconds = Math.max(
                0,
                data.seconds - elapsedSeconds
            );

            timerLoaded = true;
            displayTimer();

        })
        .catch(error => {
            console.error("Unable to load timer:", error);
        });
}

// Récupère immédiatement le timer du serveur
updateTimer();

// Resynchronisation avec le serveur toutes les 10 secondes
setInterval(updateTimer, 2000);

// Entre deux synchronisations, le site fait descendre
// lui-même le timer chaque seconde
setInterval(() => {

    if (!timerLoaded) {
        return;
    }

    if (timerSeconds > 0) {
        timerSeconds--;
    }

    displayTimer();

}, 1000);