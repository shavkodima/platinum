function isWebp() {
  var e;
  let t;
  (e = function (e) {
    document.documentElement.classList.add(!0 === e ? 'webp' : 'no-webp');
  }),
    ((t = new Image()).onload = t.onerror =
      function () {
        e(2 == t.height);
      }),
    (t.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA');
}
function menuInit() {
  document.querySelector('.icon-menu') &&
    document.addEventListener('click', function (e) {
      bodyLockStatus &&
        e.target.closest('.icon-menu') &&
        (bodyLockToggle(),
        document.documentElement.classList.toggle('menu-open'));
    });
}
let bodyLockStatus = !0,
  bodyLockToggle = (e = 500) => {
    document.documentElement.classList.contains('lock')
      ? bodyUnlock(e)
      : bodyLock(e);
  },
  bodyUnlock = (e = 500) => {
    let t = document.querySelector('body');
    if (bodyLockStatus) {
      let o = document.querySelectorAll('[data-lp]');
      setTimeout(() => {
        for (let e = 0; e < o.length; e++) {
          let l = o[e];
          l.style.paddingRight = '0px';
        }
        (t.style.paddingRight = '0px'),
          document.documentElement.classList.remove('lock');
      }, e),
        (bodyLockStatus = !1),
        setTimeout(function () {
          bodyLockStatus = !0;
        }, e);
    }
  },
  bodyLock = (e = 500) => {
    let t = document.querySelector('body');
    if (bodyLockStatus) {
      let o = document.querySelectorAll('[data-lp]');
      for (let l = 0; l < o.length; l++) {
        let n = o[l];
        n.style.paddingRight =
          window.innerWidth -
          document.querySelector('.wrapper').offsetWidth +
          'px';
      }
      (t.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px'),
        document.documentElement.classList.add('lock'),
        (bodyLockStatus = !1),
        setTimeout(function () {
          bodyLockStatus = !0;
        }, e);
    }
  };
