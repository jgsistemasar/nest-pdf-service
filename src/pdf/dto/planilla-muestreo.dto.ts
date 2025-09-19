// src/pdf/dto/planilla-muestreo.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';

/**
 * Cabecera básica para la planilla (campos libres que quieras usar en la HBS)
 */
export class PlanillaMuestreoHeaderDto {
  @ApiProperty() @IsString() titulo: string;
  @ApiProperty() @IsString() protocoloNro: string;
  @ApiProperty() @IsString() srDe: string;
  @ApiProperty() @IsString() domicilio: string;
  @ApiProperty() @IsString() atencion: string;
  @ApiProperty() @IsString() de: string;
  @ApiProperty() @IsString() fechaEmision: string;
  @ApiProperty() @IsString() envases: string;
  @ApiProperty() @IsString() producto: string;
  @ApiProperty() @IsString() plantaProcesadora: string;
  @ApiProperty() @IsString() muestra: string;
  @ApiProperty() @IsString() fechaMuestreo: string;

  @ApiProperty() @IsOptional() tituloPlantilla: string;
  @ApiProperty() @IsOptional() descripcionPlantilla: string;

  @ApiProperty({ type: Array }) @IsArray() plantilla: any[];

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true') // por si llega "true" como string
  mostrarCheck?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString()
  codigoTipoLaboratorio?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  duplicado?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  firmado?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString()
  marcaAguaUrl?: string;
}

/**
 * DTO raíz con los DATASETS que hoy arma tu reporte de Microsoft.
 * Los dejamos como any[] para no atarte a un shape específico;
 * la HBS los recorre e imprime sus claves/valores.
 */
export class PlanillaMuestreoDto extends PlanillaMuestreoHeaderDto {
  // ReportViewer: Name = "DSPlanillaDeMuestreo"
  @ApiProperty({ type: Array }) @IsArray() dsPlanillaDeMuestreo: any[];

  // ReportViewer: Name = "DSPlanillaMuestreoInspectores"
  @ApiProperty({ type: Array }) @IsArray() dsPlanillaMuestreoInspectores: any[];

  // ReportViewer: Name = "DSPlanillaMuestreoAyudantes"
  @ApiProperty({ type: Array }) @IsArray() dsPlanillaMuestreoAyudantes: any[];

  // ReportViewer: Name = "DSLote"
  @ApiProperty({ type: Array }) @IsArray() dsLote: any[];

  // ReportViewer: Name = "DSProtocolo"
  @ApiProperty({ type: Array }) @IsArray() dsProtocolo: any[];

  // ReportViewer: Name = "DSElementosMuestreo"
  @ApiProperty({ type: Array }) @IsArray() dsElementosMuestreo: any[];
}

/**
 * Request para este tipo de documento (si preferís, podés reusar el CreatePdfDto
 * y solo permitir tipoDocumento = 'planillaMuestreo')
 */
export class GeneratePlanillaMuestreoRequestDto {
  @ApiProperty({ enum: ['planillaMuestreo'] })
  @IsString()
  tipoDocumento: 'planillaMuestreo';

  @ApiProperty({ type: PlanillaMuestreoDto })
  @Type(() => PlanillaMuestreoDto)
  data: PlanillaMuestreoDto;
}
