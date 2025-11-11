/**
 * Gerasu - Apple-style liquid glass effect
 * Adapted from gerasu-js-apple-liquid-glass-effect
 */

interface GerasuOptions {
  darknessOpacity?: number;
  darknessBlur?: number;
  lightnessOpacity?: number;
  lightnessBlur?: number;
  centerDistortion?: number;
  centerSize?: number;
  preBlur?: number;
  postBlur?: number;
  iridescence?: number;
}

class Gerasu {
  private static instanceCount = 0;
  private static svgRoot: SVGSVGElement | null = null;
  private static filters: Record<string, SVGFilterElement> = {};

  private selector: string;
  private options: Required<GerasuOptions>;
  private id: string;

  constructor(selector: string, options: GerasuOptions = {}) {
    this.selector = selector;
    this.options = this._normalizeOptions(options);
    this.id = `gerasu_filter_${++Gerasu.instanceCount}`;

    this._ensureSVGRoot();
    this._createSVGFilter();
    this._applyEffect();
  }

  private _normalizeOptions(options: GerasuOptions): Required<GerasuOptions> {
    return {
      darknessOpacity: options.darknessOpacity ?? 17,
      darknessBlur: options.darknessBlur ?? 5,
      lightnessOpacity: options.lightnessOpacity ?? 17,
      lightnessBlur: options.lightnessBlur ?? 15,
      centerDistortion: options.centerDistortion ?? 68,
      centerSize: options.centerSize ?? 15,
      preBlur: options.preBlur ?? 7,
      postBlur: options.postBlur ?? 0,
      iridescence: options.iridescence ?? 20,
    };
  }

  private _ensureSVGRoot() {
    if (Gerasu.svgRoot) return;

    const container = document.createElement("div");
    container.style.cssText = `display: none;`;

    const element = document.querySelector(this.selector);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const computedStyle = getComputedStyle(element);
    const w = rect.width;
    const h = rect.height;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(h));
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

