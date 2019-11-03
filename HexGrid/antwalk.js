class Antwalk {

    speed = 1;
    actionsPerDraw = 1;
    counter = 0;
    initDraw = false
    paused = true
    counterElement;
    // antcolor = '#097ae4'
    antcolor = 'yellow'

    constructor(grid, width, pattern){
        this.grid = []
        this.gridX = grid
        this.gridY = 3 * grid
        this.size = width / grid * 0.6
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
        this.color_to = color(40,240,40)
        // this.color_to = color(190,80,7)

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
        this.counter += 1
        this.moveAnt()
        this.drawPreviousSquare()
        this.drawCurrentSquare()
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

    getScreenPoint(x, y){
        let newX = y % 2 == 0 ? x + 0.4 : x + 0.9
        newX *= this.size * 1.6

        let newY = y + 1.5
        newY *= (this.size * 0.45)

        return [newX, newY]
    }

    drawSquare(x, y){
        let color = lerpColor(this.color_from, this.color_to, this.grid[x][y] / this.pattern.length )
        fill(color)
        this.setSquareDrawingMode()
        
        let coords = this.getScreenPoint(x, y)

        this.polygon(coords[0], coords[1], this.size * 0.5, 6)

        fill(100)
        strokeWeight(0)
        // text((x + "," + y), coords[0] - 10, coords[1] + 5)
        // rect(x * this.size, y * this.size, this.size, this.size)
    }

    polygon(x, y, radius, npoints) {
        let angle = TWO_PI / npoints;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius;
            let sy = y + sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    drawAnt(){
        strokeWeight(0)
        fill(this.antcolor)

        let coords = this.getScreenPoint(this.x, this.y)
        circle(coords[0], coords[1], this.size * 0.8)
    }

    setSquareDrawingMode(){
        strokeWeight(0.01 * this.size)
        stroke(200)
    }

    moveAnt(){
        for(let i = 0; i < this.pattern.length; i++){
            if(this.grid[this.x][this.y] == i){
                let change = this.pattern[i] == 'L' ? 5 : 1
                this.dir = (this.dir + change) % 6
                break;
            }
        }

        this.grid[this.x][this.y] = (this.grid[this.x][this.y] + 1) % this.pattern.length
        // console.log("X=" + this.x + "  Y=" + this.y + "  dir=" + this.dir)

        this.prevX = this.x
        this.prevY = this.y

        switch(this.dir){
            case 0:
                if (this.y % 2 == 0){
                    this.y += -1
                } else {
                    this.x += 1
                    this.y += -1
                }
                break;
            case 1:
                if(this.y % 2 == 0){
                    this.y += 1
                } else {
                    this.x += 1
                    this.y += 1
                }
                break;
            case 2:
                this.y += 2
                break;
            case 3:
                if(this.y % 2 == 0){
                    this.x += -1
                    this.y += 1
                } else {
                    this.y += 1
                }
                break;               
            case 4:
                if(this.y % 2 == 0){
                    this.x += -1
                    this.y += -1
                } else {
                    this.y += -1
                }
                break;
            case 5:
                this.y += -2
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

        let offsetX = Math.round(newGridX / 4)
        let offsetY = offsetX * 2

        for(let x = 0; x < this.gridX; x++){
            for(let y = 0; y < this.gridY; y++){
                newGrid[x + offsetX][y + offsetY] = this.grid[x][y]
            }
        }

        this.gridX = newGridX
        this.gridY = newGridY
        this.size = 0.5 * this.size
        this.grid = newGrid

        this.x += offsetX
        this.y += offsetY
    }

    isInBounds(x, y){
        return (x >= 0 && x < this.gridX && y >= 0 && y < this.gridY)
    }

}