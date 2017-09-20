import Lemon from "./lemon";

const LEMON_SRCS = ["./images/place-lemon.png", "./images/date-lemon.png"];
const FRAMES_PER_SECOND = 16;

export default {
  lemons: [],

  init() {
    this.canvas = document.getElementById("lemon-canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.createLemons();
    this.startAnimation();
  },

  createLemons() {
    LEMON_SRCS.forEach((src) => {
      this.lemons.push(new Lemon(src));
    });
  },

  startAnimation() {
    setInterval(this.renderFrame.bind(this), FRAMES_PER_SECOND);
  },

  renderFrame() {
    this.clearCanvas();

    this.lemons.forEach((lemon) => {
      lemon.move();
      this.draw(lemon);
    });
  },

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  draw(lemon) {
    const x = lemon.x * (this.canvas.width - lemon.imageWidth);
    const y = lemon.y * (this.canvas.height - lemon.imageHeight);
    let width = lemon.imageWidth;
    let height = lemon.imageHeight;
    const smallScreenMultiplier = 0.55;

    if (this.canvas.width < 700) {
      width = width * smallScreenMultiplier;
      height = height * smallScreenMultiplier;
    }

    this.context.drawImage(lemon.image, x, y, width, height);
  },
};
