import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  constructor() {
    Handlebars.registerHelper('formatDate', (iso: string) => {
      if (!iso) return '';
      const d = new Date(iso);
      return d.toLocaleDateString('es-AR');
    });
    Handlebars.registerHelper('json', (ctx: any) => JSON.stringify(ctx, null, 2));
  }

  private templatesDir = path.resolve(__dirname, '../templates');

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

  private toDataUri(absPath: string) {
    if (!fs.existsSync(absPath)) {
      throw new Error(`Asset no encontrado: ${absPath}`);
    }
    const mime = this.mimeFromExt(absPath);
    const b64 = fs.readFileSync(absPath).toString('base64');
    return `data:${mime};base64,${b64}`;
  }

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