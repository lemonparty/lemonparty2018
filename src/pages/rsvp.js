import WanderingBoxShadow from "../wandering_box_shadow";

const REQUIRED_FIELDS = [
  "name",
  "is_going",
  "boat",
];

const BACKEND_ERROR = "Uh… something went wrong saving the rsvp; I guess just email us your response?";
const VALIDATION_ERROR = "There was a problem submitting your rsvp… did you fill everything out?";

const Rsvp = {
  init() {
    this.form = document.querySelectorAll(".body-rsvp-form")[0];
    this.formError = document.querySelectorAll(".body-rsvp-error")[0];
    this.formSubmit = document.querySelectorAll(".body-rsvp-submit")[0];
    this.formSubmitButton = document.querySelectorAll(".body-rsvp-submit-button")[0];
    this.formSuccess = document.querySelectorAll(".body-rsvp-success")[0];

    // short circuit if we don't have a form (e.g. when we're on another page)
    if (!this.form) {
      return;
    }

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmission();
    });

    new WanderingBoxShadow(this.form);
  },

  /*
   * This helper converts either an html object set OR a NodeList (used on older
   * iOS devices, roughly iOS version 8.1 and earlier) into an array for looping.
   *
   * @param {nodelist|object} nodes - a NodeList or a list of html objects
   * @returns {array} - an array
   */
  nodesToArray(nodes) {
    return [].slice.call(nodes);
  },

  /*
   * Post a form, or show an error. Whichever. Depends.
   */
  handleFormSubmission() {
    const url = this.form.getAttribute("action");
    const data = {};

    this.nodesToArray(this.form.elements).forEach((field) => {
      if (
        // only use form elements; the canary is that they have a name
        field.getAttribute("name") &&
        (
          // only get checked radios, or anything not a radio
          (field.type === "radio" && field.checked) ||
          field.type !== "radio"
        )
      ) {
        data[field.name] = field.value;
      }
    });

    // extract the csrf token from the data object
    const csrfToken = data.csrf_token;
    delete(data.csrf_token);

    this.showSavingState();

    // validate
    const formIsValid = this.validate(data);

    // show and hide the appropriate statuses; submit if valid
    if (formIsValid) {
      fetch(url, {
        method: "post",
        credentials: "include",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(data)
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      }).then((res) => {
        if (res.success) {
          this.showSuccessMessage();
        } else {
          let message = BACKEND_ERROR;

          if (res.message) {
            message = res.message;
          }

          this.showErrorMessage(message);
        }
      }).catch(() => {
        this.showErrorMessage(BACKEND_ERROR);
      });
    } else {
      this.showErrorMessage(VALIDATION_ERROR);
    }
  },

  /**
   * Validate the form.
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
   * Hide any errors and disable the button.
   */
  showSavingState() {
    this.formError.style.display = "none";
    this.formSubmitButton.disabled = "disabled";
    this.formSubmitButton.value = "Saving...";
  },

  /*
   * Enable the save button.
   */
  hideSavingState() {
    this.formSubmitButton.removeAttribute("disabled");
    this.formSubmitButton.value = "Submit";
  },

  /*
   * Show the success state.
   */
  showSuccessMessage() {
    this.formError.style.display = "none";
    this.formSubmit.style.display = "none";
    this.formSuccess.style.display = "block";
  },

  /*
   * Show the error state.
   *
   * @param {str} [message] - a message to display
   */
  showErrorMessage(message) {
    if (message) {
      this.formError.innerHTML = message;
    }

    this.formError.style.display = "block";
    this.formSuccess.style.display = "none";
    this.hideSavingState();
  },
};

export default Rsvp;
