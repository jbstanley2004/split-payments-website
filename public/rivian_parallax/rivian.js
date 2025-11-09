export function initRivianBackdrop(opts = {}) {
  const sel = opts.target || '#split-funding-process';
  const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
  if (!el) return;

  let bg = el.querySelector('.rivian-bg');
  if (!bg) {
    bg = document.createElement('div');
    bg.className = 'rivian-bg';
    el.prepend(bg);
  }

  if (!bg.dataset.ready) {
    ['sky','haze','ridge-left','ridge-right'].forEach(name => {
      const layer = document.createElement('div');
      layer.className = `rivian-layer rivian-layer--${name}`;
      layer.setAttribute('aria-hidden','true');
      bg.appendChild(layer);
    });
    bg.dataset.ready = '1';
  }

  const steps = el.querySelectorAll('.rivian-step, .step');
  if (steps.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal'); });
    }, { threshold: 0.12 });
    steps.forEach(s => io.observe(s));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const auto = document.querySelector('#split-funding-process');
    if (auto) initRivianBackdrop({ target: auto });
  });
} else {
  const auto = document.querySelector('#split-funding-process');
  if (auto) initRivianBackdrop({ target: auto });
}
