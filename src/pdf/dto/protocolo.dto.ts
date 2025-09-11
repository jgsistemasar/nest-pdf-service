// pdf-protocolo.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

/* ---------------- util: pick compat nombres ---------------- */
function pick(obj: any, ...keys: string[]) {
  for (const k of keys) if (obj?.[k] != null) return obj[k];
  return undefined;
}

/* ---------------- Items de “plantilla” (ensayos) ---------------- */
export class EnsayoItemDto {
  @ApiProperty({ example: 'G2' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'ND' })
  @IsString()
  valor: string;
}

/* ---------------- DataSet DSProtocolo (cabecera RDLC) ---------------- */
export class DsProtocoloDto {
  @ApiPropertyOptional({ example: '8/2025' })
  @IsOptional()
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'NumeroCompleto', 'numeroCompleto'))
  numeroCompleto?: string;

  @ApiPropertyOptional({ example: 'ACEITERA GENERAL DEHEZA' })
  @IsOptional()
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'DeValue', 'deValue'))
  deValue?: string;

  @ApiPropertyOptional({ example: 'Córdoba, Argentina' })
  @IsOptional()
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'DomicilioValue', 'domicilioValue'))
  domicilioValue?: string;

  @ApiPropertyOptional({ example: 'LRS0005  113' })
  @IsOptional()
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'CodigoTipoLaboratorio', 'codigoTipoLaboratorio'))
  codigoTipoLaboratorio?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'Duplicado', 'duplicado')) === true)
  duplicado?: boolean;
}

/* ---------------- DataSet DSProtocoloLotes (1:1 con BE) ---------------- */
export class DsProtocoloLoteDto {
  @ApiPropertyOptional({ example: 10 })
  @IsOptional() @IsInt() @Type(() => Number)
  @Transform(({ obj, value }) => value ?? pick(obj, 'ProtocoloLoteId', 'protocoloLoteId'))
  protocoloLoteId?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional() @IsInt() @Type(() => Number)
  @Transform(({ obj, value }) => value ?? pick(obj, 'ProtocoloId', 'protocoloId'))
  protocoloId?: number;

  @ApiPropertyOptional({ example: 99 })
  @IsOptional() @IsInt() @Type(() => Number)
  @Transform(({ obj, value }) => value ?? pick(obj, 'LoteId', 'loteId'))
  loteId?: number;

  @ApiPropertyOptional({ example: 'Fecha de muestreo' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'FechaMuestreoLabel', 'fechaMuestreoLabel'))
  fechaMuestreoLabel?: string;

  @ApiPropertyOptional({ example: '2025-08-19' })
  @IsOptional() 
  @Transform(({ obj, value }) => value ?? pick(obj, 'FechaMuestreoValue', 'fechaMuestreoValue'))
  fechaMuestreoValue?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'FechaMuestreoIncluirEnReporte', 'fechaMuestreoIncluirEnReporte')) === true)
  fechaMuestreoIncluirEnReporte?: boolean;

  @ApiPropertyOptional({ example: 'Nº DE MUESTRA' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Muestralabel', 'muestralabel'))
  muestralabel?: string;

  @ApiPropertyOptional({ example: '4578/2025' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'MuestraValue', 'muestraValue'))
  muestraValue?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'MuestraIncluirEnReporte', 'muestraIncluirEnReporte')) === true)
  muestraIncluirEnReporte?: boolean;

  @ApiPropertyOptional({ example: 'Lote' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'LoteLabel', 'loteLabel'))
  loteLabel?: string;

  @ApiPropertyOptional({ example: 'LOTE-123' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'LoteValue', 'loteValue'))
  loteValue?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'LoteIncluirEnReporte', 'loteIncluirEnReporte')) === true)
  loteIncluirEnReporte?: boolean;

  @ApiPropertyOptional({ example: 'Lugar de procesado' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'LugarDeProcesadoLabel', 'lugarDeProcesadoLabel'))
  lugarDeProcesadoLabel?: string;

  @ApiPropertyOptional({ example: 'Planta X' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'LugarDeProcesadoValue', 'lugarDeProcesadoValue'))
  lugarDeProcesadoValue?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'LugarDeProcesadoIncluirEnReporte', 'lugarDeProcesadoIncluirEnReporte')) === true)
  lugarDeProcesadoIncluirEnReporte?: boolean;

  @ApiPropertyOptional({ example: 'Fecha de análisis' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'FechaAnalisisLabel', 'fechaAnalisisLabel'))
  fechaAnalisisLabel?: string;

  @ApiPropertyOptional({ example: '2025-08-21' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'FechaAnalisisValue', 'fechaAnalisisValue'))
  fechaAnalisisValue?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'FechaAnalisisIncluirEnReporte', 'fechaAnalisisIncluirEnReporte')) === true)
  fechaAnalisisIncluirEnReporte?: boolean;

  @ApiPropertyOptional({ example: 'Producto' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'ProductoLabel', 'productoLabel'))
  productoLabel?: string;

  @ApiPropertyOptional({ example: 'RUNNER 40/50 COUNT 2025, CROP' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'ProductoValue', 'productoValue'))
  productoValue?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'ProductoIncluirEnReporte', 'productoIncluirEnReporte')) === true)
  productoIncluirEnReporte?: boolean;

  @ApiPropertyOptional({ example: 'Cantidad/envase' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'CantidadEnvaseLabel', 'cantidadEnvaseLabel'))
  cantidadEnvaseLabel?: string;

  @ApiPropertyOptional({ example: '35 BIG BAGS' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'CantidadEnvaseValue', 'cantidadEnvaseValue'))
  cantidadEnvaseValue?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'CantidadEnvaseIncluirEnReporte', 'cantidadEnvaseIncluirEnReporte')) === true)
  cantidadEnvaseIncluirEnReporte?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'IncluirLoteEnReporte', 'incluirLoteEnReporte')) === true)
  incluirLoteEnReporte?: boolean;
}

