/*
js regarding image animation


1: animatie()
2: next()
3: rotate / scale / both
4: repeat (&& if paused, current gets stored)
*/

var img = document.getElementById("animation_image");

var current_deg = 0; // degrees start value
var current_scale = 1; // scale start value
var timeout = 10; // time between frames
var timeleft = 0; // time thats left for current animation

  /* playlist example
  var playlist = [ // animations to play
    ["scale", "+", 0.2, 1],
    ["scale", "-", 0.2, 1],

    ["rotate", "+", 180, 1],
    ["rotate", "-", 180, 1],

    ["both", "+", 180, "+", 1.5, 4],
    ["both", "-", 180, "-", 1.5, 4],

    ["scale", "+", 0.3, 2],
    ["scale", "-", 0.3, 2],

    ["rotate", "+", 360, 2],
    ["rotate", "-", 360, 2]
  ]; */


/* preferred playlist
- 3zoom in uit    
- 4rot wijzerzin 
- 3zoom in uit
- 4 rot tegenwijzerzin
- 3 zoom in uit
- 3 zoom + rot wijzerzin
- 3 rot + zoom tegenwijzerzin
*/

var playlist = [ // animations to play
  // wait 
  ["wait", 4],

  // 3 x in en uit
  ["scale", "+", 0.2, 4],
  ["scale", "-", 0.2, 4],
  ["scale", "+", 0.2, 4],
  ["scale", "-", 0.2, 4],
  ["scale", "+", 0.2, 4],
  ["scale", "-", 0.2, 4],

    // 4 x rot wijzerzin
    ["rotate", "+", 360, 7],
    ["rotate", "+", 360, 7],
    ["rotate", "+", 360, 7],
    ["rotate", "+", 360, 7],

  // 3 x in en uit
  ["scale", "+", 0.2, 4],
  ["scale", "-", 0.2, 4],
  ["scale", "+", 0.2, 4],
  ["scale", "-", 0.2, 4],
  ["scale", "+", 0.2, 4],
  ["scale", "-", 0.2, 4],
  
    // 4 x rot tegenwijzerzin
    ["rotate", "-", 360, 7],
    ["rotate", "-", 360, 7],
    ["rotate", "-", 360, 7],
    ["rotate", "-", 360, 7],

  // 3 x in en uit
  ["scale", "+", 0.2, 4],
  ["scale", "-", 0.2, 4],
  ["scale", "+", 0.2, 4],
  ["scale", "-", 0.2, 4],
  ["scale", "+", 0.2, 4],
  ["scale", "-", 0.2, 4],


    // 3 x rot + zoom wijzerzin
    ["both", "+", 360, "+", 0.2, 7],
    ["both", "+", 360, "+", 0.2, 7],
    ["both", "+", 360, "+", 0.2, 7],

    // 3 x rot + zoom tegenwijzerzin
    ["both", "-", 360, "-", 0.2, 7],
    ["both", "-", 360, "-", 0.2, 7],
    ["both", "-", 360, "-", 0.2, 7]
]; 

var started = false; // started state, if anim has started
var paused = true; // paused state
var current_at_pause = ""; // current function to call when paused
var timeoutFunction; // setTimeout as var

const initial = []; // at start a copy of the playlist and other vars will be stored in here for the reset feature


/* 
animation break, but music continues
*/
function wait(time) {
  // repeat
  functionToCall = "wait(" + time + ")";
  repeat(functionToCall);
}

/* 
direction = str +/-
degrees = float total degrees to travel over time
time = seconds total time of animation
*/
function rotate(dir, deg, time) {
  diff = calculateDiff(deg, time);

  // direction
  current_deg = nextMove(current_deg, dir, diff);

  // transformation
  transform = "rotate(" + current_deg + "deg)";
  transformation(transform);

  // repeat
  functionToCall = "rotate('" + dir + "'," + deg + "," + time + ")";
  repeat(functionToCall);
}

/* 
direction = str +/-
difference = float amount of travel per step
time = seconds total time of animation
*/
function scale(dir, factor, time) {
  diff = calculateDiff(factor, time);

  // direction
  current_scale = nextMove(current_scale, dir, diff);

  // transformation
  transform = "scale(" + current_scale + ")";
  transformation(transform);

  // repeat
  functionToCall = "scale('" + dir + "'," + factor + "," + time + ")";
  repeat(functionToCall);
}

