var framerateElement;
var antwalk = new Antwalk(10,10, 500, 500)

function setup(){
    var width = 500
    var height = 500
    canvas = createCanvas(width, height);
    canvas.parent('CanvasHolder')
    framerateElement = document.getElementById("framerate")
    frameRate(120)
    antwalk.counterElement = document.getElementById("counter")
}


function draw(){
    framerateElement.textContent = Math.round(getFrameRate()) + "fps"
    antwalk.draw() 
}

function restart(){
    antwalk = new Antwalk(10,10,500,500)
    setPauseButtonText()
}

function pause(){
    antwalk.paused = !antwalk.paused
    setPauseButtonText()
}

function setPauseButtonText(){
    document.getElementById("pausebutton").textContent = antwalk.paused ? "Continue" : "Pause"
}