/* ---------------- DataSet DSProtocoloNotas / PreDetalle ---------------- */
export class DsProtocoloNotaDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional() @IsInt() @Type(() => Number)
  @Transform(({ obj, value }) => value ?? pick(obj, 'ProtocoloNotaId', 'protocoloNotaId'))
  protocoloNotaId?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional() @IsInt() @Type(() => Number)
  @Transform(({ obj, value }) => value ?? pick(obj, 'ProtocoloId', 'protocoloId'))
  protocoloId?: number;

  @ApiPropertyOptional({ example: 15 })
  @IsOptional() @IsInt() @Type(() => Number)
  @Transform(({ obj, value }) => value ?? pick(obj, 'NotaId', 'notaId'))
  notaId?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'IncluirEnReporte', 'incluirEnReporte')) === true)
  incluirEnReporte?: boolean;

  @ApiPropertyOptional({ example: 2, description: 'Const_LugarNotas: int' })
  @IsOptional() @IsInt() @Type(() => Number)
  @Transform(({ obj, value }) => value ?? pick(obj, 'Lugar', 'lugar'))
  lugar?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional() @IsInt() @Type(() => Number)
  @Transform(({ obj, value }) => value ?? pick(obj, 'Orden', 'orden'))
  orden?: number;

  @ApiPropertyOptional({ example: 'Texto español' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'TextoES', 'textoES'))
  textoES?: string;

  @ApiPropertyOptional({ example: 'English text' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'TextoEN', 'textoEN'))
  textoEN?: string;
}

