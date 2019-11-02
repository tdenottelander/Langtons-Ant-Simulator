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
    // frameRate(500)
    framerateElement.textContent = Math.round(getFrameRate()) + "fps"
    // background(50, 0, 0)
    antwalk.draw() 
}

function move(){
    antwalk.moveAnt()
}

function pause(){
    antwalk.paused = !antwalk.paused
}



