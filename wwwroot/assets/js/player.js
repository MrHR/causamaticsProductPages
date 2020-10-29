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
show progress with progressbar
*/
function showProgress(currentTime) {
    if(!audioLength.isNaN) {
        percentage = currentTime / audioLength * 100;
        progress.style.width = percentage + "%";
        //$("#progressbar").val(percentage).slider("refresh");
    }
}


/*
function getWidth(elem) {
    return elem.offsetWidth;
}


pb = document.getElementById("progressbar");
p = document.getElementById("progress");

console.log("total w: " + getWidth(pb));


$('#progress').resizable({
    handles: "e",
    create: function( event, ui ) {
        // Prefers an another cursor with two arrows
        $(".ui-resizable-e").css("cursor","pointer");
    }
});

$('#progress').on('resize', function() {
    console.log(getWidth(p));
});


$(document).ready(function() {
    $( "#progressbar" ).on( "change", function() {
        
            //percentage = $("#progressbar").val();
            //console.log(percentage / 100 * audioLength);
        
    });

    // desktop
    $("#progressbar").parent().mousedown(function() {
        player_pause();
        $("#image_container").css('background-color','blue');
    });

    $("#progressbar").parent().mouseup(function() {
        percentage = $("#progressbar").val();
        seconds = player.duration / 100 * percentage;
        player.currentTime = seconds;
        move_animation(seconds);
        $("#image_container").css('background-color','white');
        player_play();
    });

    // mobile
    $("#progressbar").parent().on("touchstart", function() {
        player_pause();
        $("#image_container").css('background-color','blue');
    });

    $("#progressbar").parent().on("touchend", function() {
        player_play();
        $("#image_container").css('background-color','white');
    });
});
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



/*
keep screen awake hack
*/

