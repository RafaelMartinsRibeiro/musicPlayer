const videoPlayer = document.getElementById("container")
const video = document.getElementById("video");
const play = document.getElementById("buttonPlay");
const controle = document.getElementById("controle");


videoPlayer.addEventListener("click", function(){

    if(video.paused){
        video.play();
        play.setAttribute("src", "./assets/pause.jpg");
    } else{
        video.pause();
        play.setAttribute("src", "./assets/play.png");
    }
})
