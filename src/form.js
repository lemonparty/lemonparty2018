import $ from "jquery"

export default {
  init() {
    if (!document.body.classList.contains("body-rsvp")) {
      return;
    }

    console.log("form init");

    // this is poor form, har har har, but there's only one form on the damn
    // site, so we can just grab it by its tag instead of the weird id that
    // google gave it.
    this.form = $("form");
    this.form.on("submit", this.onSubmit.bind(this));
  },

  onSubmit(e) {
    e.preventDefault();
    const data = this.form.serialize();
    const url = this.form.attr("action");

    console.log("submit dudddeee", url, data);

    $.ajax(url, {
      method: "GET",
      dataType: "json",
      data,
      success() {
        alert("success");
      },
      failure() {
        alert("failure");
      },
    });
  },
};
