let rows = 20
let columns = 20

let grid = new Array()

function setup() {
	
	createCenteredCanvas()
	frameRate(30)

	for (let i = 0; i < rows; i++) {

		grid.push(new Array())

		for (let j = 0; j < columns; j++) {
			grid[i].push(new Cell(j, i))
		}

	}

	grid[grid.length-1][grid[0].length-1].valid = true
	findNeighbours(grid, true)

}

function draw() {
	
	background('#0e0e0e')
	drawFrame()

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