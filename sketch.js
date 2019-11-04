var framerateElement;
var antwalk;
var canvas;
var width, height;
var walktype;
var initPattern = "RL"

function setup(){
    framerateElement = document.getElementById("framerate")
    setupHexWalk(initPattern)
    // setupSquareWalk()
    input = createInput("RL");
    button = createButton("Input pattern");
    button.mousePressed(restart);
}

function setupCanvas(){
    canvas = createCanvas(width, height);
    canvas.parent('CanvasHolder')
}

function setupHexWalk(pattern){
    if(pattern == null){
        pattern = input.value()
    }
    walktype = "hex"
    clear()
    width = 800
    height = 500
    setupCanvas()
    antwalk = new Hexwalk(10, width, height, pattern)
    antwalk.counterElement = document.getElementById("counter")
}

function setupSquareWalk(pattern){
    if(pattern == null){
        pattern = input.value()
    }
    walktype = "square"
    clear()
    width = 500
    height = 500
    setupCanvas()
    antwalk = new Squarewalk(10, 10, width, pattern)
    antwalk.counterElement = document.getElementById("counter")
}

function draw(){
    framerateElement.textContent = Math.round(getFrameRate()) + "fps"
    antwalk.draw() 
}

function restart(){
    clear()
    switch (walktype){
        case "hex":
            setupHexWalk(input.value())
            break;
        case "square":
            setupSquareWalk(input.value())
            break;
    }
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



