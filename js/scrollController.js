const smoothScrolling = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: !0,
  tablet: !0,
  smartphone: !0,
});
function init() {
  serviceItems(),
    window.addEventListener('resize', serviceItems),
    splitTextInit(),
    splitText(),
    gsapFromTimeline(),
    parallaxsImages(),
    scrollScale();
}
function splitTextInit() {
  let t = gsap.matchMedia();
  t.add('(min-width: 568px)', () => {
    document.querySelectorAll('[data-reveal-init]').forEach((t, e) => {
      let r = new SplitType(t, { types: 'chars, words' });
      gsap.from(r.words, {
        y: 100,
        opacity: 0,
        stagger: 0.06,
        duration: 0.1,
        scrollTrigger: {
          trigger: t,
          start: 'top 80%',
          end: 'top 20%',
          scroller: '[data-scroll-container]',
        },
      });
    });
  }),
    t.add('(max-width: 568px)', () => {
      document.querySelectorAll('[data-from-init]').forEach((t) => {
        let e = t.dataset.fromInit;
        switch (e) {
          case 'left':
            gsap.from(t, {
              opacity: 0,
              xPercent: -100,
              duration: 1,
              scrollTrigger: {
                trigger: t,
                start: 'top 70%',
                end: 'top 50%',
                scroller: '[data-scroll-container]',
              },
            });
            break;
          case 'right':
            gsap.from(t, {
              opacity: 0,
              xPercent: 100,
              duration: 1,
              scrollTrigger: {
                trigger: t,
                start: 'top 70%',
                end: 'top 50%',
                scroller: '[data-scroll-container]',
              },
            });
            break;
          default:
            throw Error('unknown direction');
        }
      });
    });
}
function splitText() {
  let t = gsap.matchMedia();
  t.add('(min-width: 568px)', () => {
    document.querySelectorAll('[data-reveal-type]').forEach((t, e) => {
      let r = new SplitType(t, { types: 'chars, words' });
      gsap.from(r.words, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: t,
          start: 'top 80%',
          end: 'top 20%',
          scroller: '[data-scroll-container]',
        },
      });
    });
  }),
    t.add('(max-width: 568px)', () => {
      document.querySelectorAll('[data-from]').forEach((t) => {
        let e = t.dataset.from;
        switch (e) {
          case 'left':
            gsap.from(t, {
              opacity: 0,
              xPercent: -60,
              duration: 1,
              scrollTrigger: {
                trigger: t,
                start: 'top 70%',
                end: 'top 50%',
                scroller: '[data-scroll-container]',
              },
            });
            break;
          case 'right':
            gsap.from(t, {
              opacity: 0,
              xPercent: 60,
              duration: 1,
              scrollTrigger: {
                trigger: t,
                start: 'top 70%',
                end: 'top 50%',
                scroller: '[data-scroll-container]',
              },
            });
            break;
          default:
            throw Error('unknown direction');
        }
      });
    });
}
function scrollScale() {
  document.querySelectorAll('[data-gsap-scale]').forEach((t) => {
    gsap.from(t, {
      scale: 0.8,
      scrollTrigger: {
        trigger: t,
        start: 'top 70%',
        end: 'top 50%',
        scroller: '[data-scroll-container]',
      },
    });
  });
}
function gsapFromTimeline() {
  document.querySelectorAll('[data-timeline]').forEach((t) => {
    let e = t.querySelectorAll('[data-timeline-from]');
    if (e) {
      let r = gsap.timeline();
      e.forEach((t) => {
        let e = t.dataset.timelineFrom;
        switch (e) {
          case 'right':
            r.from(t, { opacity: 0, xPercent: 60 });
            break;
          case 'left':
            r.from(t, { opacity: 0, xPercent: -60 });
            break;
          default:
            throw Error('unknown direction');
        }
      }),
        ScrollTrigger.create({
          trigger: t,
          start: 'top 70%',
          end: 'top 50%',
          scroller: '[data-scroll-container]',
          animation: r,
        });
    }
  });
}
function parallaxsImages() {
  document.querySelectorAll('[data-parallax-item]').forEach((t) => {
    let e = t.querySelector('[data-parallax-image]');
    e && parallaxImage(t, e);
  });
}
function parallaxImage(t, e) {
  let r = gsap.matchMedia();
  r.add('(min-width: 568px)', () => {
    gsap.from(e, {
      scale: 0.8,
      scrollTrigger: {
        trigger: t,
        start: 'top 50%',
        end: 'top 20%',
        scroller: '[data-scroll-container]',
        scrub: !0,
      },
    });
  }),
    r.add('(max-width: 568px)', () => {
      gsap.from(e, {
        opacity: 0,
        scrollTrigger: {
          trigger: t,
          start: 'top 80%',
          end: 'bottom 50%',
          scroller: '[data-scroll-container]',
          scrub: !0,
        },
      });
    });
}
function serviceItems() {
  let t = document.querySelector('.service__content'),
    e = Math.max(
      ...Array.from(t.querySelectorAll('.service__item')).map(
        (t) => t.getBoundingClientRect().width
      )
    );
  t.style.cssText += `--item-width: ${e}px`;
}
smoothScrolling.on('scroll', ScrollTrigger.update),
  ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(t) {
      return arguments.length
        ? smoothScrolling.scrollTo(t, 0, 0)
        : smoothScrolling.scroll.instance.scroll.y;
    },
    getBoundingClientRect: () => ({
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    }),
    pinType: document.querySelector('[data-scroll-container]').style.transform
      ? 'transform'
      : 'fixed',
  }),
  new ResizeObserver(() => smoothScrolling.update()).observe(
    document.querySelector('[data-scroll-container]')
  ),
  window.addEventListener('load', (t) => {
    init();
  }),
  ScrollTrigger.addEventListener('refresh', () => smoothScrolling.update()),
  ScrollTrigger.refresh();
