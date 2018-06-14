function AStarPathFinder(grid, start, goal) {

	this.grid = grid

	this.frontier = []
	this.frontier.push(start)

	this.closedSet = [] 
	this.start = start
	this.goal = goal

	this.lastCheckedNode = grid[start.x][start.y]

	this.finished = false
	this.blockedPath = false

	this.closedSetClr = color(231, 76, 60)
	this.frontierClr = color(230, 126, 34)

	//An educated guess of how far it is between two points
	this.heuristic = function(a, b) {
		
		return dist(a.x, a.y, b.x, b.y)

	}

	this.removeFromArray = function(arr, elm) {

		arr = arr.filter(e => e != elm)

	}

	this.step = function() {

		if (this.frontier.length > 0) {

			//Find the best cell in the frontier (openSet)
			let bestFit = 0 //Supose the first is the best one at the start

			for (let i = 0; i < this.frontier.length; i++) {

				if (this.frontier[i].f < this.frontier[bestFit].f) bestFit = i

				if (this.frontier[i].f == this.frontier[bestFit].f) {

					//Chose the largest path
					if (this.frontier[i].g > this.frontier[bestFit].g) bestFit = i

				}
			}

			let current = this.frontier[bestFit]

			this.lastCheckedNode = current

			this.frontier = this.frontier.filter(x => x != current) //Remove current from frontier
			this.closedSet.push(current)
			// current.color = this.closedSetClr

			if (current == this.goal) {

				this.finished = true
				return

			}


			for (let neighbour of current.neighbours) {

				if (!this.closedSet.includes(neighbour)) {

					let tempG = current.g + this.heuristic(neighbour, current)

					//Is this a better path?
					if (!this.frontier.includes(neighbour)) {

						this.frontier.push(neighbour)
						// neighbour.color = this.frontierClr //To show on canvas

					} else if (tempG >= neighbour.g) {
						continue
					}

					neighbour.g = tempG
					neighbour.h = this.heuristic(neighbour, this.goal)

					neighbour.f = neighbour.g + neighbour.h
					neighbour.parent = current

				}
			}

		} else {

			this.blockedPath = true
			console.log("blocked path!!")
		}

	}
}