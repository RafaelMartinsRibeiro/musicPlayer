let trackList = [
    {  
        audio: "assets/music1.mp3",
        image: "images/albumCover.jpg",
        name: "Numb - Linkin Park",
        artist: "Linkin Park"
    },
    {   
        audioSrc: "assets/music2.mp3",
        image: "a",
        name: "a",
        artist: "a"
    }
];

const audioControl = document.getElementById("audioControl");
const audio = document.getElementById("audio");
const image = document.getElementById("musicImage");
const musicName = document.getElementById("musicName");
const artistName = document.getElementById("artistName");
const progress = document.getElementById("progressed");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const playlist = document.getElementById("playlist");
const volume = document.getElementById("volume");
const currentVolume = document.getElementById("currentVolume");
const shuffle = document.getElementById("shuffle");
const rewind = document.getElementById("rewind");
const play = document.getElementById("play");
const forward = document.getElementById("forward");
const repeat = document.getElementById("repeat");

let audioIndex = 1;



