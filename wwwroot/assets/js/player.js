var player = document.getElementById("player");
var progress = document.getElementById("progress");
audioLength = 0;

var muted = false;


/* 
play player
*/
function player_play() {
    if(started == false) {
        startAnimation();
    } else {
        unpauseAnimation();
    }

    player.play();

    document.getElementById("play_button").style.display = "none";
    document.getElementById("pause_button").style.display = "inline";

    document.getElementById("pause_button").classList.add("player_button_active");

    if(!wentFullscreenOnStartup) {
        toggleFullScreen();
        wentFullscreenOnStartup = true;
    }
}

/* 
pause player
*/
function player_pause() {
    pauseAnimation();

    document.getElementById("play_button").style.display = "inline";
    document.getElementById("pause_button").style.display = "none";

    document.getElementById("pause_button").classList.remove("player_button_active");

    player.pause();
}

/* 
rewind player
*/
function player_rewind() {
    resetAnimation();

    document.getElementById("play_button").style.display = "inline";
    document.getElementById("pause_button").style.display = "none";
    document.getElementById("pause_button").classList.remove("player_button_active");
    document.getElementById("pause_button").classList.remove("player_button_active");

    player.pause();
    player.currentTime = 0;
}

/*
mute player
*/
function mute() {
    document.getElementById("image_container").focus();

    if(muted) {
        player.muted = false;
        document.getElementById("mute_button").classList.remove("player_button_active");
        muted = false;
    } else {
        player.muted = true;
        muted = true;
        document.getElementById("mute_button").classList.add("player_button_active");
    }

}

/*
music player on play
*/
player.onplay = function() {
    audioLength = player.duration;
}

/*
music player update
*/
player.ontimeupdate = function() {
    showProgress(player.currentTime);
};

/*
reset player on end
*/
player.onended = function() {
    player_rewind();
}

/* 
show progress with progressbar
*/
function showProgress(currentTime) {
    if(!audioLength.isNaN) {
        percentage = currentTime / audioLength * 100;
        progress.style.width = percentage + "%";
    }
}


/*
play/pause by pressing spacebar
*/
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.code === "Space") {
        if(paused) {
            player_play();
        } else {
            player_pause();
        }
    }
};
