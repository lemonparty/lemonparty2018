class Lemon {
  constructor(imageSrc) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.x = Math.random();
    this.y = Math.random();
    this.deltaX = Math.random() / 100;
    this.deltaY = Math.random() / 100;
  }

  move() {
    if (this.x > 1 || this.x < 0) {
      this.deltaX *= -1;
    }

    if (this.y > 1 || this.y < 0) {
      this.deltaY *= -1;
    }

    this.x += this.deltaX;
    this.y += this.deltaY;
  }
}

export default Lemon;
