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
    input.parent(document.getElementById("inputpattern"))
    // document.getElementById("inputpattern").appendChild(input.Element)
    button = createButton("Input pattern");
    button.parent(document.getElementById("inputpattern"))
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
    width = 800
    height = 700
    reset()
    displayPatterns("hex")
    antwalk = new Antwalk(10, width, height, pattern, "hex")
    antwalk.counterElement = document.getElementById("counter")
}

function setupSquareWalk(pattern){
    if(pattern == null){
        pattern = input.value()
    }
    walktype = "square"
    width = 700
    height = 700
    reset()
    displayPatterns("square")
    antwalk = new Antwalk(10, width, height, pattern, "square")
    antwalk.counterElement = document.getElementById("counter")
}

function displayPatterns(type){
    document.getElementById("hexpatterns").style.display = type == "hex" ? "initial" : "none"
    document.getElementById("squarepatterns").style.display = type == "square" ? "initial" : "none"
}

function reset(){
    document.getElementById("enlargewarning").style.display = "none"
    document.getElementById("speed").textContent = "Speed: 1"
    clear()
    setupCanvas()
    setPauseButtonText("Start")
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
    setPauseButtonText("Start")
}

function pause(){
    antwalk.paused = !antwalk.paused
    setPauseButtonText()
}

function setPauseButtonText(text){
    if(text == null){
        document.getElementById("pausebutton").textContent = antwalk.paused ? "Continue" : "Pause"
    } else {
        document.getElementById("pausebutton").textContent = text
    }
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

function setPattern(pattern){
    input.value(pattern)
    restart()
}

function displayEnlargementWarning(bool){
    document.getElementById("enlargewarning").style.display = bool ? "initial" : "none"
}

function displayEnlargmentInfo(bool){
    document.getElementById("enlargeinfo").style.display = bool ? "initial" : "none"
}

// function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
// }

