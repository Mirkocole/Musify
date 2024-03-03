/*
//Artist Endpoint
const artistEndpoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

//params
let activeParams = window.location.search;
let params = new URLSearchParams(activeParams);
const artistId = params.get('id');
*/

const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=avrillavigne";

window.onload = artistResult();

async function artistResult () {
    try {
        //let res = await fetch(`${artistEndpoint}${artistId}`);
        let res = await fetch(endpoint);
        let json = await res.json();
        cycleResp(json.data);
        
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
