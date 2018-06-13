
function drawArrow(stemWidth, stemHeight, triangleHeight, triangleWidth, orientation, x, y) {

	push()
	translate(x,y)
	rotate(radians(orientation))
	translate(0, (stemHeight+triangleHeight)/2)

	beginShape()
	stroke(99, 110, 114)
	fill(45, 52, 54, 70)

	vertex(-stemWidth, 0)
	vertex(stemWidth, 0)
	vertex(stemWidth, -stemHeight)
	vertex(triangleWidth/2, -stemHeight)
	vertex(0, -triangleHeight-stemHeight)
	vertex(-triangleWidth/2, -stemHeight)
	vertex(-stemWidth, -stemHeight)
	endShape(CLOSE)

	pop()

}

function drawSimpleArrow(sizeW, sizeH, orientation, x, y) {

	sizeW /= 2
	sizeH /= 2

	push()

	stroke(70)
	strokeWeight(2)

	translate(x, y)
	rotate(radians(orientation))

	line(-sizeW, sizeH, 0, -sizeH)
	line(0, -sizeH, sizeW, sizeH)

	pop()

}