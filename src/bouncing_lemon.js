import Lemon from "./lemon";

export default {
  SCREEN_WIDTH: window.innerWidth,
  SCREEN_HEIGHT: window.innerHeight,
  LEMON_WIDTH: 249,
  LEMON_HEIGHT: 180,
  LEMON_SRCS: ["./images/lemon-test.png", "./images/lemon-test.png"],
  lemons: [],

  init() {
    this.canvas = document.getElementById("lemon-canvas");
    this.context = this.canvas.getContext("2d");

    // make the canvas full screen
    this.canvas.width = this.SCREEN_WIDTH;
    this.canvas.height = this.SCREEN_HEIGHT;

    this.createLemons();
    this.startAnimation();
  },

  createLemons() {
    this.LEMON_SRCS.forEach((src) => {
      this.lemons.push(new Lemon(src));
    });
  },

  startAnimation() {
    setInterval(() => {
      this.clearCanvas();

      this.lemons.forEach((lemon) => {
        lemon.move();
        this.draw(lemon);
      });
    }, 16);
  },

  clearCanvas() {
    this.context.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
  },

  draw(lemon) {
    this.context.drawImage(
      lemon.image,
      lemon.x * this.SCREEN_WIDTH,
      lemon.y * this.SCREEN_HEIGHT
    );
  },
};
