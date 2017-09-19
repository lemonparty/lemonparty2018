const COLORS = [
  ["deeppink", "deepskyblue"],
  ["turquoise", "orangered"],
  ["springgreen", "yellow"],
  ["red", "aqua"],
  ["chartreuse", "magenta"],
  ["darkviolet", "orange"],

  // the set that is defined in the css goes last
  ["yellow", "chartreuse"],
];

export default {
  i: 0,

  init() {
    setInterval(() => {
      const currentIndex = this.i % COLORS.length;
      const [background, color] = COLORS[currentIndex];

      document.body.style.background = background;
      document.body.style.color = color;

      this.i++;
    }, 1000);
  },
}
