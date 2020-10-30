/*
js regarding client interface (index.html)
*/


/* 
toggle full screen by clicking on animation image
*/
document.getElementById("animation_image").onclick = function() {
  toggleFullScreen();
}

/* 
toggle full screen by clicking on image container (once at startup)
*/
wentFullscreenOnStartup = false;
document.getElementById("image_container").onclick = function() {
if(!wentFullscreenOnStartup) {
  toggleFullScreen();
  wentFullscreenOnStartup = true;
}
}


/*
toggle full screen function
*/
function toggleFullScreen() {
  document.getElementById("image_container").focus();

  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
      document.getElementById("toggle_button").classList.add("player_button_active");
  }
  else {
      cancelFullScreen.call(doc);
      document.getElementById("toggle_button").classList.remove("player_button_active");
  }
}