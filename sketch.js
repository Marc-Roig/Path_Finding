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

	// grid[3][3].valid = false

	findNeighbours(grid, false)
	grid[4][5].valid = false
	breadth_first_search(grid, {x: 2, y: 2})
}

function draw() {
	
	background('#0e0e0e')
	drawFrame()

	drawGrid()

	// noLoop()
	fill(255)

}

function drawGrid() {

	const spaceBetSquareCol = width / grid[0].length
	const spaceBetSquareRow = height / grid.length

	push()

	stroke(120)
    strokeWeight(1)

	for (let i = 0; i < grid.length; i++) {

		const distRow = i * spaceBetSquareRow

		for (let j = 0; j < grid[0].length; j++) {

			const distCol = j * spaceBetSquareCol

			if (grid[i][j].valid) fill(248, 194, 145)
			else fill(231, 76, 60)

			// drawArrow(3, 15, 15, 20, 180, distCol + spaceBetSquareCol/2, distRow - spaceBetSquareCol/2)

			rect(distCol, distRow, spaceBetSquareCol, spaceBetSquareRow)
			let current = grid[i][j]
			let parent = current.parent

			if(parent instanceof Cell && current.valid) {

				let directionX = parent.x - current.x
				let directionY = parent.y - current.y

				if (directionX < 0)      drawSimpleArrow(10, 5, -90,  spaceBetSquareCol/2 + distCol, spaceBetSquareRow/2 + distRow)
				else if (directionX > 0) drawSimpleArrow(10, 5,  90,  spaceBetSquareCol/2 + distCol, spaceBetSquareRow/2 + distRow)
				else if (directionY < 0) drawSimpleArrow(10, 5,  0,   spaceBetSquareCol/2 + distCol, spaceBetSquareRow/2 + distRow)
				else if (directionY > 0) drawSimpleArrow(10, 5,  180, spaceBetSquareCol/2 + distCol, spaceBetSquareRow/2 + distRow)

			}

		}

	}

	pop()

}

function breadth_first_search(grid, start) {

	let frontier = new Queue()
	frontier.put(grid[start.x][start.y])

	grid[start.x][start.y].parent = 0

	while (!frontier.empty()) {

		const current = frontier.get()

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
		breadth_first_search(grid, {x: 2, y: 2})	

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