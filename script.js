let trackList = [
    {  
        audioSrc: "assets/music1.mp3",
        image: "images/albumCover1.jpg",
        name: "Numb",
        artist: "Linkin Park"
    },
    {   
        audioSrc: "assets/music2.mp3",
        image: "images/albumCover2.png",
        name: "Bandolero donde voy",
        artist: "Toretto"
    },
    {   
        audioSrc: "assets/music3.mp3",
        image: "images/albumCover3.png",
        name: "Quer voar",
        artist: "Matuê"
    },
    {
        audioSrc: "assets/music4.mp3",
        image: "images/albumCover4.jpg",
        name: "Broadway Girls",
        artist: "Lil Durk feat. Morgan Wallen"
    },
    {
        audioSrc: "assets/music5.mp3",
        image: "images/albumCover5.jpg",
        name: "Escape Plan",
        artist: "Travis Scott"
    },
    {
        audioSrc: "assets/music6.mp3",
        image: "images/albumCover6.jpg",
        name: "Wrecked",
        artist: "Imagine Dragons"
    }
];

const audioControl = document.getElementById("audioControl");
const audio = document.getElementById("audio");
const image = document.getElementById("musicImage");
const musicName = document.getElementById("musicName");
const artistName = document.getElementById("artistName");
const progress = document.getElementById("progressed");
const progressBar = document.getElementById("progressBar")
const musicTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const playlistButton = document.getElementById("playlist");
const musicList = document.getElementById("musicList");
const musicDescription = document.getElementById("musicListDescription");
const mute = document.getElementById("volume");
const volumeBar = document.getElementById("volumeBar")
const currentVolume = document.getElementById("currentVolume");
const volumePercent = document.getElementById("currentVolumeValue")
const shuffle = document.getElementById("shuffle");
const rewind = document.getElementById("rewind");
const play = document.getElementById("play");
const forward = document.getElementById("forward");
const repeat = document.getElementById("repeat");


let playlistButtonOn = false;
let volumeOn = false;
let isPlaying = false; 
let shuffleOn = false;
let repeatOn = false;
let currentMusic = 1;
loadMusic(currentMusic);
addMusicList();
localStorage.clear();

const allMusicSelect = musicDescription.querySelectorAll("span");
setMusicListAttribute();

selectVerify();
function loadMusic(trackIndex){
    audio.src = trackList[trackIndex - 1].audioSrc;
    audioControl.load();
    musicName.innerText = trackList[trackIndex - 1].name;
    image.src = trackList[trackIndex - 1].image;
    artistName.innerText = trackList[trackIndex - 1].artist;  
}

function addMusicList(){
    for(let i = 0; i < trackList.length; i++){
        let spanTag = `<span spanIndex ="${i + 1}">${trackList[i].name} - ${trackList[i].artist}</span>`;
    
        musicDescription.insertAdjacentHTML("beforeend", spanTag);
    }
}

function selectVerify(){ 
    for(let j = 0; j < allMusicSelect.length; j++){    
        
        let spanIndex = parseInt(allMusicSelect[j].getAttribute("spanIndex"))
        
        if(allMusicSelect[j].classList.contains("playing")){
            allMusicSelect[j].classList.remove("selectedMusic")
        }
    
        if(spanIndex == currentMusic){
            allMusicSelect[j].classList.add("selectedMusic");
            allMusicSelect[j].classList.add("playing");
        }
    }
}

function setMusicListAttribute(){
    for(let j = 0; j < allMusicSelect.length; j++){
        allMusicSelect[j].setAttribute("onclick", "selected(this)");
        
    }
}

function selected(element){
    let getSpanIndex = element.getAttribute("spanIndex");
    currentMusic = parseInt(getSpanIndex);
    loadMusic(currentMusic);
    playMusic();   

    for(let j = 0; j < allMusicSelect.length; j++){
        if(allMusicSelect[j].classList.contains("playing")){
            allMusicSelect[j].classList.remove("selectedMusic")
        }

        let spanIndex = parseInt(allMusicSelect[j].getAttribute("spanIndex"))
        if(spanIndex == currentMusic){
            allMusicSelect[j].classList.add("selectedMusic");
            allMusicSelect[j].classList.add("playing");
        }
    }
    
}

function playVerify(){
    isPlaying = true;
    audioControl.play();
    play.src = "images/pause.png";
}

function pauseVerify(){
    isPlaying = false;
    audioControl.pause();
    play.src = "images/play.png";
}

function playMusic(){
    if(isPlaying){
        pauseVerify();
    } else{
        playVerify();
    }
}

function previousMusic(){
    if(currentMusic > 1){
        
        currentMusic -= 1;
        selectVerify();
        loadMusic(currentMusic);
        isPlaying = false;
        playMusic();
    } else{
        
        currentMusic = trackList.length ;
        selectVerify();
        loadMusic(currentMusic);
        isPlaying = false;
        playMusic();
    }
}

function shuffleMusic(){
    let randomIndex = Math.round(Math.random() * (trackList.length ));
            
    do{
        randomIndex = Math.round(Math.random() * (trackList.length));
    }while(randomIndex == currentMusic || randomIndex == 0);

    currentMusic = randomIndex;
    
    loadMusic(currentMusic);
    isPlaying = false;
    selectVerify();
    playMusic();
}

