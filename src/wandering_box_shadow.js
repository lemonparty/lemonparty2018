import $ from "jquery";

const MAX = 20;
const MAX_JUMP = 3;

// these must match the values in src/pages/rsvp.scss
const INITIAL_X = -12;
const INITIAL_Y = -16;
const BOX_SHADOW_COLOR = "#c08040";
const SPEED = 500;

class WanderingBoxShadow {
  constructor(el) {
    this.el = el;
    this.x = INITIAL_X;
    this.y = INITIAL_Y;

    setInterval(() => {
      this.x = this.getNumberNear(this.x);
      this.y = this.getNumberNear(this.y);
      this.setBoxShadow(this.el, this.x, this.y);
    }, SPEED);
  }

  /*
   * Get a number nearby another, controlled by the constants above.
   * our desired delta is +/- MAX_JUMP, so MAX_JUMP * 2 / MAX_JUMP.
   * e.g., a jump of 3 would result in a range of -3 to +3 plus the input.
   *
   * @param {int} number - the number to be near
   * @return {int} - the new, nearby number
  */
  getNumberNear(number) {
    const jump = Math.round(Math.random() * MAX_JUMP * 2) - MAX_JUMP;

    if (number + jump > MAX || number + jump < MAX * -1) {
      return number - jump;
    } else {
      return number + jump;
    }
  }

  /*
   * Set the box shadow on an element.
   *
   * @param {jQuery element} el - the element on which to set a shadow
   * @param {int} x - the x offset of the shadow
   * @param {int} y - the y offset of the shadow
   * @return {jQuery element} - the element on which a shadow was set
   */
  setBoxShadow(el, x, y) {
    el.css("box-shadow", `${x}px ${y}px 0 ${BOX_SHADOW_COLOR}`);

    return el;
  }
}

export default WanderingBoxShadow;
