/**
 * Aplica el efecto Liquid Glass a cualquier elemento sin distorsionar sus bordes ni texto.
 * @param {string} selector - El selector CSS del elemento (ej: '.navbar')
 * @param {number} intensidad - Qué tanto se deforma el fondo (por defecto 15)
 */
function aplicarLiquidGlass(selector, intensidad = 15) {
  // 1. Crear e inyectar el filtro SVG si no existe ya en el documento
  if (!document.getElementById('liquid-glass-filter')) {
    const svgFilter = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgFilter.setAttribute("id", "liquid-glass-filter");
    svgFilter.style.cssText = "visibility: hidden; position: absolute; width: 0; height: 0;";

    svgFilter.innerHTML = `
      <filter id="liquid-glass-effect">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="${intensidad}" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    `;
    document.body.appendChild(svgFilter);
  }

  const elemento = document.querySelector(selector);
  if (!elemento) return;

  // Parámetro dinámico
  elemento.style.setProperty('--lg-blur', '6');

  // 2. Inyectar <style> para el ::before con transform: scale() que esconde bordes
  const styleId = `liquid-glass-style-${selector.replace(/[^a-zA-Z0-9]/g, '-')}`;
  if (!document.getElementById(styleId)) {
    const estilo = document.createElement('style');
    estilo.id = styleId;
    estilo.innerHTML = `
      ${selector}::before {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: -1;
        background: rgba(255, 255, 255, 0);
        backdrop-filter: blur(calc(var(--lg-blur, 16) * 1px));
        -webkit-backdrop-filter: blur(calc(var(--lg-blur, 16) * 1px));
        filter: url(#liquid-glass-effect);
        transform: scale(1.06);
        pointer-events: none;
      }
    `;
    document.head.appendChild(estilo);
  }

  // 3. Specular highlight estático solo en el borde (::after)
  const highlightStyleId = `${styleId}-highlight`;
  if (!document.getElementById(highlightStyleId)) {
    const hlStyle = document.createElement('style');
    hlStyle.id = highlightStyleId;
    hlStyle.innerHTML = `
      ${selector}::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        z-index: -1;
        padding: 1px;
        background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 255, 255, 0.35) 20deg,
            transparent 40deg,
            transparent 180deg,
            rgba(255, 255, 255, 0.12) 200deg,
            transparent 220deg
        );
        -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0) border-box;
        -webkit-mask-composite: xor;
        mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0) border-box;
        mask-composite: exclude;
        pointer-events: none;
      }
      .darkmode ${selector}::after {
        opacity: 0.6;
      }
    `;
    document.head.appendChild(hlStyle);
  }
}

// —— EJECUCIÓN ——
aplicarLiquidGlass('.navbar', 15);
