let rows = 20
let columns = 20

let grid = new Array()

let pathFinder

function setup() {
	
	createCenteredCanvas()
	frameRate(30)
	
	// grid = Array(rows).fill().map(() => Array(columns).fill().map(() => new Cell())) //Generate grid full of Cells

	for (let i = 0; i < rows; i++) {

		grid.push(new Array())

		for (let j = 0; j < columns; j++) {
			grid[i].push(new Cell(j, i))
		}

	}

	grid[grid.length-1][grid[0].length-1].valid = true
	findNeighbours(grid, true)

	// breadth_first_search(grid, {x: 2, y: 2}, {x: 8, y: 8})
	pathFinder = new AStarPathFinder(grid, grid[0][0], grid[grid.length-1][grid[0].length-1])
}

function draw() {
	
	background('#0e0e0e')
	drawFrame()

	if (!pathFinder.finished) pathFinder.step()

	drawGrid(calcPath(pathFinder.lastCheckedNode))

	// noLoop()
	// fill(255)

}

function mousePressed() {

	// if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
	// 	let col = Math.floor(mouseX/width * grid[0].length)
	// 	let row = Math.floor(mouseY/height * grid.length)

	// 	grid[row][col].valid = !grid[row][col].valid

	// 	for (let i = 0; i < grid.length; i++) {
	// 		for (let j = 0; j < grid[0].length; j++ ){
	// 			grid[i][j].resetParent()
	// 		}
	// 	}

	// }


}

function calcPath(endNode) {

    // Find the path by working backwards
    path = [];
    var temp = endNode;
    path.push(temp);
    while (temp.parent != null) {
        path.push(temp.parent);
        temp = temp.parent;
    }

    return path
}

// function drawPath(path) {
//     // Drawing path as continuous line
//     noFill();
//     stroke(255, 0, 200);
//     strokeWeight(gamemap.w / gamemap.cols / 2);
//     beginShape();
//     for (var i = 0; i < path.length; i++) {
//         vertex(path[i].x + path[i].width / 2, path[i].y + path[i].height / 2);
//     }
//     endShape();
// }

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