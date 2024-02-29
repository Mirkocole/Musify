// API DEEZER
const apiURL = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';

// Default Artists
const defaultArtist = ['queen','eminem','michael jackson'];

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



window.onload = ()=>{

    // let rand = Math.floor(Math.random() * messages.length);
    // messages.forEach(data =>{
    //     let mex = document.createElement('p');
    //     mex.classList = ['text-light my-2'];
    //     mex.innerText=data;
    //     commentsNav.appendChild(mex);
    // })

    // setInterval(()=>{
    //     let rand = Math.floor(Math.random() * messages.length);
    //     console.log(messages[rand]);
    //     let mex = document.createElement('p');
    //     mex.classList = ['text-light py-2'];
    //     mex.innerText=messages[rand];
    //     if (commentsNav.hasChildNodes) {
    //         commentsNav.insertBefore(mex,commentsNav.firstChild)
    //     } else {
    //         commentsNav.append(mex);
            
    //     }

    // },1000);

    getMusic()

}

let track = [];

async function getMusic(){

    try {
        let res = await fetch(apiURL+'queen');
        let json = await res.json();
      //  console.log(json);
        console.log(json.data);

        let array = json.data;
        let c = 0;
        for(bgm of array){
            track[c] = bgm.preview;
            c++;
        }

        console.log(track);
        
    //    let audio = new Audio(track[0]);
    //    audio.play();
    //    console.log(audio.src);

    } catch (error) {
        console.log(error)
    }
}

let isPlaying = false;
let audio = new Audio();
let m = 0;
let bRandPlay = false;
let randTrack = 0;

function toggleRand()
{
    console.log("toggle");
    bRandPlay = bRandPlay == true ? false : true;
}

function modAdd()
{
    if(bRandPlay) {
        randTrack = Math.floor(Math.random() * track.length + 1);
        m = randTrack;
        if(isPlaying){
            playMusic();
        }
        console.log(m);
        return;
    }

    m++;
    if(m > track.length)
        m = 0;

    if(isPlaying){
        playMusic();
    }
        

    console.log(m);
}
function modSub()
{
    if(bRandPlay){
        randTrack = Math.floor(Math.random() * track.length +1);
        m = randTrack;
        if(isPlaying){
            playMusic();
        }
        console.log(m);
        return;
    }

    m--
    if(m < 0)
        m = 0;
    console.log(m);
    if(isPlaying)
        playMusic();
}

function playMusic()
{
    if(track.length <= 0)
        return;
  
    audio.src = track[m];

    audio.play();
    isPlaying = true  
}