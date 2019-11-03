var framerateElement;
var antwalk = new Antwalk(10,10, 500, "RL")

function setup(){
    var width = 500
    var height = 500
    canvas = createCanvas(width, height);
    canvas.parent('CanvasHolder')
    framerateElement = document.getElementById("framerate")
    frameRate(120)
    antwalk.counterElement = document.getElementById("counter")
    input = createInput('RL');
    button = createButton("Input pattern");
    button.mousePressed(newPattern);

}

function newPattern(){
    restart()
}

function draw(){
    framerateElement.textContent = Math.round(getFrameRate()) + "fps"
    antwalk.draw() 
}

function restart(){
    antwalk = new Antwalk(10,10,500,input.value())
    setPauseButtonText()
}

function pause(){
    antwalk.paused = !antwalk.paused
    setPauseButtonText()
}

function setPauseButtonText(){
    document.getElementById("pausebutton").textContent = antwalk.paused ? "Continue" : "Pause"
}



