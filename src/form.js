import $ from "jquery";

const REQUIRED_FIELDS = [
  "name",
  "is_going",
];

const Form = {
  init() {
    this.form = $("#rsvp-form");
    this.formError = $(".body-rsvp-error");
    this.formSubmit = $(".body-rsvp-submit");
    this.formSuccess = $(".body-rsvp-success");

    this.form.on("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmission();
    });
  },

  handleFormSubmission() {
    console.log("on subm");

    const url = this.form.attr("action");
    const formArray = this.form.serializeArray();
    const data = {};

    formArray.forEach((field) => {
      data[field.name] = field.value;
    });

    console.log(data);

    // hide all statuses
    this.formError.hide();
    this.formSuccess.hide();
    this.formSubmit.hide();

    // validate
    const formIsValid = this.validate(data);
    console.log(formIsValid);

    // show and hide the appropriate statuses
    if (formIsValid) {
      this.formError.hide();
      this.formSubmit.hide();
      this.formSuccess.show();
    } else {
      this.formError.show();
      this.formSubmit.show();
      this.formSuccess.hide();
    }
  },

  /**
   * Validate the form, finding any input with a `name` starting with `entry`
   * (which is how google forms handles their inputs) and ensuring that it is
   * filled out.
   *
   * @param {object} data - the form data to validate
   * @return {bool} - true if valid, false if not
   */
  validate(data) {
    let isValid = true;

    REQUIRED_FIELDS.forEach((field) => {
      if (!data[field] || data[field] === "") {
        isValid = false;
      }
    });

    return isValid;
  },
};

// bind to the window so the validator can be accesesd by the form onsubmit
window.Form = Form;

export default Form;
