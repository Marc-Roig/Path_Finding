class Cell {
	
	constructor(x, y){

		this.x = x
		this.y = y

		this.parent = null
		this.neighbours = []
		this.diagonalNeigh = []

		this.valid = true
		
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