import { Body, Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PdfService } from './pdf.service';
import { CreatePdfDto, TipoDocumento } from './dto/create-pdf.dto';
import { ProtocoloDto } from './dto/protocolo.dto';
import { ReporteDto } from './dto/reporte.dto';
import { CertificadoDto } from './dto/certificado.dto';
import { PlanillaMuestreoDto } from './dto/planilla-muestreo.dto';

@ApiTags('pdf')
@ApiBearerAuth('JWT-auth')
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  /**
   * Endpoint para generar PDFs
   *
   * Recibe:
   * - body: Objeto CreatePdfDto con tipoDocumento y data
   * - res: Objeto Response de Express
   *
   * Pasos:
   * 1. Evalúa el tipo de documento solicitado (PROTOCOLO, PLANILLAMUESTREO, REPORTE, CERTIFICADO)
   * 2. Llama al servicio PDF con la plantilla y datos correspondientes
   * 3. Genera el PDF mediante el servicio
   * 4. Define el nombre del archivo según el tipo de documento
   * 5. Configura los headers de la respuesta (Content-Type, Content-Disposition)
   * 6. Envía el buffer del PDF como respuesta
   *
   * Devuelve: Archivo PDF descargable
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Generar PDF' })
  @ApiBody({ type: CreatePdfDto })
  @ApiOkResponse({ description: 'Devuelve un PDF (application/pdf)' })
  async create(@Body() body: CreatePdfDto, @Res() res: Response) {
    let buffer: Buffer;
    let filename = 'documento.pdf';

    switch (body.tipoDocumento) {
      case TipoDocumento.PROTOCOLO:
        buffer = await this.pdfService.generate('protocolo', body.data as ProtocoloDto);
        filename = 'protocolo.pdf';
        break;
      case TipoDocumento.PLANILLAMUESTREO:
        buffer = await this.pdfService.generate('planillaMuestreo', body.data as PlanillaMuestreoDto);
        filename = 'PlanillaMuestreo.pdf';
        break;
      case TipoDocumento.REPORTE:
        buffer = await this.pdfService.generate('reporte', body.data as ReporteDto);
        filename = 'reporte.pdf';
        break;
      case TipoDocumento.CERTIFICADO:
        buffer = await this.pdfService.generate('certificado', body.data as CertificadoDto);
        filename = 'certificado.pdf';
        break;
      default:
        buffer = await this.pdfService.generate('protocolo', body.data);
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });
    res.send(buffer);
  }
}