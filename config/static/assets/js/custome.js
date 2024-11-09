let contactUsForm = document.querySelector("#contact-form");

function hasWhiteSpace(s) {
  return s.indexOf(" ") >= 0;
}

contactUsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formValue = [
    e.target.name.value,
    e.target.email.value,
    e.target.subject.value,
    e.target.message.value,
  ];

  for (const element of formValue) {
    if (!element || hasWhiteSpace(element)) {
        Toastify({
            text: "لطفا تمام مقادیر را وارد کنید!",
            duration: 5000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            },
          }).showToast();
      return;
    }
  }

  contactUsForm.submit();
});
``;
