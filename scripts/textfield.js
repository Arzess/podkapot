const textFields = document.querySelectorAll(".mdc-text-field");
textFields.forEach((textFieldElement) => {
    new mdc.textfield.MDCTextField(textFieldElement);
});


const form = document.getElementById("myForm");
form.addEventListener("submit", (event) => {
  let isValid = true;
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    const errorElement = document.getElementById(input.id + "-error");
    const errorMessage = input.getAttribute("data-error-message");

    if (input.required && !input.value.trim()) {
      input.classList.add("mdc-text-field--invalid");
      errorElement.textContent = "Це поле потрібно";
      isValid = false;
    } else if (
      input.pattern &&
      !new RegExp(input.pattern).test(input.value)
    ) {
      input.classList.add("mdc-text-field--invalid");
      errorElement.textContent = errorMessage || "Invalid";
      isValid = false;
    } else {
      input.classList.remove("mdc-text-field--invalid");
      errorElement.textContent = "";
    }
  });
  if (!isValid) {
    event.preventDefault();
  }
});