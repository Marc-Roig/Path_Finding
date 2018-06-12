let rows = 10
let columns = 10

let grid = new Array()

function setup() {
	
	createCenteredCanvas()
	frameRate(3)
	
	// grid = Array(rows).fill().map(() => Array(columns).fill().map(() => new Cell())) //Generate grid full of Cells

	for (let i = 0; i < rows; i++) {

		grid.push(new Array())

		for (let j = 0; j < columns; j++) {
			grid[i].push(new Cell(j, i))
		}

	}

	findNeighbours(grid, false)

	breadth_first_search(grid, {x: 2, y: 2}, {x: 8, y: 8})
}

function draw() {
	
	background('#0e0e0e')
	drawFrame()

	drawGrid()

	noLoop()
	fill(255)

}

function breadth_first_search(grid, start, goal) {

	let frontier = new Queue()
	frontier.put(grid[start.x][start.y])

	grid[start.x][start.y].parent = 0
	grid[start.x][start.y].special = true

	while (!frontier.empty()) {

		const current = frontier.get()

		if (current.x == goal.x && current.y == goal.y) {

			current.special = true
			break
		}

		for (let next of current.neighbours) {
			if (next.parent == null && next.valid) {
				frontier.put(next)
				next.parent = current
			}
		}

	}


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
		breadth_first_search(grid, {x: 2, y: 2}, {x: 8, y: 8})	

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