function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB, 360, 100, 100)
  bugs = []
  for (i = 0; i < 1000; i++) {
    bugs.push(new Bug())
  }
  frameRate(4)
}

function draw() {
  background(220)
  bugs.forEach(bug => {
    bug.display()
    bug.step()
  })
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
]

const getRandomDirection = () => {
  return directions[int(random(0, 4))]
}

class Bug {
  constructor() {
    this.x = int(random(width)/10) * 10
    this.y = int(random(height)/10) * 10
    this.size = 10
    this.direction = getRandomDirection()
    this.hue = 120
  }

  display() {
    fill(this.hue, 50, 100)
    rect(this.x, this.y, this.size, this.size)
  }

  move() {
    if (random(100) < 5) {
      this.direction = getRandomDirection()
      this.hue += 20
      this.hue = this.hue % 360
    }
    this.x += this.direction.x
    this.y += this.direction.y
  }

  step() {
    if (random(100) < 20) {
      this.direction = getRandomDirection()
      this.hue += 20
      this.hue = this.hue % 360
    }
    this.x += this.direction.x * this.size
    this.y += this.direction.y * this.size
  }
}
