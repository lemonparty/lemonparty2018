import $ from "jquery";

const REQUIRED_FIELDS = [
  "name",
  "is_going",
];

const BACKEND_ERROR = "Shit, something went wrong saving the rsvp; I guess just email us your response.";
const VALIDATION_ERROR = "There was a problem submitting your rsvp… did you fill everything out?";

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

  /*
   * Post a form, or show an error. Whichever. Depends.
   */
  handleFormSubmission() {
    const url = this.form.attr("action");
    const formArray = this.form.serializeArray();
    const data = {};

    formArray.forEach((field) => {
      data[field.name] = field.value;
    });

    this.hideMessages();

    // validate
    const formIsValid = this.validate(data);

    // show and hide the appropriate statuses
    if (formIsValid) {
      $.post(url, {
        data,
      }).then((res) => {
        if (res.success) {
          this.showSuccessMessage();
        } else {
          this.showErrorMessage(BACKEND_ERROR);
        }
      }).catch((err) => {
        this.showErrorMessage(BACKEND_ERROR);
      });
    } else {
      this.showErrorMessage(VALIDATION_ERROR);
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

  /*
   * Hide the submit button, and all statuses.
   */
  hideMessages() {
    this.formError.hide();
    this.formSuccess.hide();
    this.formSubmit.hide();
  },

  /*
   * Show the success state.
   */
  showSuccessMessage() {
    this.formError.hide();
    this.formSubmit.hide();
    this.formSuccess.show();
  },

  /*
   * Show the error state.
   *
   * @param {str} [message] - a message to display
   */
  showErrorMessage(message) {
    if (message) {
      this.formError.text(message);
    }

    this.formError.show();
    this.formSubmit.show();
    this.formSuccess.hide();
  },
};

// bind to the window so the validator can be accesesd by the form onsubmit
window.Form = Form;

export default Form;
