let contactUsForm = document.querySelector("#contact-form");

var lastEmailTime = localStorage.getItem("lastEmailTime")
  ? new Date(parseInt(localStorage.getItem("lastEmailTime")))
  : new Date(0);

document.addEventListener("DOMContentLoaded", function () {
  function checkEmailTimeout() {
    var currentTime = new Date();
    var timeDiff = currentTime - lastEmailTime;
    var halfHour = 30 * 60 * 1000;

    if (timeDiff > halfHour) {
      document.getElementById("contactFormBtn").disabled = false;
    } else {
      document.getElementById("contactFormBtn").disabled = true;
      var remainingTime = halfHour - timeDiff;
      var remainingMinutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      var remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      document.getElementById("timer").textContent =
        remainingMinutes + ":" + remainingSeconds + " تا ارسال بعدی";
    }
  }

  setInterval(checkEmailTimeout, 1000);

  function sendEmail() {
    localStorage.setItem("lastEmailTime", new Date().getTime());
  }

  document
    .getElementById("contactFormBtn")
    .addEventListener("click", sendEmail);
});

toastr.options = {
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

contactUsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formValue = [
    e.target.name.value,
    e.target.email.value,
    e.target.subject.value,
    e.target.message.value,
  ];

  for (const element of formValue) {
    if (!element || element.trim() == "") {
      toastr.error("لطفا تمامی مقادیر را وارد کنید!");
      return;
    }
  }

  contactUsForm.submit();
});
``;
