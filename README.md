# Portfolio Web - Jorge Vergara

Portfolio personal de **Jorge Vergara**, Diseñador UX/UI y Artista 3D basado en Envigado, Colombia.

## Tecnologías

- HTML5, CSS3, JavaScript vanilla
- Diseño responsive (mobile, tablet, desktop)
- Internacionalización (ES, EN, PT)
- Dark Mode conmutable
- Iconos SVG personalizados
- Google Fonts (Instrument Sans)

## Sistema de Diseño

### Tokens Base

- **Unidad base**: `1rem = 10px`
- **Tipografía**: Instrument Sans
- **Escala de tamaños**: 0.8rem - 5.6rem

### Colores

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| Primary | `#264027` | `#90a955` |
| Background | `#dce0d9` | `#1a1a1a` |
| Text | `#000000` | `#dce0d9` |

### Espaciado

Escala de 0.5rem a 50rem con ritmo de 0.5rem.

### Animaciones

| Duración | Valor |
|----------|-------|
| Fast | 150ms |
| Normal | 250ms |

Easing: `ease-out`

## Estructura del Proyecto

```
Entregas/Entrega 2/src/
├── Index.html           # Página principal
├── styles.css           # Estilos base
├── styles-tablet.css    # Estilos tablet
├── styles-mobile.css    # Estilos mobile
├── i18n.js              # Sistema de internacionalización
├── darkmode.js          # Toggle de tema
├── script.js            # Navegación y lógica
└── assets/
    ├── Images/          # Imágenes y logos
    └── icons/           # Iconos SVG
```

## Funcionalidades

- **Dark Mode**: Cambio manual o automático según preferencia del sistema
- **Internacionalización**: Cambio de idioma en tiempo real (ES, EN, PT)
- **Navegación**: Barra fija en la parte inferior con indicador animado
- **Scroll suave**: Navegación fluida entre secciones
- **Barras de idioma**: Animación progresiva al cargar la página