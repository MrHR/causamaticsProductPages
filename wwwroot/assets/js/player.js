var player = document.getElementById("player");
var progress = document.getElementById("progress");
audioLength = 0;

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
}

/* 
pause player
*/
function player_pause() {
    pauseAnimation();

    player.pause();
}

/* 
rewind player
*/
function player_rewind() {
    resetAnimation();

    player.pause();
    player.currentTime = 0;
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
show progress with progressbar
*/
function showProgress(currentTime) {
    if(!audioLength.isNaN) {
        percentage = currentTime / audioLength * 100;
        progress.style.width = percentage + "%";
    }
}