import $ from "jquery";

const Form = {
  init() {
  },

  // return false to stop submission, or true to let it through
  validate() {
    console.log("vali val");
    return true;
  },
};

// bind to the window so the validator can be accesesd by the form onsubmit
window.Form = Form;

export default Form;
