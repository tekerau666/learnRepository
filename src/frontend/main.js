// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
// Import our custom CSS
import '../frontend/scss/custom.scss';
document.addEventListener('DOMContentLoaded', function (event) {
  const toastElList = document.querySelectorAll('.toast');
  const toastList = [...toastElList].map(
    (toastEl) => new bootstrap.Toast(toastEl),
  );
  const age = document.cookie;
  if (age && age === 'udaltonmeet=1') {
  } else {
    toastList[0].show();
    toastElList[0].addEventListener('hide.bs.toast', () => {
      document.cookie = 'udaltonmeet=1';
      this.logger.log(document.cookie);
    });
  }
});
window.addEventListener(
  'scroll',
  function () {
    if (window.pageYOffset > 80) {
      document.getElementById('topmenu').classList.add('menu');
    } else if (window.pageYOffset <= 80) {
      document.getElementById('topmenu').classList.remove('menu');
    }
  },
  true,
);
