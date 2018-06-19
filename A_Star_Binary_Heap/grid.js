class Cell {
	
	constructor(x, y){

		this.x = x
		this.y = y

		this.g = 0
		this.h 
		this.f 

		this.parent = null
		this.neighbours = []
		this.diagonalNeigh = []

		this.valid = true

		if (random(1) < 0.3) this.valid = false

		this.color = color(52, 73, 94)
		// this.special = false
		
		return this
	}

	setNeighbour(neighbour) {

		if (neighbour instanceof Cell) this.neighbours.push(neighbour)
		return this

	}

	setDiagonalNeighbour(neighbour) {

		if (neighbour instanceof Cell) this.diagonalNeigh.push(neighbour)
		return this

	}

	resetNeighbours() {
		this.neighbours = []
		this.diagonalNeigh = []
		return this
	}

	resetParent() {
		this.parent = null
		return this
	}

}

function drawGrid(path) {

	const spaceBetSquareCol = width / grid[0].length
	const spaceBetSquareRow = height / grid.length

	push()

	stroke(120)
    strokeWeight(1)

	for (let i = 0; i < grid.length; i++) {

		const distRow = i * spaceBetSquareRow

		for (let j = 0; j < grid[0].length; j++) {

			const distCol = j * spaceBetSquareCol

			if (grid[i][j].valid) fill(grid[i][j].color)
			else fill(0)

			rect(distCol, distRow, spaceBetSquareCol, spaceBetSquareRow)

		}

	}

	fill(142, 68, 173)

	for (let cell of path) {

		rect(cell.x*spaceBetSquareCol, cell.y*spaceBetSquareRow, spaceBetSquareCol, spaceBetSquareRow)

	}
	pop()

}

function findNeighbours(grid, useDiagonals) {

	const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]] //All possible directions of neighbours
	const diagonals = [[-1, -1], [1, 1], [-1, 1], [1, -1]]
	// Path finder is not allowed to go diagonal if any of the adjacent cells
	// of the diagonal is a wall. 
	// The following arrays are the cells that have
	// to be checked for each diagonal, in order of the diagonals variable, f.e.:
	// diagonal [-1,-1] has to check if [-1,0] and [0,-1] are valid
	const diagonalsRequirements = [[[-1, 0], [0, -1]],
								   [[ 0, 1], [1,  0]],
								   [[-1, 0], [0,  1]],
								   [[ 1, 0], [0, -1]]]

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) { //Loop every cell

			grid[i][j].resetNeighbours()

			for (let direction of directions) {

				const xPos = direction[0]+i //x position of neighbour
				const yPos = direction[1]+j //y position of neighbour

				if (xPos >= 0 && xPos < grid.length    &&
					yPos >= 0 && yPos < grid[0].length &&
					grid[xPos][yPos].valid) { //Check for boundaries

					grid[i][j].setNeighbour(grid[xPos][yPos])

				}
			}

			if (useDiagonals) {

				for (let i = 0; i < diagonals.length; i++) {

					let diagonal = diagonals[i]

					const xPos = diagonal[0]+i //x position of neighbour
					const yPos = diagonal[1]+j //y position of neighbour

					//If the cells adjacent to the diagonal neighbour arent
					//valid, this is not a valid neighbour
					if(!diagonalsRequirements[i][0].valid) continue
					if(!diagonalsRequirements[i][1].valid) continue

					if (xPos >= 0 && xPos < grid.length    &&
						yPos >= 0 && yPos < grid[0].length &&
						grid[xPos][yPos].valid) { //Check for boundaries


						grid[i][j].setNeighbour(grid[xPos][yPos])

					}

				}
			}
		}
	}

}

function cost(fromNode, toNode) {


}