function nextMusic(){
    if(currentMusic < trackList.length){
        
        if(shuffleOn){
            shuffleMusic();

        }else{
            currentMusic += 1;
            selectVerify();
            loadMusic(currentMusic);
            isPlaying = false;
            playMusic();
        }
    
    } else{
        
        currentMusic = 1;
        selectVerify();
        loadMusic(currentMusic);
        isPlaying = false;
        playMusic();
    }
}

function timeUpdate(){
    let currentTime = audioControl.currentTime;
    let duration = audioControl.duration;
    let progressWidth = (currentTime / duration) * 100;
    let min = Math.floor(currentTime / 60);
    let sec = Math.floor(currentTime % 60);

    if(sec < 10){
        sec = `0${sec}`;
    }
    if(min < 10){
        min = `0${min}`;
    }
    
    progress.style.width = `${progressWidth}%`;
    musicTime.innerText = `${min}:${sec}`;
}

function totalTimeUpdate(){
    let duration = audioControl.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);

    if(totalSec < 10){
        totalSec = `0${totalSec}`;
    }
    if(totalMin < 10){
        totalMin = `0${totalMin}`;
    }
    
    totalTime.innerText = `${totalMin}:${totalSec}`;
}

function selectMusicTime(x){
    let progressVal = progressBar.clientWidth;
    let clickedOffSetX = x.offsetX;
    let duration = audioControl.duration;
    
    audioControl.currentTime = (clickedOffSetX / progressVal) * duration;
}

function selectVolume(x){
    let volumeVal = volumeBar.clientWidth;
    let clickedOffSetX = x.offsetX;
    let volumeWidth = (clickedOffSetX / volumeVal) ;
    let volumePercentValue = Math.floor(volumeWidth * 100);
    
    if(volumePercentValue > 0){
        volumeOn = false;
        audioControl.volume = (parseFloat(volumeWidth.toFixed(2)));
        volumePercent.innerText = `${volumePercentValue}%`;
        currentVolume.style.width = `${volumeWidth * 100}%`;
        mute.src = "images/volume.png";
        localStorage.setItem("audioControlVolume", audioControl.volume);
    } else{
        volumeOn = true;
        audioControl.volume = 0;
        volumePercent.innerText = "0%";
        currentVolume.style.width = "1%";
        mute.src = "images/mute.png";
        localStorage.setItem("audioControlVolume", audioControl.volume);   
    }
}

function volumeVerify(){
    volumeOn = true;
    mute.src = "images/mute.png";
    audioControl.volume = 0;
}

function muteVerify(){
    let audioControlVolume = localStorage.getItem("audioControlVolume");
    volumeOn = false;
    mute.src = "images/volume.png";
    if(audioControlVolume === null){
        audioControlVolume = 1;
    }

    audioControl.volume = audioControlVolume;  
}

function muteMusic(){
    if(volumeOn){
        muteVerify();
    }else{
        volumeVerify();
    }
}

function repeatVerify(){
    if(repeatOn){
        repeatOn = false;
        repeat.style.backgroundColor = "#FFFFFF";
    }else{
        repeatOn = true;
        repeat.style.backgroundColor = "#8c00ff";

        shuffleOn = false;
        shuffle.style.backgroundColor = "#FFFFFF";
    }
}

function repeatMusic(){
    if(repeatOn){
        audioControl.currentTime = 0;
        playVerify();
    }else{
        nextMusic();
    }
}

function shuffleVerify(){
    if(shuffleOn){
        shuffleOn = false;
        shuffle.style.backgroundColor = "#FFFFFF";
    }else{
        shuffleOn = true;
        shuffle.style.backgroundColor = "#8c00ff";

        repeatOn = false;
        repeat.style.backgroundColor = "#FFFFFF";
    }
}

function showPlaylist(){
    if(playlistButtonOn){
        playlistButtonOn = false;
        musicList.style.display = "none";
        playlistButton.src = "images/playslist.png";
        playlistButton.style.width = "40px"
        playlistButton.style.height = "40px"
    } else{
        playlistButtonOn = true;
        musicList.style.display = "block";
        playlistButton.src = "images/close.png";
        playlistButton.style.width = "30px"
        playlistButton.style.height = "30px"
    }
}

play.addEventListener("click", () => playMusic());

rewind.addEventListener("click", () => previousMusic());

forward.addEventListener("click", () => nextMusic());

audioControl.addEventListener("timeupdate", () => {
    timeUpdate();
    
    audioControl.addEventListener("loadeddata", () => totalTimeUpdate());
});

progressBar.addEventListener("click", (x) => selectMusicTime(x));

volumeBar.addEventListener("click", (x) => selectVolume(x));

mute.addEventListener("click", () => muteMusic());

repeat.addEventListener("click", () => repeatVerify());

shuffle.addEventListener("click", () => shuffleVerify());

audioControl.addEventListener("ended", () => repeatMusic());

playlistButton.addEventListener("click", () => showPlaylist());