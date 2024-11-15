const form = document.querySelector("#register-form");

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };
  if (value.email) {
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
          form.submit();
        }
      })
      .catch((error) => console.error("Error:", error));
  }
});
