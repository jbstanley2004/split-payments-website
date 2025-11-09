// Thick 3D Button interactions
// - pointer-based tilt toward the cursor
// - moving highlight
// - spring release on pointerup
// - keyboard (Space/Enter) press & activation
(function(){
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const buttons = Array.from(document.querySelectorAll('.btn3d'));
  for (const btn of buttons){
    // allow per-button attribute overrides
    const thickness = parseFloat(btn.dataset.thickness || getCSS(btn,'--thickness') || 30);
    const travel    = parseFloat(btn.dataset.travel    || getCSS(btn,'--travel')    || 22);
    const tiltDeg   = parseFloat(btn.dataset.tilt      || (getCSS(btn,'--tilt')||'10deg'));

    // keep CSS vars in sync so CSS calc() works
    btn.style.setProperty('--thickness', thickness + 'px');
    btn.style.setProperty('--travel', travel + 'px');
    btn.style.setProperty('--tilt', (typeof tiltDeg === 'number' ? tiltDeg : parseFloat(tiltDeg)) + 'deg');

    const cap = btn.querySelector('.btn3d__cap');

    // ----- pointer tilt + specular position
    function updateTilt(e){
      if (prefersReduced) return;
      const r = btn.getBoundingClientRect();
      const x = clamp((e.clientX - r.left) / r.width, 0, 1);
      const y = clamp((e.clientY - r.top)  / r.height,0, 1);
      const maxTilt = (typeof tiltDeg === 'number' ? tiltDeg : parseFloat(tiltDeg));

      const rx = ((y - 0.5) * -maxTilt).toFixed(2);
      const ry = ((x - 0.5) *  maxTilt).toFixed(2);
      btn.style.setProperty('--rx', rx + 'deg');
      btn.style.setProperty('--ry', ry + 'deg');
      btn.style.setProperty('--mx', (x*100) + '%');
      btn.style.setProperty('--my', (y*100) + '%');
    }

    btn.addEventListener('pointermove', updateTilt);
    btn.addEventListener('pointerenter', updateTilt);

    // ----- press/release handling
    btn.addEventListener('pointerdown', (e)=>{
      btn.classList.add('is-pressed');
      btn.setPointerCapture(e.pointerId);
    });

    function release(pointerId){
      btn.classList.remove('is-pressed');
      if (prefersReduced) return;
      // brief overshoot "thunk" using WAAPI
      const rx = getCSS(btn,'--rx') || '0deg';
      const ry = getCSS(btn,'--ry') || '0deg';
      // compute transforms explicitly to avoid relying on CSS vars mid-animation
      const start = `translateY(${(-thickness + travel)}px) rotateX(${rx}) rotateY(${ry})`;
      const over  = `translateY(${-thickness +  -3}px) rotateX(calc(${rx} * .35)) rotateY(calc(${ry} * .35))`;
      const end   = `translateY(${-thickness}px) rotateX(0deg) rotateY(0deg)`;
      cap.animate([
        { transform: start },
        { transform: over },
        { transform: end }
      ], { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }

    btn.addEventListener('pointerup', (e)=>{
      release(e.pointerId);
      btn.releasePointerCapture(e.pointerId);
    });
    btn.addEventListener('pointercancel', (e)=>{
      release(e.pointerId);
      btn.releasePointerCapture(e.pointerId);
    });
    btn.addEventListener('pointerleave', ()=>{
      // reset tilt gradually by clearing the vars
      btn.style.removeProperty('--rx');
      btn.style.removeProperty('--ry');
    });

    // ----- keyboard support
    btn.addEventListener('keydown', (e)=>{
      if (e.code === 'Space' || e.code === 'Enter'){
        if (!btn.classList.contains('is-pressed')){
          btn.classList.add('is-pressed');
        }
        // prevent page scroll for Space
        e.preventDefault();
      }
    });
    btn.addEventListener('keyup', (e)=>{
      if (e.code === 'Space' || e.code === 'Enter'){
        btn.classList.remove('is-pressed');
        if (e.code === 'Space'){ btn.click(); } // emulate native button space activation
      }
    });
  }

  function clamp(v,min,max){ return Math.min(max, Math.max(min, v)); }
  function getCSS(el, name){
    const v = getComputedStyle(el).getPropertyValue(name).trim();
    return v || null;
  }
})();
