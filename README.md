# Nest PDF Service

Servicio de generación de PDFs construido con NestJS que utiliza Puppeteer y Handlebars para crear documentos PDF a partir de plantillas HTML.

## Características

### Funcionalidad Core
- Genera 4 tipos de documentos PDF:
  - **Protocolos**: Documentos de protocolo
  - **Planillas de Muestreo**: Planillas para muestreo
  - **Reportes**: Informes y reportes
  - **Certificados**: Certificados de análisis
- Utiliza plantillas Handlebars (.hbs) para renderizar contenido HTML
- Convierte HTML a PDF mediante Puppeteer (navegador headless)
- Soporte para headers y footers personalizables por tipo de documento

### Seguridad
- Autenticación mediante JWT (JSON Web Tokens)
- Endpoints protegidos con guards de autenticación
- Tokens configurables con expiración (por defecto 8h)

### Manejo de Assets
- Convierte imágenes y fuentes a data URIs base64 para incrustarlas en el PDF
- Soporta múltiples formatos:
  - Imágenes: PNG, JPG, SVG, GIF, WEBP
  - Fuentes: WOFF, WOFF2, TTF, OTF
- Sistema de helpers de Handlebars para assets y fuentes

## Tecnologías

- **NestJS**: Framework de Node.js
- **Puppeteer**: Generación de PDFs desde HTML
- **Handlebars**: Motor de plantillas
- **JWT**: Autenticación y autorización
- **Swagger**: Documentación de API
- **TypeScript**: Lenguaje de programación

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=8h
PORT=3000
```

## Ejecución

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start
```

## Uso

### Autenticación

El servicio requiere autenticación JWT. Primero debes obtener un token mediante el endpoint de autenticación.

### Generación de PDFs

**Endpoint:** `POST /pdf`

**Headers:**
```
Authorization: Bearer {tu_token_jwt}
Content-Type: application/json
```

**Body:**
```json
{
  "tipoDocumento": "PROTOCOLO",
  "data": {
    // Datos específicos según el tipo de documento
  }
}
```

**Tipos de documento disponibles:**
- `PROTOCOLO`
- `PLANILLAMUESTREO`
- `REPORTE`
- `CERTIFICADO`

**Respuesta:**
El endpoint retorna un archivo PDF con el nombre correspondiente al tipo de documento generado.

## Estructura del Proyecto

```
src/
├── auth/                   # Módulo de autenticación
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt-auth.guard.ts
│   └── jwt.strategy.ts
├── pdf/                    # Módulo de generación de PDFs
│   ├── dto/               # DTOs para cada tipo de documento
│   ├── pdf.controller.ts
│   ├── pdf.service.ts
│   └── pdf.module.ts
├── templates/             # Plantillas Handlebars
│   ├── assets/           # Imágenes y recursos
│   ├── fonts/            # Fuentes tipográficas
│   ├── fonts.hbs         # Definiciones de fuentes
│   ├── {tipo}-header.hbs # Headers por tipo de documento
│   ├── {tipo}-footer.hbs # Footers por tipo de documento
│   └── {tipo}.hbs        # Plantillas principales
├── app.module.ts
└── main.ts
```

## Plantillas

Las plantillas Handlebars soportan los siguientes helpers:

### `{{formatDate}}`
Formatea fechas ISO a formato local argentino (es-AR).

```handlebars
{{formatDate fechaCreacion}}
```

### `{{asset}}`
Carga imágenes desde la carpeta `templates/assets/` como data URI.

```handlebars
<img src="{{asset 'logo.png'}}" />
```

### `{{font}}`
Carga fuentes desde la carpeta `templates/fonts/` como data URI.

```handlebars
@font-face {
  font-family: 'MiFont';
  src: url('{{font "mifont.woff2"}}');
}
```

### `{{json}}`
Serializa objetos a JSON formateado.

```handlebars
<pre>{{json miObjeto}}</pre>
```

## Documentación API

Una vez iniciado el servicio, la documentación Swagger está disponible en:

```
http://localhost:3000/api
```

## Licencia

MIT
