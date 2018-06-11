
class Queue {

	constructor() {
		this.elements = []
		return this
	}

	empty() {
		return (this.elements.length > 0) ? false : true
	}

	put(x) {
		this.elements.push(x)
		return this
	}

	get() {
		return this.elements.shift() //Returns the first element of the array and removes it
	}

}