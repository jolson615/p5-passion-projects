var socket

function setup() {
  createCanvas(1000, 600)
  colorMode(HSB, 360, 100, 100)
  background(220, 0, 90)
  socket = io()
  console.log(socket)
  socket.on('mouse', newDrawing)
  socket.on('loadPage', addData)
  socket.on('balls', handleDots)
  myColor = random(360)
  myObjects = []
  dots = []
}

function handleDots(newDots) {
  dots = []
  newDots.forEach(dot => {
    newDot = new bouncyBall()
    newDot.x = dot.x
    newDot.y = dot.y
    newDot.r = dot.r
    newDot.maxR = dot.maxR
    newDot.minR = dot.minR
    newDot.color = dot.color
    newDot.masterXvelocity = dot.masterXvelocity
    newDot.masterYvelocity = dot.masterYvelocity
    newDot.xVelocity = dot.xVelocity
    newDot.yVelocity = dot.yVelocity
    dots.push(newDot)
  })
}

function addData(objects) {
  console.log("being erased")
  myObjects = []
  objects.forEach(object => {
    myObjects.push(object)
  })
}

function keyPressed() {
  if (keyCode === 32) {
    myObjects = []
    socket.emit('erase', myObjects)
  } else if (keyCode === 83) {
    console.log('sending dots')
    socket.emit('balls', dots)
  } else if (keyCode === 67) {
    dots = []
    for (i = 0; i < 100; i++) {
      dots.push(new bouncyBall())
    }
  }
  console.log("Pressed")
}

function newDrawing(data) {
  myObjects.push(data)
}

function draw() {
  noStroke()
  background(220, 0, 90)
  myObjects.forEach(data => {
    fill(data.color, 50, 50)
    ellipse(data.x, data.y, 36)
  })
  dots.forEach( dot => {
    dot.move()
    dot.display()
  })
}

function mouseDragged() {
  fill(myColor, 50, 50)
  ellipse(mouseX, mouseY, 50)
  var data = {
    x: mouseX,
    y: mouseY,
    color: myColor
  }
  myObjects.push(data)
  socket.emit('mouse', data)
}

class bouncyBall {
  constructor() {
    this.x = random(width)
    this.y = random(height)
    this.r = random(5,12)
    this.maxR = 20
    this.minR = 5
    this.color = random(360)
    this.masterXvelocity = random(0.5, 3)
    this.masterYvelocity = random(0.5, 3)
    this.xVelocity = this.masterXvelocity
    this.yVelocity = this.masterYvelocity
    if (random(-1, 1) > 0) {
      this.xVelocity = this.xVelocity * -1
    }
    if (random(-1, 1) > 0) {
      this.yVelocity = this.yVelocity * -1
    }
  }

  move() {
    this.x += this.xVelocity
    this.y += this.yVelocity
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity
    }
  }

  display() {
    this.color = (this.color + random(0, 1.2)) % 360
    fill(this.color, 80, 70)
    noStroke()
    ellipse(this.x, this.y, this.r * 2)
  }

}
