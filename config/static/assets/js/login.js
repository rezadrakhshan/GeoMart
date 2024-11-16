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


function getCSRFToken() {
  let cookies = document.cookie.split(';');
  for (let cookie of cookies) {
      if (cookie.trim().startsWith('csrftoken=')) {
          return cookie.trim().substring('csrftoken='.length);
      }
  }
  return null;
}


document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.action, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-CSRFToken', getCSRFToken());

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                window.location.href = "/"
            } else {
                toastr.error("کاربری با این مشخصات یافت نشد. لطفاً دوباره تلاش کنید.")
            }
        } else {
            toastr.error("مشکلی در ارتباط با سرور پیش آمد. لطفاً دوباره تلاش کنید.")
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
    };

    xhr.send(formData);
});