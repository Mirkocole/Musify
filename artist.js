
/*//Artist Endpoint
const artistEndpoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
*/

//params
let activeParams = window.location.search;
let params = new URLSearchParams(activeParams);
const artistId = params.get('id');

const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

window.onload = artistResult();

async function artistResult () {
    // console.log(artistId)
    try {
        // let res = await fetch(`${artistEndpoint}${artistId}`);
        let res = await fetch(endpoint+artistId);
        let json = await res.json();
        // console.log(json)
        cycleResp(json.data);

        let rese = await fetch(endpoint+artistId);
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
        
    } catch (error) {
        console.log(error);
    }
}

function cycleResp(jsonData) {

    const songList = document.getElementById('songList');
    const imgLike = document.getElementById('imgLike');
    const songPlay = document.getElementById('songPlay');
    songPlay.style.listStyle = 'none';
    const songTime = document.getElementById('songTime');
    songTime.style.listStyle = 'none';

    jsonData.forEach(element => {
        createArtistTemplate(element);
    });
    
}

function createArtistTemplate({ artist, title, rank, duration}) {
    //artist background image
    let artistBox = document.getElementById('artistBox');
    artistBox.style.backgroundImage = `url(${artist.picture_medium})`;
    artistBox.style.height = '253px';
    artistBox.style.backgroundRepeat = 'no-repeat';
    artistBox.style.backgroundPosition = 'center center';

    //artist name
    let artistName = document.getElementById('artistName');
    artistName.innerText = artist.name;

    //songs table
    let songListItem = document.createElement('li');
    songListItem.classList.add('mb-3');
    
    let songImg = document.createElement('img');
    songImg.classList.add('songImg', 'mx-3');
    songImg.src = artist.picture_small;
    
    let songTitle = document.createElement('span');
    songTitle.classList.add('me-5');
    songTitle.innerText = title;

    songListItem.appendChild(songImg);
    songListItem.appendChild(songTitle);
    songList.appendChild(songListItem);
   
    //songs views
    let rankList = document.createElement('li');
    rankList.classList.add('marginList');
    rankList.innerText = rank;
    songPlay.appendChild(rankList);

    //songs time
    let songDur = document.createElement('li');
    songDur.classList.add('marginList');
    songDur.innerText = duration;
    songTime.appendChild(songDur);

    //songs like
    imgLike.src = artist.picture;

    let pBrani = document.getElementById('pBrani');
    pBrani.innerText ='Di ' + artist.name;
}




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