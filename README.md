# Portfolio — Ana Belén Pérez

Portfolio personal de marketing y contenido audiovisual. Web estática de una sola página con diseño moderno, animaciones al hacer scroll, parallax y tema mediterráneo en verde oliva.

## Estructura

```
portfolio-ana-belen/
├── index.html      # Estructura semántica HTML
├── base.css        # Estilos base
├── tokens.css      # Tokens de diseño (colores, tipografía)
├── style.css       # Estilos de componentes
├── app.js          # Interacciones JS (scroll reveal, parallax, menú)
├── assets/         # Imágenes, CV, etc.
└── README.md
```

## Reemplazar placeholders

Antes de publicar, sustituye los siguientes archivos:

| Placeholder | Archivo | Descripción |
|------------|---------|-------------|
| Foto profesional | `assets/profile.jpg` | Ya incluida — sustitúyela si quieres cambiarla |
| CV en PDF | `assets/cv-ana-belen-perez.pdf` | Ya incluido (placeholder) — sustitúyelo por tu CV final |
| Demo reel | Enlace en `index.html` | Sustituir `href="#"` del botón "Ver demo reel" por tu enlace de Vimeo/YouTube |
| Instagram | Enlace en `index.html` | Sustituir `href="#"` del icono de Instagram por tu URL |
| Vimeo | Enlace en `index.html` | Sustituir `href="#"` del icono de Vimeo por tu URL |
| Imagen OG | `assets/og-image.jpg` | Imagen para compartir en redes (1200×630px) — opcional |

### Cómo cambiar tu foto

1. Guarda tu nueva foto en `assets/profile.jpg` (formato vertical recomendado)
2. La foto ya está referenciada en `index.html` con `<img src="./assets/profile.jpg" />`

### Cómo añadir vídeos/portfolio

En cada `project-card`, busca `<div class="media-placeholder">` y reemplázalo por un iframe de Vimeo/YouTube o una imagen de portada con enlace:

```html
<!-- Opción 1: Iframe de Vimeo -->
<iframe src="https://player.vimeo.com/video/TU_ID" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>

<!-- Opción 2: Imagen con enlace -->
<a href="ENLACE_AL_VÍDEO" target="_blank" rel="noopener noreferrer">
  <img src="./assets/proyecto1.jpg" alt="Nombre del proyecto" loading="lazy" />
</a>
```

## Despliegue en GitHub Pages

### 1. Crear repositorio

```bash
git init
git add .
git commit -m "Portfolio inicial"
```

Crea un repositorio en GitHub (ej. `ana-belen-portfolio`) y sube el código:

```bash
git remote add origin https://github.com/TU_USUARIO/ana-belen-portfolio.git
git branch -M main
git push -u origin main
```

### 2. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En **Source**, selecciona `Deploy from a branch`
4. Branch: `main`, carpeta: `/ (root)`
5. Guarda. Tu web estará en `https://TU_USUARIO.github.io/ana-belen-portfolio/`

### 3. Conectar dominio personalizado (IONOS)

1. En **Settings → Pages → Custom domain**, escribe tu dominio (ej. `anabelenperez.com`) y guarda.
2. GitHub creará automáticamente un archivo `CNAME` en el repositorio.
3. En IONOS, configura los registros DNS:

   **Opción A — Registros A (apuntan a GitHub Pages):**
   Crea cuatro registros A separados:
   ```
   Tipo: A
   Host: @
   Valor: 185.199.108.153

   Tipo: A
   Host: @
   Valor: 185.199.109.153

   Tipo: A
   Host: @
   Valor: 185.199.110.153

   Tipo: A
   Host: @
   Valor: 185.199.111.153
   ```

   **Opción B — Registro CNAME (para subdominio www):**
   ```
   Tipo: CNAME
   Host: www
   Valor: TU_USUARIO.github.io
   ```

4. Activa **Enforce HTTPS** en GitHub Pages una vez que el DNS se propague (puede tardar hasta 24h).

## Personalización

- **Colores**: Edita las variables CSS en `tokens.css`
- **Fuentes**: Cambia los `@import` y variables `--font-display` / `--font-body`
- **Contenido**: Todo el texto está en `index.html`
- **Animaciones**: Configuradas en `style.css` (clases `.reveal-*`) y `app.js`

## Tecnologías

- HTML5 semántico
- CSS3 (Grid, Custom Properties, `clamp()`, `backdrop-filter`)
- JavaScript vanilla (IntersectionObserver, sin dependencias)
- Google Fonts / Fontshare
- Sin frameworks ni librerías externas