/* ---------------- Cuerpo principal del “protocolo” ---------------- */
export class ProtocoloDto {
  // ---- Campos “planos” ----
  @ApiProperty({ example: 'PROTOCOLO TITULO' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Titulo', 'titulo'))
  titulo: string;

  @ApiProperty({ example: '8/2025' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'ProtocoloNro', 'protocoloNro', 'Protocolo Nro'))
  protocoloNro: string;

  @ApiProperty({ example: 'ACEITERA GENERAL DEHEZA' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'SrDe', 'srDe', 'SresDe', 'Sr./es de:', 'Sr./es de'))
  srDe: string;

  @ApiProperty({ example: 'Córdoba, Argentina' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Domicilio', 'domicilio'))
  domicilio: string;

  @ApiProperty({ example: 'UNX GIRBIS' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Atencion', 'Atención', 'atencion'))
  atencion: string;

  @ApiProperty({ example: 'Joaquin Gomez' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'De', 'de'))
  de: string;

  @ApiProperty({ example: '2025-08-20' })
  @Transform(({ obj, value }) => value ?? pick(obj, 'FechaEmision', 'fechaEmision', 'fecha de emision', 'fechaDeEmision'))
  fechaEmision: string;

  @ApiProperty({ example: '35 BIG BAGS' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Envases', 'envases'))
  envases: string;

  @ApiProperty({ example: 'RUNNER 40/50 COUNT 2025, CROP' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Producto', 'producto'))
  producto: string;

  @ApiProperty({ example: 'UNX Soporte Planta' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'PlantaProcesadora', 'plantaProcesadora', 'Planta Procesadora'))
  plantaProcesadora: string;

  @ApiProperty({ example: '4578/2025' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Muestra', 'muestra'))
  muestra: string;

  @ApiProperty({ example: '2025-08-19' })
  @Transform(({ obj, value }) => value ?? pick(obj, 'FechaMuestreo', 'fechaMuestreo', 'Fecha de muestreo', 'fechaDeMuestreo'))
  fechaMuestreo: string;

  @ApiProperty({ example: 'EXPORTACIÓN - AFLATOXINAS (PACR01-HPLC-FLD)' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'TituloPlantilla', 'tituloPlantilla', 'titulo plantilla'))
  tituloPlantilla: string;

  @ApiProperty({ example: 'ACREDITADO AFLATOXINA X1 ISO 10020 ...' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'DescripcionPlantilla', 'descripcionPlantilla', 'descripcion plantilla', 'Descripción Plantilla'))
  descripcionPlantilla: string;

  @ApiProperty({ type: [EnsayoItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EnsayoItemDto)
  @Transform(({ obj, value }) => value ?? pick(obj, 'plantilla', 'Plantilla'))
  plantilla: EnsayoItemDto[];

  // ---- Extras ----
  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  @Transform(({ obj, value }) => (value ?? pick(obj, 'mostrarCheck', 'MostrarCheck')) === true)
  mostrarCheck?: boolean;

  @ApiPropertyOptional({ example: 'LRS0005  113' })
  @IsOptional() @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'codigoTipoLaboratorio', 'CodigoTipoLaboratorio'))
  codigoTipoLaboratorio?: string;

  // ---- DataSets embebidos ----

  @ApiPropertyOptional({ type: DsProtocoloDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DsProtocoloDto)
  @Transform(({ obj, value }) => value ?? pick(obj, 'dsProtocolo', 'DSProtocolo'))
  dsProtocolo?: DsProtocoloDto;

  @ApiPropertyOptional({ type: [DsProtocoloLoteDto] })
  @IsOptional() @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DsProtocoloLoteDto)
  @Transform(({ obj, value }) => {
    const v = value ?? pick(obj, 'dsProtocoloLotes', 'DSProtocoloLotes');
    if (v == null) return undefined;           // permite null/undefined
    if (Array.isArray(v)) return v;            // ya es array
    return [v];                                 // si viene un solo objeto, lo envuelvo
  })
  dsProtocoloLotes?: DsProtocoloLoteDto[];

  @ApiPropertyOptional({ type: [DsProtocoloNotaDto] })
  @IsOptional() @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DsProtocoloNotaDto)
  @Transform(({ obj, value }) => {
    const v = value ?? pick(obj, 'dsProtocoloNotas', 'DSProtocoloNotas');
    if (v == null) return undefined;           // permite null/undefined
    if (Array.isArray(v)) return v;            // array OK
    return [v];                                 // objeto único -> array
  })
  dsProtocoloNotas?: DsProtocoloNotaDto[];

  @ApiPropertyOptional({ type: [DsProtocoloNotaDto] })
  @IsOptional() @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DsProtocoloNotaDto)
  @Transform(({ obj, value }) => {
    const v = value ?? pick(obj, 'dsProtocoloNotasPreDetalle', 'DSProtocoloNotasPreDetalle');
    if (v == null) return undefined;           // permite null/undefined
    if (Array.isArray(v)) return v;            // array OK
    return [v];                                 // objeto único -> array
  })
  dsProtocoloNotasPreDetalle?: DsProtocoloNotaDto[];
}

/* ---------------- Envolvente del request /pdf ---------------- */
export class GeneratePdfRequestDto {
  @ApiProperty({ example: 'protocolo' })
  @IsString()
  tipoDocumento: 'protocolo';

  @ApiProperty({ type: ProtocoloDto })
  @ValidateNested()
  @Type(() => ProtocoloDto)
  data: ProtocoloDto;
}
