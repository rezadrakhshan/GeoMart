const registerForm = document.querySelector("#register-form");
const formGroup = document.querySelectorAll(".form-group");
const submitButton = document.querySelector(".submit-button");

toastr.options = {
  toastClass: "custom-toast-width",
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };
  if (value.email) {
    fetch(`/auth/check-username/?username=${value.name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          toastr.error("این نام کاربری قبلاً ثبت شده است.");
          return;
        } else {
          fetch(`/auth/check-email/?email=${value.email}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.exists) {
                toastr.error("این ایمیل قبلاً ثبت شده است.");
                return;
              } else {
                for (const key in value) {
                  if (!value[key] || value[key].trim() === "") {
                    toastr.error("لطفا تمام مقادیر را وارد کنید!");
                    return;
                  }
                }
                if (value.password.length < 4) {
                  toastr.error(
                    "رمز عبور باید حداقل 4 کاراکتر باشد. لطفاً یک رمز عبور معتبر وارد کنید."
                  );
                  return;
                }
                submitButton.innerText = "";
                submitButton.innerHTML = `
                <i class="fa fa-spinner fa-spin"></i>
                `
                fetch(`/auth/send_code/?email=${value.email}`)
                  .then((response) => response.json())
                  .then((data) => {
                    formGroup.forEach((element) => {
                      element.style.display = "none";
                    });
                    document.querySelector(".login-footer").remove();
                    submitButton.remove();
                    registerForm.insertAdjacentHTML(
                      "afterbegin",
                      `
                      <div class="form-group">
                            <label>کد تایید:</label>
                            <input required name="code" type="text" class="form-control code" placeholder="کد تایید را وارد کنید ..">
                        </div>
                      `
                    );
                    document
                      .querySelector(".code")
                      .addEventListener("input", (e) => {
                        if (e.target.value == data.code) {
                          document.querySelector(".code").style.border =
                            "1px solid green";
                          registerForm.submit();
                        } else {
                          document.querySelector(".code").style.border =
                            "1px solid red";
                        }
                      });
                  });
              }
            })
            .catch((error) => console.error("Error:", error));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
