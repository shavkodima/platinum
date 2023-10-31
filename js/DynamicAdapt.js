class DynamicAdapt {
  constructor(e) {
    this.type = e;
  }
  init() {
    (this.оbjects = []),
      (this.daClassname = '_dynamic_adapt_'),
      (this.nodes = [...document.querySelectorAll('[data-da]')]),
      this.nodes.forEach((e) => {
        let t = e.dataset.da.trim(),
          a = t.split(','),
          i = {};
        (i.element = e),
          (i.parent = e.parentNode),
          (i.destination = document.querySelector(`${a[0].trim()}`)),
          (i.breakpoint = a[1] ? a[1].trim() : '767'),
          (i.place = a[2] ? a[2].trim() : 'last'),
          (i.index = this.indexInParent(i.parent, i.element)),
          this.оbjects.push(i);
      }),
      this.arraySort(this.оbjects),
      (this.mediaQueries = this.оbjects
        .map(({ breakpoint: e }) => `(${this.type}-width: ${e}px),${e}`)
        .filter((e, t, a) => a.indexOf(e) === t)),
      this.mediaQueries.forEach((e) => {
        let t = e.split(','),
          a = window.matchMedia(t[0]),
          i = t[1],
          s = this.оbjects.filter(({ breakpoint: e }) => e === i);
        a.addEventListener('change', () => {
          this.mediaHandler(a, s);
        }),
          this.mediaHandler(a, s);
      });
  }
  mediaHandler(e, t) {
    e.matches
      ? t.forEach((e) => {
          this.moveTo(e.place, e.element, e.destination);
        })
      : t.forEach(({ parent: e, element: t, index: a }) => {
          t.classList.contains(this.daClassname) && this.moveBack(e, t, a);
        });
  }
  moveTo(e, t, a) {
    if (
      (t.classList.add(this.daClassname),
      'last' === e || e >= a.children.length)
    ) {
      a.append(t);
      return;
    }
    if ('first' === e) {
      a.prepend(t);
      return;
    }
    a.children[e].before(t);
  }
  moveBack(e, t, a) {
    t.classList.remove(this.daClassname),
      void 0 !== e.children[a] ? e.children[a].before(t) : e.append(t);
  }
  indexInParent(e, t) {
    return [...e.children].indexOf(t);
  }
  arraySort(e) {
    if ('min' === this.type)
      e.sort((e, t) =>
        e.breakpoint === t.breakpoint
          ? e.place === t.place
            ? 0
            : 'first' === e.place || 'last' === t.place
            ? -1
            : 'last' === e.place || 'first' === t.place
            ? 1
            : 0
          : e.breakpoint - t.breakpoint
      );
    else {
      e.sort((e, t) =>
        e.breakpoint === t.breakpoint
          ? e.place === t.place
            ? 0
            : 'first' === e.place || 'last' === t.place
            ? 1
            : 'last' === e.place || 'first' === t.place
            ? -1
            : 0
          : t.breakpoint - e.breakpoint
      );
      return;
    }
  }
}
