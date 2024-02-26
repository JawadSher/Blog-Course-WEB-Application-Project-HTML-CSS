document.addEventListener("DOMContentLoaded", function () {
  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let password = document.getElementById("password");
  let loginBtn = document.getElementById("btn");
  let closeBtn = document.querySelector(".close-btn");
  let inputs = Array.from(document.getElementsByTagName("input"));
  let isValid = true;

  function checkInputs() {
    validateField(
      firstName,
      firstName.value.trim() !== "",
      "First-Name cannot be blank"
    );
    validateField(
      lastName,
      lastName.value.trim() !== "",
      "Last-Name cannot be blank"
    );
    validateField(email, isEmail(email.value.trim()), "Not a valid Email");
    validateField(
      phone,
      isPhone(phone.value.trim()),
      "Not a valid Phone Number"
    );
    validateField(
      password,
      password.value.trim().length >= 8,
      "Password must be at least 8 characters"
    );

    document.querySelectorAll(".form-area").forEach((forms) => {
      if (forms.classList.contains(`error`)) {
        isValid = false;
      }
    });
    return isValid;
  }

  function validateField(input, condition, errorMessage) {
    if (condition) {
      setSuccess(input);
    } else {
      setError(input, errorMessage);
    }
  }

  function setSuccess(input) {
    let inputForm = input.parentElement;
    let icon = inputForm.querySelector(".check-icon");
    inputForm.className = "form-area success";
    icon.className = "check-icon fas fa-check-circle";
  }

  function setError(input, message) {
    let inputForm = input.parentElement;
    let icon = inputForm.querySelector(".check-icon");
    inputForm.className = "form-area error";
    icon.className = "check-icon fas fa-times-circle";
    input.placeholder = message;
  }

  function isEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }

  function isPhone(phone) {
    return /^\+?(\d.*){3,}$/.test(phone);
  }

  firstName.addEventListener("input", () => {
    validateField(
      firstName,
      firstName.value.trim() !== "",
      "First-Name cannot be blank"
    );
  });
  lastName.addEventListener("input", () => {
    validateField(
      lastName,
      lastName.value.trim() !== "",
      "Last-Name cannot be blank"
    );
  });
  email.addEventListener("input", () => {
    validateField(email, isEmail(email.value.trim()), "Not a valid Email");
  });
  phone.addEventListener("input", () => {
    validateField(
      phone,
      isPhone(phone.value.trim()),
      "Not a valid Phone Number"
    );
  });
  password.addEventListener("input", () => {
    validateField(
      password,
      password.value.trim().length >= 8,
      "Password must be at least 8 characters"
    );
  });

  function showSuccess() {
    const modal = document.querySelector(".form-success");
    modal.style.display = "block";

    closeBtn.onclick = function () {
      modal.style.display = "none";
      inputs.forEach((input) => {
        input.value = "";
        input.placeholder = "";
        input.style.border = "2px solid #ddd";
        input.parentElement.classList.remove("success", "error");
        let icon = input.parentElement.querySelector(".check-icon");
        icon.className = "check-icon";
      });
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = `none`;
        inputs.forEach((input) => {
          input.value = "";
          input.placeholder = "";
          input.style.border = "2px solid #ddd";
          input.parentElement.classList.remove("success", "error");
          let icon = input.parentElement.querySelector(".check-icon");
          icon.className = "check-icon";
        });
      }
    };
  }

  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (checkInputs()) {
      showSuccess();
    }
  });
});
