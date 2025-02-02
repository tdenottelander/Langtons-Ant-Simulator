var framerateElement;
var antwalk;
var canvas;
var width, height;
var walktype;
var initPattern = "RL"
var delay;
var delayCounter;

function setup(){
    framerateElement = document.getElementById("framerate")
    setupHexWalk(initPattern)
    // setupSquareWalk()
    input = createInput("RL");
    input.parent(document.getElementById("inputpattern"))
    // document.getElementById("inputpattern").appendChild(input.Element)
    button = createButton("Input pattern")
    button.parent(document.getElementById("inputpattern"))
    button.mousePressed(restart);
    delay = 0
    delayCounter = 0
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
    if(delayCounter >= delay){
        // strokeWeight(0)
        antwalk.draw() 
        delayCounter = 0
    } else {
        delayCounter++
    }
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
    let pausebutton = document.getElementById("pausebutton")
    if(text == null){
        if(antwalk.paused){
            pausebutton.textContent = "Continue"
            pausebutton.style.backgroundColor = "rgb(80, 187, 114)"
        } else {
            pausebutton.textContent = "Pause"
            pausebutton.style.backgroundColor = "rgb(187, 171, 80)"
        }

    } else {
        pausebutton.textContent = text
        pausebutton.style.backgroundColor = "rgb(80, 187, 114)"
    }
}

function move(){
    antwalk.move()
}

function addSpeed(change){
    newSpeed = antwalk.actionsPerDraw + change
    newSpeed = Math.max(newSpeed, 1)
    antwalk.actionsPerDraw = newSpeed
    document.getElementById("speed").textContent = "Moves per update: " + newSpeed
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

function addDelay(change){
    console.log("addDelay("+change+")")
    delay += change
    delay = Math.max(delay, 0)
    document.getElementById("delay").textContent = "Delay per update: " + delay
}

// function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
// }

