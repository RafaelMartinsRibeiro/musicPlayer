window.addEventListener("load", function(){
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

    let isPlaying = false; 
    let currentMusic = 0;
    loadMusic(currentMusic) ;
    
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
        if(currentMusic > 0){
            currentMusic -= 1;
            loadMusic(currentMusic);
            isPlaying = false;
            playMusic();
            console.log(currentMusic);
            console.log(trackList.length);
        } else{
            currentMusic = trackList.length - 1;
            loadMusic(currentMusic);
            isPlaying = false;
            playMusic();
        }
    }

    function nextMusic(){
        if(currentMusic < trackList.length - 1){
            currentMusic += 1;
            loadMusic(currentMusic);
            isPlaying = false;
            playMusic();
        
        } else{
            currentMusic = 0;
            loadMusic(currentMusic);
            isPlaying = false;
            playMusic();
        }
    }

    play.addEventListener("click", function(){
        playMusic();
    })
    
    rewind.addEventListener("click", function(){
        previousMusic();
    })

    forward.addEventListener("click", function(){
        nextMusic();
    })
}) 




