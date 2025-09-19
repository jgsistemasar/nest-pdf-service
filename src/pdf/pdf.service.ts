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

    Handlebars.unregisterHelper('asset');
    Handlebars.registerHelper('asset', (rel: string) => {
      const abs = path.join(globalAssetsDir, rel || '');
      return this.toDataUri(abs);
    });

    const template = Handlebars.compile(source);
    return template(data);
  }

  async generate(templateName: string, data: any): Promise<Buffer> {
    const html = this.compileTemplate(templateName, data);
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--font-render-hinting=medium', '--allow-file-access-from-files']
      });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '5mm', bottom: '30mm', left: '20mm', right: '20mm' }
      });
      await browser.close();
      return pdf;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error generando PDF');
    }
  }
}
