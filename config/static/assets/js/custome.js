let contactUsForm = document.querySelector("#contact-form");

function hasWhiteSpace(s) {
  return s.indexOf(" ") >= 0;
}

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

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
      toastr.error('لطفا تمامی مقادیر را وارد کنید!');
      return;
    }
  }

  contactUsForm.submit();
});
``;
