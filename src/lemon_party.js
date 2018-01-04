import Lemon from "./lemon";

const FRAMES_PER_SECOND = 16;
const IMAGE_SRCS = [
  "./static/images/place-lemon.png",
  "./static/images/date-lemon.png"
];

// Must be ordered smallest to largest
const SCALING_FACTORS = [
  [300, 0.5],
  [450, 0.6],
  [600, 0.7],
  [900, 0.8],
  [1200, 0.9],
];

export default {
  lemons: [],

  init() {
    this.canvas = document.getElementById("lemon-canvas");

    if (!this.canvas) {
      return;
    }

    this.context = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.createLemons();
    this.startAnimation();
  },

  createLemons() {
    IMAGE_SRCS.forEach((src) => {
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
    const [width, height] = this.getScaledDimensions(lemon);
    const x = lemon.x * (this.canvas.width - width);
    const y = lemon.y * (this.canvas.height - height);

    this.context.drawImage(lemon.image, x, y, width, height);
  },

  getScaledDimensions(lemon) {
    const factor = this.getScalingFactor(lemon);
    return [lemon.imageWidth * factor, lemon.imageHeight * factor];
  },

  getScalingFactor(lemon) {
    for (let [size, factor] of SCALING_FACTORS) {
      if (this.canvas.width < size) {
        return factor;
      }
    }

    return 1;
  },
};
