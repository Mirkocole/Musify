
/* con id statico */
// const albumApi = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

/* con query */
const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
 const albumApi = "https://striveschool-api.herokuapp.com/api/deezer/album/";
 const params = new URLSearchParams(window.location.search);
 const id = params.get("id");
 const artistMusic = params.get('artist');


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
        /* con id statico */
        // const res = await fetch(albumApi);
        /* con query */
        
        const res = await fetch(`${albumApi}${id}`);

        const albumData = await res.json();
        console.log(albumData);
        loadAlbumData(albumData);

        
        let rese = await fetch(`${endpoint}${artistMusic}`);
        let jsone = await rese.json();
  
        let array = jsone.data;
        // console.log(array.data)
        let c = 0;
        for(bgm of array){

            console.log(bgm);
            track[c] = bgm.preview;

            img[c] = bgm.album.cover_small;
            title[c] = bgm.title + "\n";
            title[c][c] = bgm.album.title;

            // calc duration

            duration[c] = bgm.duration;
            c++;
        }

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
    tabNum.classList.add("bg-transparent", "clr-darkgrey", "align-middle", "d-none", "d-sm-table-cell");
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
    songRank.classList.add("bg-transparent", "clr-darkgrey", "align-middle", "d-none", "d-sm-table-cell");
    songRank.innerText = rank;

    let songTime = document.createElement("td");
    songTime.classList.add("bg-transparent", "clr-darkgrey", "align-middle", "d-none", "d-sm-table-cell");
    songTime.innerText = formatTime2(duration);

    let songOpts = document.createElement("td");
    songOpts.classList.add("bg-transparent", "clr-darkgrey", "align-middle", "d-table-cell", "d-sm-none");
    let songOptsBtn = document.createElement("ion-icon");
    songOptsBtn.setAttribute("name", "ellipsis-vertical-outline");

    songWrapper.appendChild(songTitle);
    songWrapper.appendChild(songArtist);
    songOpts.appendChild(songOptsBtn);
    tabRow.appendChild(tabNum);
    tabRow.appendChild(songWrapper);
    tabRow.appendChild(songRank);
    tabRow.appendChild(songTime);
    tabRow.appendChild(songOpts);

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


// Codice Player Music
let track = [];
let img = [];
let title = []; // bidimensional array that stores songs and album titles
let duration = [];
let time = 0;
let audio = new Audio();

let sec = 0;
let min = 0;
function resetPlayTime()
{
    sec = -1;
    min = 0;
}

let isPlaying = false;

let m = 0;
let bRandPlay = false;
let randTrack = 0;

let volBar = document.querySelector("#myRange");
let bMute = false;
let prevVol = 0;
let vol = volBar.value / 100;

function swapClass(element, class1,class2)
{
    if(!element.classList.contains(class1) && !element.classList.contains(class2))
        return;

    if(element.classList.contains(class1)){
        element.classList.remove(class1);
        element.classList.add(class2);
    }
    else {
        element.classList.remove(class2);
        element.classList.add(class1);
    }
}

// function called by the volume icon  on clic. Shifts between volume and mute icons
function morphVolIcon()
{  
    let icon = document.getElementById("volume-icon");

    if(icon){     
        swapClass(icon,"fa-volume-up","fa-volume-mute");
    }
}

// function called by the microphone icon on click. Shifts between microphone and muted microphone icons
function morphMicIcon()
{  
    let icon = document.getElementById("mic-icon");
    if(icon){     
        swapClass(icon,"fa-microphone","fa-microphone-slash");
    }
}

// function called by the play icon on click. Shifts between play and pause icons
function morphPlayIcon()
{  
    let icon = document.getElementById("play-icon");
    if(icon){     
        swapClass(icon,"fa-play-circle","fa-pause");
    }
}

// event listener to change volume by moving the volume slider
volBar.addEventListener("change", function(e) {
    vol = e.target.value / 100;
    audio.volume = vol;
    if(vol > prevVol)
        bMute = false;
})


function toggleMute(event)
{
    let id = event.target.id;
    
    bMute = !bMute;
    morphVolIcon();
    if(bMute){
        prevVol = vol;
        audio.pause();
    }
}

function toggleRand()
{
    bRandPlay = bRandPlay == true ? false : true;
    let randButton = document.getElementById("rand-icon");
    // console.log(randButton.style.color);
    if(randButton){
        randButton.style.color = bRandPlay === true ? "rgb(255, 255, 255)" : "rgb(116, 192, 252)";
    }
    
}

function setTotalTime()
{
    let trackLength = document.getElementById("total-time");
    // console.log(duration[m]);
    trackLength.innerHTML = duration[m];
}

// function called by the 'next track' icon on click.
function modAdd()
{
    time = 0;
    if(bRandPlay) {
        randTrack = Math.floor(Math.random() * track.length + 1);
        m = randTrack;
        audio.currentTime = 0;
        isPlaying = false;
        resetPlayTime();
        playMusic();
        return;
    }

    m++;
    if(m > track.length)
        m = 0;

    if(isPlaying){
        audio.currentTime = 0;
        isPlaying = false;
        resetPlayTime();
        playMusic();
    }
}

// function called by the 'previous track' icon on click.
function modSub()
{
    if(audio.currentTime > 5){
        time = 0;
        isPlaying = false;
        audio.currentTime = 0;
        resetPlayTime();
        playMusic();
        return;
    }
    
    time = 0;
    if(bRandPlay){
        randTrack = Math.floor(Math.random() * track.length +1);
        m = randTrack;
        if(isPlaying){
            isPlaying = false;
            audio.currentTime = 0;
            resetPlayTime();
            playMusic();
        }
        return;
    }

    m--
    if(m < 0)
        m = 0;
    if(isPlaying){
        isPlaying = false;
        audio.currentTime = 0;
        resetPlayTime();
        playMusic();
    }
       
}

// function called by the 'play track' icon on click.
function playMusic()
{
    setImg();
    if(bMute && vol == prevVol){
        time = audio.currentTime;
        return audio.pause();
    }
      
    if(isPlaying){
        isPlaying = false;
        time = audio.currentTime;
        return audio.pause();
    }

    if(track.length <= 0)
        return;
  
    audio.src = track[m];
    audio.currentTime = time;

    audio.play();
    setTotalTime();
    let totalTracker = document.getElementById("current-time");
    totalTracker.value = track[m].duration;

    isPlaying = true; 
    time = 0;
    
}

// change the artist and song info
function setImg()
{
    let cover = document.getElementById("artist-img");
    if(cover){
        cover.src = img[m];
    }

    let songName = document.getElementById("song-title");
    // console.log(songName);
    if(songName) {
        songName.innerHTML = title[m] +  title[m][m];
    }
}   