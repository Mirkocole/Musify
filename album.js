/* costanti */
const albumApi = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

/* elementi del dom */
const albTabBody = document.getElementById('album-tab-body');
const albMainCover = document.getElementById(`main-cover-img`);
const albYearTag = document.getElementsByClassName('album-year'); // è un array di più elementi
const mainAlbumTitle = document.getElementById(`main-album-title`);
const mainArtistName = document.getElementById(`main-artist-name`);
const artistAvatar = document.querySelector(`img.placeholderavatar`);
const numTracks = document.querySelector(`span.tracks-number`);
const playTime = document.querySelector(`span.play-time`);
/* console.log(albTabBody);
console.log(albYearTag);
console.log(mainAlbumTitle);
console.log(mainArtistName);
console.log(artistAvatar);
console.log(numTracks);
console.log(playTime); */

/* lancio la funzione per caricare il tutto */
getAlbumData();

/* fetch per l'acquisizione dei dati */
async function getAlbumData() {
    try {
        const res = await fetch(albumApi);
        const albumData = await res.json();
        console.log(albumData);
        loadAlbumData(albumData);

    } catch(err) {
        alert(err);
    }
};

function loadAlbumData(albumData) {
    mainAlbumTitle.innerText = albumData.title;
    mainArtistName.innerText = albumData.artist.name;
    albMainCover.src = albumData.cover_big;
    artistAvatar.src = albumData.artist.picture;
    numTracks.innerText = albumData.nb_tracks;
    playTime.innerText = formatTime1(albumData.duration);

    Array.from(albYearTag).forEach((yeartag) => {
        yeartag.innerText = (new Date(albumData.release_date)).getFullYear();
    });        

    const tracks = albumData.tracks.data;
    console.log(tracks);
    albTabBody.innerHTML = "";
    tracks.forEach((track, index) => {
        creaTabRow(track, index + 1);
    });
}

function creaTabRow({title, artist, duration, rank, index}, tracknumber) {
    // console.log(`titolo: ${title} artista: ${artist.name} durata: ${duration} riproduzioni: ${rank}`);

    let tabRow = document.createElement("tr");

    let tabNum = document.createElement("th");
    tabNum.classList.add("bg-transparent", "clr-darkgrey", "align-middle");
    tabNum.setAttribute("scope", "row");
    tabNum.innerText = tracknumber;

    let songWrapper = document.createElement("td");    
    songWrapper.classList.add("bg-transparent", "align-middle");

    let songTitle = document.createElement("h5");
    songTitle.classList.add("mb-0");
    songTitle.innerText = title;

    let songArtist = document.createElement("p");
    songArtist.classList.add("clr-darkgrey", "mb-0");
    songArtist.innerText = artist.name;

    let songRank = document.createElement("td");
    songRank.classList.add("bg-transparent", "clr-darkgrey", "align-middle");
    songRank.innerText = rank;

    let songTime = document.createElement("td");
    songTime.classList.add("bg-transparent", "clr-darkgrey", "align-middle");
    songTime.innerText = formatTime2(duration);

    songWrapper.appendChild(songTitle);
    songWrapper.appendChild(songArtist);
    tabRow.appendChild(tabNum);
    tabRow.appendChild(songWrapper);
    tabRow.appendChild(songRank);
    tabRow.appendChild(songTime);

    albTabBody.appendChild(tabRow);
};

function formatTime1(seconds) {
    const min = Math.floor(seconds / 60);
    const remSec = (seconds % 60);
    return `${min} min ${remSec} sec.`;
};

function formatTime2(seconds) {
    const min = Math.floor(seconds / 60);
    const remSec = (seconds % 60);
    return `${min}:${remSec}`;
};
