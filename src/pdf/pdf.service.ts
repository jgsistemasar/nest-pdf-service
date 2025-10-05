import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  /**
   * Constructor del servicio PDF
   *
   * Pasos:
   * 1. Registra helper 'formatDate' para convertir fechas ISO a formato local argentino
   * 2. Registra helper 'json' para serializar objetos a JSON formateado
   *
   * Devuelve: Instancia del servicio con helpers de Handlebars configurados
   */
  constructor() {
    Handlebars.registerHelper('formatDate', (iso: string) => {
      if (!iso) return '';
      const d = new Date(iso);
      return d.toLocaleDateString('es-AR');
    });
    Handlebars.registerHelper('json', (ctx: any) => JSON.stringify(ctx, null, 2));
  }

  private templatesDir = path.resolve(__dirname, '../templates');

  /**
   * Determina el tipo MIME según la extensión del archivo
   *
   * Recibe:
   * - p: Ruta del archivo
   *
   * Pasos:
   * 1. Extrae la extensión del archivo en minúsculas
   * 2. Compara la extensión con tipos conocidos (imágenes y fuentes)
   * 3. Retorna el tipo MIME correspondiente
   *
   * Devuelve: String con el tipo MIME (ej: 'image/png', 'font/woff2')
   */
  private mimeFromExt(p: string) {
    const ext = path.extname(p).toLowerCase();
    if (ext === '.png') return 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
    if (ext === '.svg') return 'image/svg+xml';
    if (ext === '.gif') return 'image/gif';
    if (ext === '.webp') return 'image/webp';
    if (ext === '.woff') return 'font/woff';
    if (ext === '.woff2') return 'font/woff2';
    if (ext === '.ttf') return 'font/ttf';
    if (ext === '.otf') return 'font/otf';
    return 'application/octet-stream';
  }

  /**
   * Convierte un archivo a Data URI (base64)
   *
   * Recibe:
   * - absPath: Ruta absoluta del archivo
   *
   * Pasos:
   * 1. Verifica que el archivo exista
   * 2. Obtiene el tipo MIME según la extensión
   * 3. Lee el archivo y lo convierte a base64
   * 4. Construye la Data URI en formato data:mime;base64,contenido
   *
   * Devuelve: String con la Data URI del archivo
   * Lanza: Error si el archivo no existe
   */
  private toDataUri(absPath: string) {
    if (!fs.existsSync(absPath)) {
      throw new Error(`Asset no encontrado: ${absPath}`);
    }
    const mime = this.mimeFromExt(absPath);
    const b64 = fs.readFileSync(absPath).toString('base64');
    return `data:${mime};base64,${b64}`;
  }

  /**
   * Compila una plantilla Handlebars principal
   *
   * Recibe:
   * - templateName: Nombre de la plantilla (sin extensión)
   * - data: Objeto con los datos a inyectar en la plantilla
   *
   * Pasos:
   * 1. Construye la ruta completa del archivo .hbs
   * 2. Verifica que la plantilla exista
   * 3. Lee el contenido del archivo
   * 4. Define las rutas de assets y fuentes
   * 5. Registra helper 'asset' para convertir imágenes a Data URI
   * 6. Registra helper 'font' para convertir fuentes a Data URI
   * 7. Compila la plantilla con Handlebars
   * 8. Ejecuta la plantilla con los datos proporcionados
   *
   * Devuelve: String con el HTML compilado
   * Lanza: Error si la plantilla no existe
   */
  private compileTemplate(templateName: string, data: any): string {
    const filePath = path.join(this.templatesDir, `${templateName}.hbs`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Template ${templateName}.hbs no encontrada`);
    }
    const source = fs.readFileSync(filePath, 'utf8');
    const globalAssetsDir = path.join(this.templatesDir, 'assets');
    const fontsDir = path.join(this.templatesDir, 'fonts');

    // Helper para assets (imágenes)
    Handlebars.unregisterHelper('asset');
    Handlebars.registerHelper('asset', (rel: string) => {
      const abs = path.join(globalAssetsDir, rel || '');
      return this.toDataUri(abs);
    });

    // Helper para fuentes
    Handlebars.unregisterHelper('font');
    Handlebars.registerHelper('font', (rel: string) => {
      const abs = path.join(fontsDir, rel || '');
      return this.toDataUri(abs);
    });

    const template = Handlebars.compile(source);
    return template(data);
  }

  /**
   * Compila la plantilla de encabezado (header)
   *
   * Recibe:
   * - templateName: Nombre base de la plantilla
   * - data: Objeto con los datos a inyectar
   *
   * Pasos:
   * 1. Construye la ruta del archivo {templateName}-header.hbs
   * 2. Si no existe, retorna string vacío (header opcional)
   * 3. Lee el contenido del archivo
   * 4. Define las rutas de assets y fuentes
   * 5. Registra helpers 'asset' y 'font' para Data URIs
   * 6. Compila y ejecuta la plantilla con los datos
   *
   * Devuelve: String con el HTML del header compilado o string vacío
   */
  private compileHeaderTemplate(templateName: string, data: any): string {
    const filePath = path.join(this.templatesDir, `${templateName}-header.hbs`);
    if (!fs.existsSync(filePath)) {
      return ''; // No header template found, return empty
    }
    const source = fs.readFileSync(filePath, 'utf8');
    const globalAssetsDir = path.join(this.templatesDir, 'assets');
    const fontsDir = path.join(this.templatesDir, 'fonts');

    // Registrar helpers para header
    Handlebars.unregisterHelper('asset');
    Handlebars.registerHelper('asset', (rel: string) => {
      const abs = path.join(globalAssetsDir, rel || '');
      return this.toDataUri(abs);
    });

    Handlebars.unregisterHelper('font');
    Handlebars.registerHelper('font', (rel: string) => {
      const abs = path.join(fontsDir, rel || '');
      return this.toDataUri(abs);
    });

    const template = Handlebars.compile(source);
    return template(data);
  }

  /**
   * Compila la plantilla de pie de página (footer)
   *
   * Recibe:
   * - templateName: Nombre base de la plantilla
   * - data: Objeto con los datos a inyectar
   *
   * Pasos:
   * 1. Construye la ruta del archivo {templateName}-footer.hbs
   * 2. Si no existe, retorna string vacío (footer opcional)
   * 3. Lee el contenido del archivo
   * 4. Define las rutas de assets y fuentes
   * 5. Registra helpers 'asset' y 'font' para Data URIs
   * 6. Compila y ejecuta la plantilla con los datos
   *
   * Devuelve: String con el HTML del footer compilado o string vacío
   */
  private compileFooterTemplate(templateName: string, data: any): string {
    const filePath = path.join(this.templatesDir, `${templateName}-footer.hbs`);
    if (!fs.existsSync(filePath)) {
      return ''; // No footer template found, return empty
    }
    const source = fs.readFileSync(filePath, 'utf8');
    const globalAssetsDir = path.join(this.templatesDir, 'assets');
    const fontsDir = path.join(this.templatesDir, 'fonts');

    // Registrar helpers para footer
    Handlebars.unregisterHelper('asset');
    Handlebars.registerHelper('asset', (rel: string) => {
      const abs = path.join(globalAssetsDir, rel || '');
      return this.toDataUri(abs);
    });

    Handlebars.unregisterHelper('font');
    Handlebars.registerHelper('font', (rel: string) => {
      const abs = path.join(fontsDir, rel || '');
      return this.toDataUri(abs);
    });

    const template = Handlebars.compile(source);
    return template(data);
  }

  /**
   * Compila las definiciones CSS de fuentes
   *
   * Recibe:
   * - data: Objeto con los datos a inyectar
   *
   * Pasos:
   * 1. Busca el archivo fonts.hbs en el directorio de plantillas
   * 2. Si no existe, retorna string vacío (fuentes opcionales)
   * 3. Lee el contenido del archivo
   * 4. Define la ruta del directorio de fuentes
   * 5. Registra helper 'font' para convertir fuentes a Data URI
   * 6. Compila y ejecuta la plantilla
   *
   * Devuelve: String con las definiciones @font-face en CSS o string vacío
   */
  private compileFontDefinitions(data: any): string {
    const filePath = path.join(this.templatesDir, 'fonts.hbs');
    if (!fs.existsSync(filePath)) {
      return ''; // No fonts template found, return empty
    }
    const source = fs.readFileSync(filePath, 'utf8');
    const fontsDir = path.join(this.templatesDir, 'fonts');

    // Registrar helper para fuentes
    Handlebars.unregisterHelper('font');
    Handlebars.registerHelper('font', (rel: string) => {
      const abs = path.join(fontsDir, rel || '');
      return this.toDataUri(abs);
    });

    const template = Handlebars.compile(source);
    return template(data);
  }

  /**
   * Genera un PDF a partir de una plantilla y datos
   *
   * Recibe:
   * - templateName: Nombre de la plantilla a utilizar
   * - data: Objeto con los datos del documento
   *
   * Pasos:
   * 1. Compila el template del header si existe
   * 2. Compila el template del footer si existe
   * 3. Compila las definiciones de fuentes si existen
   * 4. Crea objeto de datos mejorado con header, footer y fuentes
   * 5. Compila la plantilla principal con los datos mejorados
   * 6. Lanza navegador Puppeteer en modo headless
   * 7. Crea nueva página y carga el HTML compilado
   * 8. Configura opciones del PDF (formato A4, márgenes, header/footer)
   * 9. Genera el PDF con las opciones configuradas
   * 10. Cierra el navegador
   * 11. Retorna el buffer del PDF generado
   *
   * Devuelve: Promise<Buffer> con el contenido del PDF
   * Lanza: InternalServerErrorException si hay error en la generación
   */
  async generate(templateName: string, data: any): Promise<Buffer> {
    const headerHtml = this.compileHeaderTemplate(templateName, data);
    const footerHtml = this.compileFooterTemplate(templateName, data);
    const fontDefinitions = this.compileFontDefinitions(data);

    // Inyectar fuentes y header en los datos
    const enhancedData = {
      ...data,
      _headerTemplate: headerHtml,
      _hasHeader: !!headerHtml,
      _fontDefinitions: fontDefinitions
    };

    const finalHtml = this.compileTemplate(templateName, enhancedData);

    try {
      const browser = await puppeteer.launch({
        headless: true,
          timeout: 120000,                // más que 30s
          protocolTimeout: 120000,
        args: ['--no-sandbox', '--font-render-hinting=medium', '--allow-file-access-from-files']
      });
      const page = await browser.newPage();
      await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

      const pdfOptions: any = {
        format: 'A4',
        printBackground: true,
        margin: { 
          top: '35mm',
          bottom: footerHtml ? '40mm' : '5mm',
          left: '0mm', 
          right: '0mm' 
        }
      };

      // SOLO footerTemplate (se repite automáticamente)
      if (footerHtml) {
        pdfOptions.footerTemplate = footerHtml;
        pdfOptions.displayHeaderFooter = true;
      }

      if (headerHtml) {
        pdfOptions.headerTemplate = headerHtml;
        pdfOptions.displayHeaderFooter = true;
      }

      const pdf = await page.pdf(pdfOptions);
      await browser.close();
      return pdf;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error generando PDF');
    }
  }
}