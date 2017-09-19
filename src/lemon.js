class Lemon {
  constructor(imageSrc) {
    this.x = Math.random();
    this.y = Math.random();
    this.deltaX = Math.random() / 100;
    this.deltaY = Math.random() / 100;
    this.loadImage(imageSrc);
  }

  loadImage(imageSrc) {
    this.image = new Image();
    this.image.onload = () => {
      this.imageWidth = this.image.width;
      this.imageHeight = this.image.height;
    };
    this.image.src = imageSrc;
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