    container.appendChild(svg);
    document.body.appendChild(container);
    Gerasu.svgRoot = svg;
  }

  private _createSVGFilter() {
    if (Gerasu.filters[this.id]) {
      Gerasu.filters[this.id].remove();
      delete Gerasu.filters[this.id];
    }

    const {
      darknessOpacity,
      darknessBlur,
      lightnessOpacity,
      lightnessBlur,
      centerDistortion,
      centerSize,
      preBlur,
      postBlur,
      iridescence,
    } = this.options;

    const opacityDarkness = Math.round(darknessOpacity * 2.55);
    const blurDarkness = Math.round(darknessBlur);
    const opacityLightness = Math.round(lightnessOpacity * 2.55);
    const blurLightness = Math.round(lightnessBlur);
    const distortionCenter = Math.round(255 - centerDistortion);
    const sizeCenter = Math.round(20 - centerSize);
    const blurPre = preBlur / 10;
    const blurPost = postBlur / 10;
    const irid = iridescence;

    const encode = (s: string) => encodeURIComponent(s.replace(/\n/g, ""));

    const element = document.querySelector(this.selector);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const computedStyle = getComputedStyle(element);
    const w = rect.width;
    const h = rect.height;
    const r = parseFloat(computedStyle.borderRadius) || 0;
    const vb = `0 0 ${w} ${h}`;

    const feImage1 = encode(`
      <svg width='${w}' height='${h}' viewBox='${vb}' xmlns='http://www.w3.org/2000/svg'>
        <rect x='0' y='0' width='${w}' height='${h}' rx='${r}' fill='rgba(0,0,0,${
      opacityDarkness / 255
    })' />
        <rect x='0' y='0' width='${w}' height='${h}' rx='${r}' fill='#FFF' style='filter:blur(${blurDarkness}px)' />
      </svg>
    `);

    const feImage2 = encode(`
      <svg width='${w}' height='${h}' viewBox='${vb}' xmlns='http://www.w3.org/2000/svg'>
        <rect x='0' y='0' width='${w}' height='${h}' rx='${r}' fill='rgba(255,255,255,${
      opacityLightness / 255
    })' style='filter:blur(${blurLightness}px)' />
      </svg>
    `);

    const feImage3 = encode(`
      <svg width='${w}' height='${h}' viewBox='${vb}' xmlns='http://www.w3.org/2000/svg'>
        <rect x='0' y='0' width='${w}' height='${h}' rx='${r}' fill='#000' />
      </svg>
    `);

    const feImage4 = encode(`
      <svg width='${w}' height='${h}' viewBox='${vb}' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <linearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stop-color='#000'/>
            <stop offset='100%' stop-color='#00F'/>
          </linearGradient>
          <linearGradient id='gradient2' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stop-color='#000'/>
            <stop offset='100%' stop-color='#0F0'/>
          </linearGradient>
        </defs>
        <rect x='0' y='0' width='${w}' height='${h}' rx='${r}' fill='#7F7F7F'/>
        <rect x='0' y='0' width='${w}' height='${h}' rx='${r}' fill='#000'/>
        <rect x='0' y='0' width='${w}' height='${h}' rx='${r}' fill='url(#gradient1)' style='mix-blend-mode: screen'/>
        <rect x='0' y='0' width='${w}' height='${h}' rx='${r}' fill='url(#gradient2)' style='mix-blend-mode: screen'/>
        <rect x='0' y='0' width='${w}' height='${h}' rx='${r}' fill='rgba(127,127,127,${
      distortionCenter / 2.55
    }%)' style='filter:blur(${sizeCenter}px)'/>
      </svg>
    `);

    if (!Gerasu.svgRoot) return;

    const filter = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "filter"
    );
    filter.setAttribute("id", this.id);
    filter.innerHTML = `
      <feImage href="data:image/svg+xml,${feImage1}" x="0%" y="0%" width="${w}" height="${h}" result="feImage1" id="feImage1"/>
      <feImage href="data:image/svg+xml,${feImage2}" x="0%" y="0%" width="${w}" height="${h}" result="feImage2" id="feImage2"/>
      <feImage href="data:image/svg+xml,${feImage3}" x="0%" y="0%" width="${w}" height="${h}" result="feImage3" id="feImage3"/>
      <feImage href="data:image/svg+xml,${feImage4}" x="0%" y="0%" width="${w}" height="${h}" result="feImage4" id="feImage4"/>
      <feGaussianBlur stdDeviation="${blurPre}" in="SourceGraphic" result="preblur"/>
      <feDisplacementMap in2="feImage4" in="preblur" scale="${
        -150 + irid / 10
      }" xChannelSelector="B" yChannelSelector="G" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="disp1"/>
      <feDisplacementMap in2="feImage4" in="preblur" scale="-150" xChannelSelector="B" yChannelSelector="G" />
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="disp2"/>
      <feDisplacementMap in2="feImage4" in="preblur" scale="${
        -150 - irid / 10
      }" xChannelSelector="B" yChannelSelector="G" />
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="disp3"/>
      <feBlend in2="disp2" in="disp3" mode="screen"/>
      <feBlend in2="disp1" mode="screen"/>
      <feGaussianBlur stdDeviation="${blurPost}"/>
      <feBlend in2="feImage2" mode="screen"/>
      <feBlend in2="feImage1" mode="multiply"/>
      <feComposite in2="feImage3" operator="in"/>
      <feOffset dx="0" dy="0"/>
    `;

    Gerasu.svgRoot.appendChild(filter);
    Gerasu.filters[this.id] = filter;
  }

  private _applyEffect() {
    const elements = document.querySelectorAll(this.selector);
    elements.forEach((el) => {
      if (window.CSS && window.CSS.supports) {
        if (
          window.CSS.supports("-webkit-backdrop-filter", "blur(8px)") ||
          window.CSS.supports("backdrop-filter", "blur(8px)")
        ) {
          (el as HTMLElement).style.setProperty(
            "-webkit-backdrop-filter",
            `url(#${this.id})`
          );
          (el as HTMLElement).style.setProperty(
            "backdrop-filter",
            `url(#${this.id})`
          );
        }
      }
    });
  }

  public destroy() {
    if (Gerasu.filters[this.id]) {
      Gerasu.filters[this.id].remove();
      delete Gerasu.filters[this.id];
    }
  }
}

export default Gerasu;
