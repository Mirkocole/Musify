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

    setInterval(()=>{
        let rand = Math.floor(Math.random() * messages.length);
        console.log(messages[rand]);
        let mex = document.createElement('p');
        mex.classList = ['text-light py-2'];
        mex.innerText=messages[rand];
        if (commentsNav.hasChildNodes) {
            commentsNav.insertBefore(mex,commentsNav.firstChild)
        } else {
            commentsNav.append(mex);
            
        }

    },1000)

}


/* MUSIC PLAYER */
var status = 0;
function Play(music,id) {
    var audio = $("#"+id); 
	if(status == 0 || status == 2)
	{     
		if(status == 0) audio.attr("src", music);
		audio[0].play();
		$("#play").attr("class","glyphicon glyphicon-pause aligned")
		status = 1;
	} else if(status == 1) {    
		audio[0].pause();
		$("#play").attr("class","glyphicon glyphicon-play aligned")
		status = 2;
	}
}
function Stop(music,id) {
	var audio = $("#"+id);
	audio.attr("src", '');
	$("#play").attr("class","glyphicon glyphicon-play aligned")
	status = 0;
}
function Restart(music,id) {
	var audio = $("#"+id);
	audio.prop("currentTime",0)
}
function VolumeUp(music,id) {
	var audio = $("#"+id);
	var volume = $("#"+id).prop("volume")+0.1;
	if(volume > 1) volume = 1;
    $("#"+id).prop("volume",volume);
}
function VolumeDown(music,id) {
	var audio = $("#"+id);
	var volume = $("#"+id).prop("volume")-0.1;
	if(volume < 0) volume = 0;
    $("#"+id).prop("volume",volume);
}
function Forward5(music,id) {
	var audio = $("#"+id);
	audio.prop("currentTime",audio.prop("currentTime")+5);
}
function Backward5(music,id) {
	var audio = $("#"+id);
	audio.prop("currentTime",audio.prop("currentTime")-5);
}
function Forward1(music,id) {
	var audio = $("#"+id);
	audio.prop("currentTime",audio.prop("currentTime")+1);
}
function Backward1(music,id) {
	var audio = $("#"+id);
	audio.prop("currentTime",audio.prop("currentTime")-1);
}
/************************************************************************ */