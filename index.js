// API DEEZER
const apiURL = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';

// Global
const allData = [];
const albums = document.getElementById('albums');
const artists = document.getElementById('artists');

// Default Artists
const defaultArtist = [
    'fedez',
    'queen',
    'eminem',
    'michael jackson',
    'stevie wonder',
    'beyonce',
    'pink floyd',
    'tony bennet',
    'brian mcknight',
    'celine dion',
    'whitney houston',
    'pat metheny',
    'frank sinatra',
    'steve vai',
    'bruno mars'
];

let time = 0;
let audio = new Audio();

let sec = 0;
let min = 0;
function resetPlayTime()
{
    sec = -1;
    min = 0;
}




window.onload = () => {

    let rand = Math.floor(Math.random() * messages.length);
     messages.forEach(data =>{
         let mex = document.createElement('p');
         mex.classList = ['text-light my-2'];
         mex.innerText=data;
         commentsNav.appendChild(mex);
     })

     setInterval(()=>{
         let rand = Math.floor(Math.random() * messages.length);
         let mex = document.createElement('p');
         mex.classList = ['text-light py-2'];
         mex.innerText=messages[rand];
         if (commentsNav.hasChildNodes) {
             commentsNav.insertBefore(mex,commentsNav.firstChild)
         } else {
             commentsNav.append(mex);
            
         }

     },3000);

     // music currentTime tracker
     setInterval(()=> {

        if(isPlaying){
            time = audio.currentTime;
            let tracker = document.getElementById("current-time");
    
            let playTime = audio.currentTime.toFixed(0);
            let min = 0;
           
           
            sec++;
            if(sec == 60) {
                sec = 0;
                min++;
            }
            tracker.innerHTML = min.toFixed(0) + " : " + sec.toFixed(0);
            console.log(playTime);
        }

    },1000);

    defaultArtist.forEach(data => {
        getMusic(data);
    });
}

let track = [];
let img = [];
let title = []; // bidimensional array that stores songs and album titles
let duration = [];


async function getMusic(artist = 'queen') {

    try {
        let res = await fetch(apiURL + artist);
        let json = await res.json();
        console.log(json.data[0])
        allData.push(json.data[0]);
        albums.innerHTML = '';
        artists.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            //    let max = allData.length;
            //    let random = Math.floor(Math.random()* max);

            createAlbums(allData[i]);

            // createArtists(allData[random]);
        }

        for (const artist of allData) {
            //     let max = allData.length;
            //    let random = Math.floor(Math.random()* max);
            createArtists(artist);
        }

        let rese = await fetch(apiURL+'queen');
        let jsone = await rese.json();
  
        let array = jsone.data;
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
        console.log(error)
    }
}


function createAlbums(data) {

    // Creazione Elementi DOM
    let col = document.createElement('div');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let span = document.createElement('span');

    // Stilizzazione elementi
    col.id = data.id;
    col.style.cursor = 'pointer';
    col.classList = ['col p-1'];
    div.classList = ['container overflow-hidden p-0 rounded  d-flex justify-content-start align-items-center bg-dark-grey'];
    img.classList = ['w-60 me-3'];
    span.classList = ['text-light'];

    // Valorizzazione elementi 
    img.src = data.album.cover;
    img.alt = data.album.title;
    span.innerText = data.album.title;

    // Actions
    col.addEventListener('click', () => {
        alert(`Hai cliccato sull'album ${data.album.title}`);
        window.location.href = `album.html?id=${data.album.id}`;
    })

    // Unione elementi
    div.append(img, span);
    col.appendChild(div);

    // Aggiungo al container
    albums.appendChild(col);

}


function createArtists(data) {
    /*
        <div class="col-12">
                    <div class="container-fluid p-0 ps-2 d-flex justify-content-start align-items-center">
                        <div class="card text-bg-dark flex-row flex-md-column  mb-3">
                            <div class="col-6 col-md-12">
                                <img src="https://kisskiss.it/wp-content/uploads/2022/10/fedez_salmo_viola_cover-jpg-scaled.jpg"
                                    class="card-img-top" alt="...">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card.</p>
                            </div>
                        </div>
                    </div>
        </div>
    */


    // Creazione Elementi DOM
    let col = document.createElement('div');
    let container = document.createElement('div');
    let card = document.createElement('div');
    let colImg = document.createElement('div');
    let img = document.createElement('img');
    let cardBody = document.createElement('div');
    let cardTitle = document.createElement('h5');
    let description = document.createElement('p');


    // Stilizzazione elementi
    col.classList = ['col-12'];
    container.classList = ['container-fluid p-0 ps-2 d-flex justify-content-start align-items-center'];
    card.classList = ['card text-bg-dark flex-row flex-md-column  mb-3 bg-white-transparent'];
    colImg.classList = ['col-6 col-md-12'];
    img.classList = ['card-img-top'];
    cardBody.classList = ['card-body'];
    cardTitle.classList = ['card-title'];
    description.classList = ['card-text text-grey description-card'];

    // Inserisco i dati
    console.log(data.artist.picture);
    img.src = data.artist.picture_big;;
    cardTitle.innerText = data.artist.name;
    description.innerHTML = data.album.title;

    // Actions
    col.addEventListener('click', () => {
        alert(`Hai cliccato sull'album ${data.artist.name}`);
        window.location.href = `artist.html?id=${data.artist.id}`;
    })

    // Collego i Nodi
    colImg.appendChild(img);
    cardBody.append(cardTitle, description);
    card.append(colImg, cardBody);
    container.appendChild(card);
    col.appendChild(container);


    artists.appendChild(col);



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
    console.log(randButton.style.color);
    if(randButton){
        randButton.style.color = bRandPlay === true ? "rgb(255, 255, 255)" : "rgb(116, 192, 252)";
    }
    
}

function setTotalTime()
{
    let trackLength = document.getElementById("total-time");
    console.log(duration[m]);
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
    console.log(songName);
    if(songName) {
        songName.innerHTML = title[m] +  title[m][m];
    }
}   