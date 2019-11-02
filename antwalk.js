class Antwalk {

    speed = 1;
    actionsPerDraw = 8;
    counter = 0;
    initDraw = false
    paused = false
    counterElement;

    constructor(gridX, gridY, width, height){
        this.grid = []
        this.gridX = gridX
        this.gridY = gridY
        this.size = width / gridX

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
        if(!this.initDraw){
            this.drawGrid()
            this.initDraw = true
        }

        if(!this.paused){
            for(let i = 0; i < this.actionsPerDraw; i++){
                this.counter += 1
                if(this.counter > this.speed){
                    this.moveAnt()
                    this.drawPreviousSquare()
                    this.drawCurrentSquare()
                }
                this.counterElement.textContent = "Counter: " + this.counter
            }
        }
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
        this.grid[x][y] == 1 ? fill(20,20,20) : fill(255)
        rect(x * this.size, y * this.size, this.size, this.size)
    }

    drawAnt(){
        strokeWeight(0)
        fill("red")
        circle((this.x + 0.5) * this.size, (this.y + 0.5) * this.size, this.size * 0.1)
    }

    setSquareDrawingMode(){
        strokeWeight(0.1)
        stroke(200)
    }

    moveAnt(){
        if(this.grid[this.x][this.y] == 0){
            this.dir = (this.dir + 1) % 4
        } else {
            this.dir = (this.dir + 3) % 4
        }

        this.grid[this.x][this.y] = 1 - this.grid[this.x][this.y]
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
            this.enlargeGrid()
            clear()
            this.drawGrid()
        }
    }

    enlargeGrid(){
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