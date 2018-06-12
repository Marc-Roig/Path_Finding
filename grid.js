class Cell {
	
	constructor(x, y){

		this.x = x
		this.y = y

		this.parent = null
		this.neighbours = []
		this.diagonalNeigh = []

		this.valid = true
		this.special = false
		
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
			
			if(grid[i][j].special) fill(39, 174, 96)

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

function findNeighbours(grid, useDiagonals) {

	const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]] //All possible directions of neighbours
	const diagonals = [[-1, -1], [1, 1], [-1, 1], [1, -1]]

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) { //Loop every cell

			grid[i][j].resetNeighbours()

			for (let direction of directions) {

				const xPos = direction[0]+i //x position of neighbour
				const yPos = direction[1]+j //y position of neighbour

				if (xPos >= 0 && xPos < grid.length    &&
					yPos >= 0 && yPos < grid[0].length) { //Check for boundaries

					grid[i][j].setNeighbour(grid[xPos][yPos])

				}
			}

			if (useDiagonals) {

				for (let diagonal of diagonals) {

					const xPos = diagonal[0]+i //x position of neighbour
					const yPos = diagonal[1]+j //y position of neighbour

					if (xPos >= 0 && xPos < grid.length    &&
						yPos >= 0 && yPos < grid[0].length) { //Check for boundaries

						grid[i][j].setDiagonalNeighbour(grid[xPos][yPos])

					}

				}
			}
		}
	}

}

function cost(fromNode, toNode) {


}