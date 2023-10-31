async function intro() {
  let e = document.querySelector('.wrapper'),
    o = document.querySelector('.intro'),
    t = document.querySelector('.intro__logo'),
    r = document.querySelector('.intro__mask'),
    n = document.querySelector('.intro__mask-img');
  document.documentElement.classList.contains('has-scroll-smooth') ||
    bodyLockToggle();
  let c = gsap.timeline();
  gsap.set(e, { opacity: 1 }),
    setTimeout(() => {
      c.fromTo(t, { y: 100 }, { y: 0, opacity: 1, duration: 2 })
        .fromTo(
          r,
          { y: 100, scaleY: 0 },
          { scaleY: 1, y: 0, opacity: 1, duration: 1 }
        )
        .fromTo(
          n,
          { yPercent: 100 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            onComplete() {
              setTimeout(() => {
                gsap.to([t, r], {
                  opacity: 0,
                  onComplete() {
                    o.remove(),
                      document.documentElement.classList.contains(
                        'has-scroll-smooth'
                      ) || bodyLockToggle();
                  },
                });
              }, 1e3);
            },
          }
        );
    }, 1e3);
}
function loadScript(e) {
  return new Promise((o, t) => {
    let r = document.createElement('script');
    (r.src = e),
      (r.onload = () => o(r)),
      (r.onerror = () => t(Error('cannot load script'))),
      document.querySelector('head').append(r);
  });
}
document.addEventListener('DOMContentLoaded', (e) => {
  intro();
});
