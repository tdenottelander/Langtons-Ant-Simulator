class Squaredrawer{

    constructor(size, levels){
        this.color_from = color(20,20,20)
        this.color_to = color(255,40,40)
        this.antcolor = 'yellow'
        this.levels = levels
        this.size = size
    }

    redraw(grid, antX, antY){
        clear()
        this.drawGrid(grid, antX, antY)
    }

    drawGrid(grid, antX, antY){
        this.setShapeDrawingMode()
        for(let x = 0; x < grid.length; x++){
            for(let y = 0; y < grid[0].length; y++){
                this.drawShape(x, y, grid[x][y])
            }
        }
        this.drawAnt(antX, antY)
    }

    drawShape(x, y, level){
        let color = lerpColor(this.color_from, this.color_to, level / this.levels)
        fill(color)
        this.setShapeDrawingMode()
        rect(x * this.size, y * this.size, this.size, this.size)
    }

    drawPrevShape(x, y, level){
        this.setShapeDrawingMode()
        this.drawShape(x, y, level)
    }

    drawCurrShape(x, y, level){
        this.setShapeDrawingMode()
        this.drawShape(x, y, level)
        this.drawAnt(x, y)
    }

    setShapeDrawingMode(){
        strokeWeight(0.01 * this.size)
        stroke(200)
    }

    drawAnt(x, y){
        strokeWeight(0)
        fill(this.antcolor)
        circle((x + 0.5) * this.size, (y + 0.5) * this.size, this.size * 0.8)    
    }
}

class Squarewalker {

    constructor(pattern){
        this.pattern = pattern
        this.levels = pattern.length
    }

    moveAnt(grid, x, y, dir, action){
        let newDir = dir, newX = x, newY = y
        if(action == 'L'){ // Left
            newDir = (dir + 3) % 4
        } else if(action == 'R'){ // Right
            newDir = (dir + 1) % 4
        } else if(action == 'B'){ // Back
            newDir = (dir + 2) % 4
        } else if(action == 'F'){ // Forward
            newDir = dir
        }

        grid[x][y] = (grid[x][y] + 1) % this.levels

        switch(newDir){
            case 0:
                newX = x + 1
                break;
            case 1:
                newY = y + 1
                break;
            case 2:
                newX = x - 1
                break;
            case 3:
                newY = y - 1
                break;
        }

        return [newX, newY, newDir]
    }
}