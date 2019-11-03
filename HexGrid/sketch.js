var framerateElement;
var antwalk = new Antwalk(10, 500, "LL")

function setup(){
    var width = 500
    var height = 500
    canvas = createCanvas(width, height);
    canvas.parent('CanvasHolder')
    framerateElement = document.getElementById("framerate")
    frameRate(120)
    antwalk.counterElement = document.getElementById("counter")
    input = createInput('LL');
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
    antwalk = new Antwalk(10,500,input.value())
    setPauseButtonText()
}

function pause(){
    antwalk.paused = !antwalk.paused
    setPauseButtonText()
}

function setPauseButtonText(){
    document.getElementById("pausebutton").textContent = antwalk.paused ? "Continue" : "Pause"
}

function move(){
    antwalk.move()
}

function addSpeed(change){
    newSpeed = antwalk.actionsPerDraw + change
    newSpeed = Math.max(newSpeed, 1)
    antwalk.actionsPerDraw = newSpeed
    document.getElementById("speed").textContent = "Speed: " + newSpeed
}



