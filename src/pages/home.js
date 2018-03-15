export default {
  init() {
    if (!document.body.classList.contains("body-home")) {
      return;
    }

    this.title = document.querySelector(".page-title");
    this.minDepth = 6;
    this.maxDepth = 30;

    // these two values should match the color and transition time in the
    // .page-title block in app.scss
    this.color = "#ff00ff";
    this.interval = 1500;

    // run immediately on init
    this.makeNewTextShadow();

    // start the interval to continue running it
    setInterval(() => {
      this.makeNewTextShadow();
    }, this.interval);
  },

  makeNewTextShadow() {
    const depth = this.getRandomNumberBetween(this.minDepth, this.maxDepth);
    this.makeTextShadow(depth);
  },

  getRandomNumberBetween(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },

  makeTextShadow(depth = 20) {
    const res = [];
    let color;

    for (let i = 1; i <= depth; i++) {
      color = this.shadeColor(this.color, i * 0.033);
      res.push(`${i * 0.5}px ${i}px 0 ${color}`);
    }

    this.title.style.textShadow = res.join(", ");
  },

  // found on this thread:
  // https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  shadeColor(color, percent) {
    const f = parseInt(color.slice(1),16);
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ? percent * -1 : percent;
    const R = f >> 16;
    const G = f >> 8&0x00FF;
    const B = f&0x0000FF;

    return "#" + (
      0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)
    ).toString(16).slice(1);
  },
};
