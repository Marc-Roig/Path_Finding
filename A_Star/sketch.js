let rows = 10
let columns = 10

let grid = new Array()

let pathFinder

function setup() {
	
	createCenteredCanvas()
	frameRate(15)
	
	// grid = Array(rows).fill().map(() => Array(columns).fill().map(() => new Cell())) //Generate grid full of Cells

	for (let i = 0; i < rows; i++) {

		grid.push(new Array())

		for (let j = 0; j < columns; j++) {
			grid[i].push(new Cell(j, i))
		}

	}

	findNeighbours(grid, false)

	// breadth_first_search(grid, {x: 2, y: 2}, {x: 8, y: 8})
	pathFinder = new AStarPathFinder(grid, grid[0][0], grid[9][9], false)
}

function draw() {
	
	background('#0e0e0e')
	drawFrame()

	if (!pathFinder.finished) pathFinder.step()

	drawGrid()

	// noLoop()
	fill(255)

}

function mousePressed() {

	if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
		let col = Math.floor(mouseX/width * grid[0].length)
		let row = Math.floor(mouseY/height * grid.length)

		grid[row][col].valid = !grid[row][col].valid

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[0].length; j++ ){
				grid[i][j].resetParent()
			}
		}

	}


}

function windowResized() {
  createCenteredCanvas()
}


function createCenteredCanvas() {

  const size =
    (windowWidth <= 540 || windowHeight <= 630) +
    (windowWidth <= 960 || windowHeight <= 800)
  const dim = [600, 450, 300][size]
  createCanvas(dim, dim).position(
    (windowWidth - width) / 2,
    (windowHeight - height) / 2
  )

}

function drawFrame() {

    push()
    stroke(100)
    strokeWeight(3)
    line(0, 0, width, 0)
    line(0, 0, 0, height)
    // line(width/2, 0, width/2, height)
    line(width-1, height-1, width-1, 0)
    line(width-1, height-1, 0, height-1)
    pop()

}