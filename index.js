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




window.onload = () => {

    defaultArtist.forEach(data => {
        getMusic(data);
    });
}


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