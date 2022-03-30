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
    localStorage.clear();

    function loadMusic(trackIndex){
        audio.src = trackList[trackIndex - 1].audioSrc;
        audioControl.load();
        musicName.innerText = trackList[trackIndex - 1].name;
        image.src = trackList[trackIndex - 1].image;
        artistName.innerText = trackList[trackIndex - 1].artist;
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
            loadMusic(currentMusic);
            isPlaying = false;
            playMusic();
        } else{
            currentMusic = trackList.length ;
            loadMusic(currentMusic);
            isPlaying = false;
            playMusic();
        }
    }

    function nextMusic(){
        if(currentMusic < trackList.length){
            
            if(shuffleOn){
                let randomIndex = Math.round(Math.random() * (trackList.length ));
                
                do{
                    randomIndex = Math.round(Math.random() * (trackList.length));
                    console.log(randomIndex);
                }while(randomIndex == currentMusic || randomIndex == 0);

                currentMusic = randomIndex;
                
                loadMusic(currentMusic);
                isPlaying = false;
                playMusic();


            }else{
                currentMusic += 1;
                loadMusic(currentMusic);
                isPlaying = false;
                playMusic();
            }
        
        } else{
            currentMusic = 1;
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

    play.addEventListener("click", function(){
        playMusic();
    });
    
    rewind.addEventListener("click", function(){
        previousMusic();
    });

    forward.addEventListener("click", function(){
        nextMusic();
    });

    audioControl.addEventListener("timeupdate", function(){
        timeUpdate();
        
        audioControl.addEventListener("loadeddata", function(){
            totalTimeUpdate();
        });
    });

    progressBar.addEventListener("click", function(x){
        selectMusicTime(x);
    });

    volumeBar.addEventListener("click", function(x){
        selectVolume(x);
    });

    mute.addEventListener("click", function(){
        muteMusic();
    });

    repeat.addEventListener("click", function(){
        repeatVerify();
    });

    shuffle.addEventListener("click", function(){
        shuffleVerify();
    });

    audioControl.addEventListener("ended", function(){
        repeatMusic();
    });

    playlistButton.addEventListener("click", function(){
        showPlaylist();
    })
    
}) 




