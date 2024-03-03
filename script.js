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


async function getMusic(){

    try {
        let res = await fetch(apiURL+'queen');
        let json = await res.json();
        console.log(json);

    } catch (error) {
        console.log(error)
    }
}