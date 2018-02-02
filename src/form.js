import $ from "jquery";

const Form = {
  init() {
    this.form = $("#rsvp-form");
    this.formError = $(".body-rsvp-error");
    this.formSubmit = $(".body-rsvp-submit");
    this.formSuccess = $(".body-rsvp-success");
  },

  /**
   * Validate the form, finding any input with a `name` starting with `entry`
   * (which is how google forms handles their inputs) and ensuring that it is
   * filled out.
   *
   * @return {bool} - true if valid, false if not
   */
  validate() {
    // hide all statuses
    this.formError.hide();
    this.formSuccess.hide();
    this.formSubmit.hide();

    const formData = this.form.serializeArray();
    let isValid = true;

    formData.forEach((field) => {
      if (field.name.indexOf("entry") != 0) {
        return;
      }

      if (!field.value || field.value === "") {
        isValid = false;
      }
    });

    // show and hide the appropriate statuses
    if (isValid) {
      this.formError.hide();
      this.formSubmit.hide();
      this.formSuccess.show();
    } else {
      this.formError.show();
      this.formSubmit.show();
      this.formSuccess.hide();
    }

    return isValid;
  },
};

// bind to the window so the validator can be accesesd by the form onsubmit
window.Form = Form;

export default Form;
