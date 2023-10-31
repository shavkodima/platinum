gsap.registerPlugin(ScrollTrigger), isWebp(), menuInit();
class Slider {
  constructor(e, t) {
    (this._slider = e),
      (this._sliderWrapper = e.querySelector('[data-slider-wrapper]')),
      (this._slides = e.querySelectorAll('[data-slide]')),
      (this._options = t),
      this._init(),
      this._initPlugins();
  }
  _init() {
    (this._spaceBetween = this._options.spaceBetween),
      this._breakpointsInit(),
      this._readBreakpoints(),
      window.addEventListener('resize', this._readBreakpoints.bind(this));
  }
  _initPlugins() {
    if (this._options.plugins)
      for (let e of ((this._plugins = new Map()), this._options.plugins))
        this._plugins.set(e.name, new e(this));
  }
  _breakpointsInit() {
    this._options.breakpoints &&
      (this._breakpointsOption = new Map(
        Object.entries(this._options.breakpoints)
      ));
  }
  _readBreakpoints() {
    for (let [e, t] of Object.entries(this._options.breakpoints).reverse())
      if (window.innerWidth >= e) {
        this._slidesPerView = t.slidesPerView;
        break;
      }
    this._getSlidesWidth();
  }
  _getSlidesWidth() {
    let e = this._slider.getBoundingClientRect().width,
      t = e - (this._slidesPerView - 1) * this._spaceBetween,
      i = t / this._slidesPerView;
    (this._slideWidth = i),
      this._slides.forEach((e, t) => {
        (e.style.width = `${i}px`),
          t < this._slides.length - 1 &&
            (e.style.marginRight = `${this._spaceBetween}px`);
      });
  }
}
class SliderAnimation {
  constructor(e) {
    (this._sliderInstance = e), this._init();
  }
  _init() {
    this._animationTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
      yoyo: !0,
    });
    let e = this._sliderInstance._slides,
      t = Array.from(e).reduce(
        (t, i, s) =>
          (t +=
            i.getBoundingClientRect().width +
            (s < e.length - 1 ? this._sliderInstance._spaceBetween : 0)),
        0
      ),
      i = t - window.innerWidth,
      s = {
        x: -i,
        duration: 3 * this._sliderInstance._slides.length,
        ease: 'none',
      };
    this._animationTimeline.to(this._sliderInstance._sliderWrapper, s);
  }
}
function headerHeight() {
  let e = document.querySelector('.header'),
    t = e.getBoundingClientRect();
  document.documentElement.style.cssText += `--header-height: ${t.height}px`;
}
function floatingBallsInitStyle() {
  document.documentElement.style.cssText += `--window-height: ${window.innerWidth}px`;
}
function headerMenuItemHover() {
  let e = document.querySelectorAll('[data-header-link]');
  e.forEach((e) => {
    let t = document.createElement('div'),
      i = document.createElement('div');
    t.classList.add('menu__hover-item', 'menu__hover-item--left'),
      i.classList.add('menu__hover-item', 'menu__hover-item--right'),
      (t.innerHTML = '-'),
      (i.innerHTML = '-'),
      e.append(t),
      e.append(i),
      e.addEventListener('mouseenter', (e) => {
        e.target.classList.remove('_mouse-leave'),
          e.target.classList.add('_mouse-enter');
      }),
      e.addEventListener('mouseleave', (e) => {
        e.target.classList.remove('_mouse-enter'),
          e.target.classList.add('_mouse-leave');
      });
  });
}
document.addEventListener('DOMContentLoaded', (e) => {
  let t = new DynamicAdapt('max');
  t.init();
}),
  window.addEventListener('load', (e) => {
    new Slider(document.querySelector('.main-block__slider'), {
      spaceBetween: 20,
      breakpoints: {
        320: { slidesPerView: 2 },
        479: { slidesPerView: 4 },
        789: { slidesPerView: 4 },
        1280: { slidesPerView: 6 },
      },
      plugins: [SliderAnimation],
    }),
      headerMenuItemHover(),
      headerHeight(),
      window.addEventListener('resize', headerHeight),
      floatingBallsInitStyle(),
      window.addEventListener('resize', floatingBallsInitStyle);
  });
