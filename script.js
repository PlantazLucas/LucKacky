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

                    <span class="current-map-name">
                        <span class="blue">Luc</span><span class="yellow">Kacky</span>
                        <span class="blue">#7</span>
                    </span>

                </div>


                <div class="time-left">

                    <span class="info-title">
                        TIME LEFT
                    </span>

                    <div class="flip-clock">
                        <span>0</span>
                        <span>8</span>
                        <b>:</b>
                        <span>4</span>
                        <span>2</span>
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
// DONNEES DES MAPS
// ========================================

const mapsData = {

    1: {
        name: "LucKacky #1",
        youtubeId: "xNQeFOY2xz4"
    },

    2: {
        name: "LucKacky #2",
        youtubeId: ""
    },

    3: {
        name: "LucKacky #3",
        youtubeId: ""
    },

    4: {
        name: "LucKacky #4",
        youtubeId: ""
    },

    5: {
        name: "LucKacky #5",
        youtubeId: ""
    },

    6: {
        name: "LucKacky #6",
        youtubeId: ""
    },

    7: {
        name: "LucKacky #7",
        youtubeId: ""
    },

    8: {
        name: "LucKacky #8",
        youtubeId: ""
    },

    9: {
        name: "LucKacky #9",
        youtubeId: ""
    },

    10: {
        name: "LucKacky #10",
        youtubeId: ""
    },

    11: {
        name: "LucKacky #11",
        youtubeId: ""
    },

    12: {
        name: "LucKacky #12",
        youtubeId: ""
    },

    13: {
        name: "LucKacky #13",
        youtubeId: ""
    },

    14: {
        name: "LucKacky #14",
        youtubeId: ""
    },

    15: {
        name: "LucKacky #15",
        youtubeId: ""
    },

    16: {
        name: "LucKacky #16",
        youtubeId: ""
    },

    17: {
        name: "LucKacky #17",
        youtubeId: ""
    },

    18: {
        name: "LucKacky #18",
        youtubeId: ""
    },

    19: {
        name: "LucKacky #19",
        youtubeId: ""
    },

    20: {
        name: "LucKacky #20",
        youtubeId: ""
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
    // FAUX LEADERBOARD
    // ========================================

    const fakeLeaderboard = [
        { player: "PlayerOne", time: "0:42.15" },
        { player: "RedoutableLucas", time: "0:43.28" },
        { player: "KackyPlayer", time: "0:44.02" },
        { player: "AnotherPlayer", time: "0:45.67" },
        { player: "LastFinisher", time: "0:51.34" }
    ];


    const leaderboardContainer =
        document.getElementById("map-leaderboard");


    fakeLeaderboard.forEach((entry, index) => {

        const row = document.createElement("div");

        row.className = "leaderboard-row";

        row.innerHTML = `
            <span class="leaderboard-rank">
                ${index + 1}
            </span>

            <span class="leaderboard-player">
                ${entry.player}
            </span>

            <span class="leaderboard-time">
                ${entry.time}
            </span>
        `;

        leaderboardContainer.appendChild(row);

    });

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