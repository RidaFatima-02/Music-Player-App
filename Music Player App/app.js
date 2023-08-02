let menu = document.getElementById("menu");
let playist = document.querySelector(".music-playlist");

// variable create for play, prev, next,shuffle,repeat
const play = document.querySelector(".play"),
    previous = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    shufflebtn = document.querySelector(".shuffle"),
    repeatbtn = document.querySelector(".repeat"),


    // song duration
    slider = document.querySelector(".duration-slider"),
    trackCurrentTime = document.querySelector(".current-time"),
    trackDurationTime = document.querySelector(".duration-time"),


    //  track image or artist name
    trackImage = document.querySelector(".track-image"),
    title = document.querySelector(".title"),
    artist = document.querySelector(".artist"),


    //  volume control
    volumeIcon = document.querySelector("#volume-icon"),
    currentVolume = document.querySelector("#volume"),

    //music Playlist
    musicPlaylist = document.querySelector(".music-playlist"),
    pDiv = document.querySelector(".playlist-div"),
    playlist = document.querySelector(".playlist");


//repeat and shuffle icon
let repeatIcon = document.querySelector(".repeat-icon"),
    shuffleIcon = document.querySelector(".shuffle-icon");


let timer;
let indexTrack = 0;
let songIsPlaying = false;
// let israndom = false;
let track = document.createElement("AUDIO");



// all event listeners
play.addEventListener("click", justPlay);
next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);
volumeIcon.addEventListener("click", muteSound);
currentVolume.addEventListener("change", changeVolume);
slider.addEventListener("change", changeDuration);

track.addEventListener("timeupdate", songTimeUpdate)

// load track
function loadTrack(indexTrack) {

    clearInterval(timer);

    resetSlider();

    track.src = trackList[indexTrack].path;
    trackImage.src = trackList[indexTrack].img;
    title.innerHTML = trackList[indexTrack].name;
    artist.innerHTML = trackList[indexTrack].singer;
    track.load();


    timer = setInterval(updateSlider, 1000);

}
loadTrack(indexTrack);

// play songs or pause
function justPlay() {
    if (songIsPlaying == false) {
        playSong();


    }
    else {
        pauseSong();
    }
}

//play Song
function playSong() {
    track.play();
    songIsPlaying = true;
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';


}


//pause Song
function pauseSong() {
    track.pause();
    songIsPlaying = false;
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
}

//Next Songs
function nextSong() {


    // shuffle when playing next song
    if (shuffle) {
        shufflefunc();
        loadTrack(indexTrack);
        playSong();
        return;


    }

    if (indexTrack < trackList.length - 1) {
        indexTrack++;
        loadTrack(indexTrack);
        playSong();


    }
    else {
        indexTrack = 0;
        loadTrack(indexTrack);
        playSong();

    }

}




//previous Songs
function prevSong() {

    // shuffle when playing previous song
    if (shuffle) {
        shufflefunc();
        loadTrack(indexTrack);
        playSong();
        return;


    }
    if (indexTrack > 0) {
        indexTrack--;
        loadTrack(indexTrack);
        playSong();


    }
    else {
        indexTrack = trackList.length - 1;
        loadTrack(indexTrack);
        playSong();

    }

}

//mute sound
function muteSound() {
    track.volume = 0;
    currentVolume.value = 0;
    volumeIcon.setAttribute("class", "ri-volume-mute-fill");

}


//change Volume
function changeVolume() {
    track.volume = currentVolume.value / 100;
    volumeIcon.setAttribute("class", "ri-volume-up-fill");

    if (track.volume == 0) {
        volumeIcon.setAttribute("class", "ri-volume-mute-fill");

    }
}


//change song duration
function changeDuration() {
    let sliderPosition = track.duration * (slider.value / 100);

    track.currentTime = sliderPosition;
}



//reset Slider
function resetSlider() {
    slider.value = 0

}

// song update Slider
function updateSlider() {
    let position = 0;

    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);

        slider.value = position;

    }
    if (track.ended) {
        play.innerHTML = '<i class="fa-solid fa-pause"></i>';

        if (indexTrack < trackList.length - 1) {
            indexTrack++;
            loadTrack(indexTrack);
            playSong();

        }
        else if (indexTrack == trackList.length - 1) {
            indexTrack = 0;
            loadTrack(indexTrack);
            playSong();

        }

    }
}


//update Current song time
function songTimeUpdate() {

    if (track.duration) {

        let currentMins = Math.floor(track.currentTime / 60);
        let currentsecs = Math.floor(track.currentTime - currentMins * 60);



        let durmins = Math.floor(track.duration / 60);
        let dursecs = Math.floor(track.duration - durmins * 60);

        if (dursecs < 10) {
            dursecs = "0" + dursecs;

        }
        if (durmins < 10) {
            durmins = "0" + durmins;

        }

        if (currentMins < 10) {
            currentMins = "0" + currentMins;

        }

        trackCurrentTime.innerHTML = currentMins + ":" + currentsecs;
        trackDurationTime.innerHTML = durmins + ":" + dursecs;

    }

    else {


        trackCurrentTime.innerHTML = "00" + ":" + "00";
        trackDurationTime.innerHTML = "00" + ":" + "00";
    }



}

// show and hide playlists
menu.addEventListener("click", function () {
    playist.classList.toggle("toggle");
    menu.classList.toggle("active");
});

let heart = document.querySelector(".heart")
let heartIcon = document.querySelector(".heart-icon");

heart.addEventListener("click",function (){
        heartIcon.classList.toggle("red");

    });



//display Tracks in playlist 
let counter = 1;
function displayTracks() {
    for (let i = 0; i < trackList.length; i++) {
        //console.log(trackList[i].name);

        let div = document.createElement("div");
        div.classList.add("playlist");
        div.innerHTML = `
        <span class="song-index">${counter++}</span>
        <p class="single-song">${trackList[i].name}</p>
        `;
        pDiv.appendChild(div);


    }

    playFromPlaylist();


}
displayTracks();


// playing song from the playlist
function playFromPlaylist() {
    pDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("single-song")) {
            // alert(e.target.innerHTML);

            const indexNum = trackList.findIndex((item, index) => {
                if (item.name == e.target.innerHTML) {
                    return true;

                }
            });
            loadTrack(indexNum);
            playSong();
            playist.classList.remove("toggle");
            menu.classList.remove("active");

        }
    });
}

let shuffle = false,
    repeat = 0;

// repeat songs
function repeatSong() {
    if (repeat === 0) {
        repeat = 1;
        repeatIcon.classList.add("green");
    }
    else {
        repeat = 0;
        repeatIcon.classList.remove("green");
    }

}

repeatbtn.addEventListener("click", repeatSong);


track.addEventListener("ended", () => {
    if (repeat === 1) {
        loadTrack(indexTrack);
        playSong();

    }
    else {
        nextSong();
        playSong();

    }
});


//shuffle songs or random songs
function shuffleSongs() {
    shuffle = !shuffle;
    shuffleIcon.classList.toggle("green");
}


shufflebtn.addEventListener("click", shuffleSongs);

function shufflefunc() {
    if (shuffle) {

        // select a random song from playlists
        indexTrack = Math.floor(Math.random() * trackList.length);

    }

    // if shuffle false do nothing

}
