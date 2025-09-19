import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { IsEnum, ValidateNested } from 'class-validator';
import { Transform, plainToInstance } from 'class-transformer';
import { ProtocoloDto } from './protocolo.dto';
import { ReporteDto } from './reporte.dto';
import { CertificadoDto } from './certificado.dto';
import { PlanillaMuestreoDto } from './planilla-muestreo.dto';

export enum TipoDocumento {
  PROTOCOLO = 'protocolo',
  PLANILLAMUESTREO = 'planillaMuestreo',
  REPORTE = 'reporte',
  CERTIFICADO = 'certificado',
}

@ApiExtraModels(ProtocoloDto, ReporteDto, CertificadoDto, PlanillaMuestreoDto)
export class CreatePdfDto {
  @ApiProperty({ enum: TipoDocumento })
  @IsEnum(TipoDocumento)
  tipoDocumento: TipoDocumento;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(ProtocoloDto) },
      { $ref: getSchemaPath(PlanillaMuestreoDto) },
      { $ref: getSchemaPath(ReporteDto) },
      { $ref: getSchemaPath(CertificadoDto) },
    ],
  })
  @ValidateNested()
  @Transform(({ value, obj }) => {
    switch (obj?.tipoDocumento) {
      case TipoDocumento.PROTOCOLO:
        return plainToInstance(ProtocoloDto, value, { enableImplicitConversion: true });
      case TipoDocumento.PLANILLAMUESTREO:
        return plainToInstance(PlanillaMuestreoDto, value, { enableImplicitConversion: true });
      case TipoDocumento.REPORTE:
        return plainToInstance(ReporteDto, value, { enableImplicitConversion: true });
      case TipoDocumento.CERTIFICADO:
        return plainToInstance(CertificadoDto, value, { enableImplicitConversion: true });
      default:
        return value;
    }
  }, { toClassOnly: true })
  data: ProtocoloDto | PlanillaMuestreoDto | ReporteDto | CertificadoDto;
}