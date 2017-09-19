export default {
  SCREEN_WIDTH: window.innerWidth,
  SCREEN_HEIGHT: window.innerHeight,
  LEMON_WIDTH: 249,
  LEMON_HEIGHT: 180,
  DELTA_X: 3,
  DELTA_Y: 4,

  init() {
    this.CANVAS = document.getElementById("lemon-canvas");
    this.CONTEXT = this.CANVAS.getContext("2d");

    // make the canvas full screen
    this.CANVAS.width = this.SCREEN_WIDTH;
    this.CANVAS.height = this.SCREEN_HEIGHT;

    this.loadImage();
  },

  startInterval() {
    let currentX = 100;
    let currentY = 200;

    setInterval(() => {
      this.CONTEXT.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
      this.draw(currentX, currentY);

      // flip the deltas if we get out of range
      if (
        currentX + this.LEMON_WIDTH > this.SCREEN_WIDTH ||
        currentX < 0
      ) {
        this.DELTA_X = this.DELTA_X * -1;
      }

      if (
        currentY + this.LEMON_HEIGHT > this.SCREEN_HEIGHT ||
        currentY < 0
      ) {
        this.DELTA_Y = this.DELTA_Y * -1;
      }

      currentX += this.DELTA_X;
      currentY += this.DELTA_Y;
    }, 16);
  },

  loadImage() {
    this.LEMON = new Image();

    this.LEMON.onload = () => {
      this.startInterval();
    };

    this.LEMON.src = "./images/lemon-test.png";
  },

  draw(x, y) {
    this.CONTEXT.drawImage(this.LEMON, x, y);
  },
};
