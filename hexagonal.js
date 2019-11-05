class Hexdrawer{

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
        
        let coords = this.getScreenPoint(x, y)
        this.polygon(coords[0], coords[1], this.size * 0.5, 6)

        fill(100)
        strokeWeight(0)
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

    drawAnt(x, y){
        strokeWeight(0)
        fill(this.antcolor)

        let coords = this.getScreenPoint(x, y)
        circle(coords[0], coords[1], this.size * 0.6)
    }

    getScreenPoint(x, y){
        let newX = y % 2 == 0 ? x + 0.4 : x + 0.9
        newX *= this.size * 1.6

        let newY = y + 1.5
        newY *= (this.size * 0.45)

        return [newX, newY]
    }
}

class Hexwalker {

    constructor(pattern){
        this.pattern = pattern
        this.levels = pattern.length
    }

    moveAnt(grid, x, y, dir, action){
        let newDir = dir, newX = x, newY = y
        if(action == 'L'){ // Up Left
            newDir = (dir + 5) % 6
        } else if(action == 'R'){ // Up Right
            newDir = (dir + 1) % 6                    
        } else if(action == 'B'){ // Back
            newDir = (dir + 3) % 6
        } else if(action == 'Q'){ // Bottom Right
            newDir = (dir + 2) % 6
        } else if(action == 'W'){ // Bottom Left
            newDir = (dir + 4) % 6
        } else {
            newDir = dir
        }

        grid[x][y] = (grid[x][y] + 1) % this.levels

        switch(newDir){
            case 0:
                if (y % 2 == 0){
                    newY = y - 1
                } else {
                    newX = x + 1
                    newY = y - 1
                }
                break;
            case 1:
                if(y % 2 == 0){
                    newY = y + 1
                } else {
                    newX = x + 1
                    newY = y + 1
                }
                break;
            case 2:
                newY = y + 2
                break;
            case 3:
                if(y % 2 == 0){
                    newX = x - 1
                    newY = y + 1
                } else {
                    newY = y + 1
                }
                break;               
            case 4:
                if(y % 2 == 0){
                    newX = x - 1
                    newY = y - 1
                } else {
                    newY = y - 1
                }
                break;
            case 5:
                newY = y - 2
                break;
        }

        return [newX, newY, newDir]
    }
}