// anim + dir1 + dir2 + end 1 + end 2 + time
function both(dir1, deg, dir2, factor, time) {
  diff1 = calculateDiff(deg, time);
  diff2 = calculateDiff(factor, time);

  // direction
  current_deg = nextMove(current_deg, dir1, diff1);
  current_scale = nextMove(current_scale, dir2, diff2);

  // transformation
  transform = "rotate(" + current_deg + "deg)";
  transform += " ";
  transform += "scale(" + current_scale + ")";
  transformation(transform);

  // repeat
  functionToCall = "both('" + dir1 + "', " + deg + ", '" + dir2 + "', " + factor + ", " + time + ")";
  repeat(functionToCall);
}

/*
calculates the amount of travel it needs for each step
total travel / (total time * 1000 ms) * timeout ms
*/
function calculateDiff(travel, time) {
  return travel / (time * 1000) * timeout;
}

/*
calculates the animations next move depending on the direction and difference
*/
function nextMove(move, dir, diff) {
  if (dir === "-") {
    move -= diff;
  } else if (dir === "+") {
    move += diff;
  }
  return move;
}

/*
applies the transformation with given css transformation
*/
function transformation(t) {
  img.style.webkitTransform = t;
  img.style.transform = t;
  img.style.MozTransform = t;
  img.style.msTransform = t;
  img.style.OTransform = t;
}

/*
setTimeout to repeat function which keeps the animation running
*/
function repeat(functionToCall) {
  if (paused) { // if paused state changed
    current_at_pause = functionToCall; // store current function
  } else {
    if (timeleft >= timeout) {
      timeoutFunction = setTimeout(functionToCall, timeout);
      timeleft -= timeout;
    } else {
      next();
    }
  }
}

/*
decides which animation comes next and executes it
*/
function next() {
  if (playlist.length > 0) {
    //console.log("--------- next ----------------- *");
    var anim = playlist[0]; // first item in playlist

    var fnstring = anim[0]; // find animation
    var fn = window[fnstring]; // find function

    if (fnstring == "both") {
      var dir1 = anim[1];
      var deg = anim[2];
      var dir2 = anim[3];
      var factor = anim[4];
      var time = anim[5];
    } else if (fnstring == "rotate" || fnstring == "scale"){
      var dir = anim[1]; // travel direction
      var end = anim[2]; // travel endpoint
      var time = anim[3]; // total travel time
    } else if(fnstring == "wait") {
      var time = anim[1]; // total travel time
    }

    if (typeof fn === "function") {
      timeleft = time * 1000;

      if (fnstring == "both") {
        fn(dir1, deg, dir2, factor, time);
      } else if(fnstring == "rotate" || fnstring == "scale") {
        fn(dir, end, time); // execute next animation
      } else if(fnstring == "wait") {
        fn(time);
      }
    }
    playlist.shift(); // remove first item
  } else {
    //console.log("animation finished ***");
  }
}

/*
start of the program
*/
function startAnimation() {
  if (!started) {
    initial["playlist"] = getCopyOfArray(playlist);
    initial["current_deg"] = current_deg;
    initial["current_scale"] = current_scale;

    started = true;
    paused = false;
    next(); // start next animation for the first time
  }
}

/*
pause animation
*/
function pauseAnimation() {
  if (!paused) {
    paused = true;
  }
}

/*
restart animation after pause
*/
function unpauseAnimation() {
  if (paused) {
    if (started) {
      paused = false;
      repeat(current_at_pause);
    } else {
      startAnimation();
    }
  }
}

/*
reset animation
*/
function resetAnimation() {
  // clear timeout function
  clearTimeout(timeoutFunction);

  // reset to initial state
  current_deg = initial["current_deg"];
  current_scale = initial["current_scale"];

  playlist = getCopyOfArray(initial["playlist"]);
  timeleft = 0;
  paused = true;
  started = false;
  current_at_pause = "";

  // transform image into original state
  transform = "rotate(" + initial["current_deg"] + "deg)";
  transform += " ";
  transform += "scale(" + initial["current_scale"] + ")";
  transformation(transform);
}


/* 
get a non referenced copy of array
*/
function getCopyOfArray(arr) {
  return JSON.parse(JSON.stringify(arr));
}