// Live Comments
const messages = [
    "early stage emely syndrome (sett-ott 2022)",
    "Be The Young",
    '"..." cit. Kimiko (lug-ago 2022)',
    "saggio vibes",
    "main character energy (mag-giu 2022)",
    "that fucking mood",
    "VEE, CARLOTTA E GIACOMO VANNO A BOSIO",
    "An Emily Winchester kind of mood",
    "landing page (mar-apr 2022)",
    "2021 lol",
    "cosa cazzo vuol dire questa affermazione (gen-feb 2022)",
    "honey and glass (nov-dic 2021)",
    "(Revenge) Training Arc",
    "Lidia <3 Emily" ,
    "minecraft e nintendo switch (sep-oct 2021)",
    "silvano d'orba? I hardly know her (lug - ago 2021)",
    "Culo 2021",
    "Frah Quintale Mix" ,
    "Francesco Guccini Mix"  
]

const commentsNav = document.getElementById('commentsNav');


let time = 0;
let audio = new Audio();

let sec = 0;
let min = 0;
function resetPlayTime()
{
    sec = -1;
    min = 0;
}

window.onload = ()=>{

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

    getMusic();

}

let track = [];
let img = [];
let title = []; // bidimensional array that stores songs and album titles
let duration = [];

async function getMusic(){

    try {
        let res = await fetch(apiURL+'queen');
        let json = await res.json();
  
        let array = json.data;
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