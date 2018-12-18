function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB, 360, 100, 100)
  bugs = []
  for (i = 0; i < 10; i++) {
    bugs.push(new Bug())
  }
  frameRate(20)
}

function draw() {
  background(220)
  bugs.forEach(bug => {
    bug.display()
    bug.step()
  })
}

function mousePressed() {
  for (i = 0; i < 10; i++) {
    bugs.push(new Bug(mouseX, mouseY))
  }
}

const directions = [
  {
    name: "left",
    x: -1,
    y: 0
  },
  {
    name: "right",
    x: 1,
    y: 0
  },
  {
    name: "up",
    x: 0,
    y: -1
  },
  {
    name: "down",
    x: 0,
    y: 1
  },
  {
    name: 'still',
    x: 0,
    y: 0
  }
]

const getRandomDirection = () => {
  return directions[int(random(0, directions.length))]
}

class Bug {
  constructor(x = -1, y = -1) {
    this.size = 10
    this.x = (x == -1) ? int(random(width)/this.size) * this.size : int(x/this.size) * this.size
    this.y = (y == -1) ? int(random(width)/this.size) * this.size : int(y/this.size) * this.size
    this.direction = getRandomDirection()
    this.hue = 120
  }

  display() {
    fill(this.hue, 50, 100)
    rect(this.x, this.y, this.size, this.size)
  }

  move() {
    // Change direction 5% of the time
    if (random(100) < 5) {
      this.direction = getRandomDirection()
      this.hue += 20
      this.hue = this.hue % 360
    }

    this.x += this.direction.x
    this.y += this.direction.y
  }

  step() {
    // Change direction if on the edge and moving further out
    if (random(100) < 20) {
      this.direction = getRandomDirection()
      this.hue += 20
      this.hue = this.hue % 360
    }
    this.handleEdges()
    this.x += this.direction.x * this.size
    this.y += this.direction.y * this.size
  }

  handleEdges() {
    // Change direction if on the edge and moving further out
    if (this.x < 0 && this.direction.name == 'left') {
      this.direction = getRandomDirection()
    } else if (this.y < 0 && this.direction.name == 'up') {
      this.direction = getRandomDirection()
    } else if (this.x > width && this.direction.name == 'right') {
      this.direction = getRandomDirection()
    } else if (this.y > height && this.direction.name == 'down') {
      this.direction = getRandomDirection()
    } else {
      return
    }
  }
}
