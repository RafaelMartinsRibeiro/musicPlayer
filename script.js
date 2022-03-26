window.addEventListener("load", function(){
    let trackList = [
        {  
            audioSrc: "assets/music1.mp3",
            image: "images/albumCover1.jpg",
            name: "Numb - Linkin Park",
            artist: "Linkin Park"
        },
        {   
            audioSrc: "assets/music2.mp3",
            image: "images/albumCover2.png",
            name: "Badolero pronde voi",
            artist: "Torreto"
        }
    ];
    
    const audioControl = document.getElementById("audioControl");
    let audio = document.getElementById("audio");
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


    loadMusic(0);
    let isPlaying = false; 

    function loadMusic(trackIndex){
        audio.src = trackList[trackIndex].audioSrc;
        audioControl.load();
        musicName.innerText = trackList[trackIndex].name;
        image.src = trackList[trackIndex].image;
        artistName.innerText = trackList[trackIndex].artist;
    }
    
    function playVerify(){
        isPlaying = true;
        audioControl.play();
        play.src = "images/pause.png"
    }

    function pauseVerify(){
        isPlaying= false;
        audioControl.pause();
        play.src = "images/play.png"
    }

    function playMusic(){
        if(isPlaying){
            pauseVerify();
        } else{
            playVerify();
        }
    }

    play.addEventListener("click", function(){
        playMusic();
    })

    // function nextMusic(){
    //     loadMusic(1)
    //     playMusic();
    // }
    
    // forward.addEventListener("click", function(){
    //     nextMusic();
    // })
}) 




