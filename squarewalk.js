class Squarewalk {

    actionsPerDraw = 1;
    counter = 0;
    initDraw = false
    paused = true
    counterElement;
    enlargeCounter = 0
    antcolor = 'yellow'

    constructor(gridX, gridY, width, pattern){
        this.grid = []
        this.gridX = gridX
        this.gridY = gridY
        this.size = width / gridX
        this.pattern = pattern.split('')

        for(let x = 0; x < this.gridX; x++){
            let column = []
            for(let y = 0; y < this.gridY; y++){
                column.push(0)
            }
            this.grid.push(column)
        }

        this.x = this.gridX/2
        this.y = this.gridY/2
        this.prevX = this.x
        this.prevY = this.y
        this.dir = 0

        if(this.counterElement == null){
            this.counterElement = document.getElementById("counter")
        }
    }

    draw(){
        this.color_from = color(20,20,20)
        this.color_to = color(255,40,40)

        if(!this.initDraw){
            this.drawGrid()
            this.initDraw = true
        }

        if(!this.paused){
            for(let i = 0; i < this.actionsPerDraw; i++){
                this.move()
            }
        }
    }

    move(){
        this.moveAnt()
        this.drawPreviousSquare()
        this.drawCurrentSquare()
        this.counter += 1
        this.counterElement.textContent = "Counter: " + this.counter
    }

    drawGrid(){
        this.setSquareDrawingMode()
        for(let x = 0; x < this.gridX; x++){
            for(let y = 0; y < this.gridY; y++){
                this.drawSquare(x, y)
            }
        }
        this.drawAnt()
    }

    drawPreviousSquare(){
        this.setSquareDrawingMode()
        this.drawSquare(this.prevX, this.prevY)
    }

    drawCurrentSquare(){
        this.setSquareDrawingMode()
        this.drawSquare(this.x, this.y)
        this.drawAnt()
    }

    drawSquare(x, y){
        let color = lerpColor(this.color_from, this.color_to, this.grid[x][y] / this.pattern.length )
        fill(color)
        rect(x * this.size, y * this.size, this.size, this.size)
    }

    drawAnt(){
        strokeWeight(0)
        fill(this.antcolor)
        circle((this.x + 0.5) * this.size, (this.y + 0.5) * this.size, this.size * 0.8)
    }

    setSquareDrawingMode(){
        strokeWeight(0.01 * this.size)
        stroke(200)
    }

    moveAnt(){
        for(let i = 0; i < this.pattern.length; i++){
            if(this.grid[this.x][this.y] == i){
                let change = this.pattern[i] == 'L' ? 3 : 1
                this.dir = (this.dir + change) % 4
                break;
            }
        }

        this.grid[this.x][this.y] = (this.grid[this.x][this.y] + 1) % this.pattern.length
        // console.log("X=" + this.x + "  Y=" + this.y + "  dir=" + this.dir)

        this.prevX = this.x
        this.prevY = this.y

        switch(this.dir){
            case 0:
                this.x += 1;
                break;
            case 1:
                this.y += 1;
                break;
            case 2:
                this.x += -1;
                break;
            case 3:
                this.y += -1;
                break;
        }

        if(!this.isInBounds(this.x, this.y)){
            console.log("Enlarge on counter " + this.counter + " with x=" + this.x + ",y=" + this.y)
            if(this.enlargeCounter < 5){
                this.enlargeGrid()
                clear()
                this.drawGrid()
            } else {
                this.paused = true
                document.getElementById("enlargewarning").style.display = "initial"
            }
        }
    }

    enlargeGrid(){
        this.enlargeCounter++
        let newGridX = this.gridX * 2
        let newGridY = this.gridY * 2

        let newGrid = []
        for(let x = 0; x < newGridX; x++){
            let column = []
            for(let y = 0; y < newGridY; y++){
                column.push(0)
            }
            newGrid.push(column)
        }

        let offset = Math.round(newGridX / 4)

        for(let x = 0; x < this.gridX; x++){
            for(let y = 0; y < this.gridY; y++){
                newGrid[x + offset][y + offset] = this.grid[x][y]
            }
        }

        this.gridX = newGridX
        this.gridY = newGridY
        this.size = 0.5 * this.size
        this.grid = newGrid

        this.x += offset
        this.y += offset
    }

    isInBounds(x, y){
        return (x >= 0 && x < this.gridX && y >= 0 && y < this.gridY)
    }

}