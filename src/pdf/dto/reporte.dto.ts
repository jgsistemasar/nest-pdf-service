import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para representar un registro de Reporte de Resultados
 */
export class DsReporteResultadosDto {
  @ApiProperty({ example: '290/2025', required: false })
  @IsString()
  @IsOptional()
  NumeroCompleto?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ReportesResultadosLotes?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  ReportesResultadosNotas?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  Exportador?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  Estado?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  LotesConcatenados?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  ReportesResultadosNotasToRemove?: any;

  @ApiProperty({ example: 46, required: false })
  @IsNumber()
  @IsOptional()
  ContactoId?: number;

  @ApiProperty({ example: 5730 })
  @IsNumber()
  ReporteResultadoId: number;

  @ApiProperty({ example: 2025 })
  @IsNumber()
  NumeroAnio: number;

  @ApiProperty({ example: 290 })
  @IsNumber()
  Numero: number;

  @ApiProperty({ example: 2, required: false })
  @IsNumber()
  @IsOptional()
  ExportadorId?: number;

  @ApiProperty({ example: 'Sr./es de:', required: false })
  @IsString()
  @IsOptional()
  ExportadorLabel?: string;

  @ApiProperty({ example: 'PRO DE MAN S.A.', required: false })
  @IsString()
  @IsOptional()
  ExportadorValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  ExportadorIncluirEnReporte?: boolean;

  @ApiProperty({ example: 'Domicilio:', required: false })
  @IsString()
  @IsOptional()
  DomicilioLabel?: string;

  @ApiProperty({ example: 'Ruta Nac. 158 km. 230 1/2 (5809)', required: false })
  @IsString()
  @IsOptional()
  DomicilioValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  DomicilioIncluirEnReporte?: boolean;

  @ApiProperty({ example: 'Atención:', required: false })
  @IsString()
  @IsOptional()
  AtencionLabel?: string;

  @ApiProperty({ example: 'Florencia Ulagnero', required: false })
  @IsString()
  @IsOptional()
  AtencionValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  AtencionIncluirEnReporte?: boolean;

  @ApiProperty({ example: 'De:', required: false })
  @IsString()
  @IsOptional()
  DeLabel?: string;

  @ApiProperty({ example: 'JLA ARGENTINA S.A.', required: false })
  @IsString()
  @IsOptional()
  DeValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  DeIncluirEnReporte?: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  RepetirCabecera: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  RepetirNotas: boolean;

  @ApiProperty({ example: 'jgomez', required: false })
  @IsString()
  @IsOptional()
  UsuarioCreacion?: string;

  @ApiProperty({ example: '2025-10-21T15:35:05.943', required: false })
  @IsString()
  @IsOptional()
  FechaCreacion?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  UsuarioModificacion?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  FechaModificacion?: string;

  @ApiProperty({ example: 27, required: false })
  @IsNumber()
  @IsOptional()
  EstadoId?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  IdiomaId?: number;
}

/**
 * DTO para representar los lotes de un Reporte de Resultados
 */
export class DsReporteResultadosLotesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  ReportesResultadosLotesPlantillas?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  Lote?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  MuestraCompleta?: any;

  @ApiProperty({ example: 5714 })
  @IsNumber()
  ReporteResultadoLoteId: number;

  @ApiProperty({ example: 5730 })
  @IsNumber()
  ReporteResultadoId: number;

  @ApiProperty({ example: 12461 })
  @IsNumber()
  LoteId: number;

  @ApiProperty({ example: 'Fecha de muestreo:', required: false })
  @IsString()
  @IsOptional()
  FechaMuestreoLabel?: string;

  @ApiProperty({ example: '14/10/2025', required: false })
  @IsString()
  @IsOptional()
  FechaMuestreoValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  FechaMuestreoIncluirEnReporte?: boolean;

  @ApiProperty({ example: 'Muestra:', required: false })
  @IsString()
  @IsOptional()
  Muestralabel?: string;

  @ApiProperty({ example: '2510141/2025', required: false })
  @IsString()
  @IsOptional()
  MuestraValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  MuestraIncluirEnReporte?: boolean;

  @ApiProperty({ example: 'Lote:', required: false })
  @IsString()
  @IsOptional()
  LoteLabel?: string;

  @ApiProperty({ example: 'OCT.251014A', required: false })
  @IsString()
  @IsOptional()
  LoteValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  LoteIncluirEnReporte?: boolean;

  @ApiProperty({ example: 'Planta Procesadora:', required: false })
  @IsString()
  @IsOptional()
  LugarDeProcesadoLabel?: string;

  @ApiProperty({ example: 'AGD - General Deheza', required: false })
  @IsString()
  @IsOptional()
  LugarDeProcesadoValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  LugarDeProcesadoIncluirEnReporte?: boolean;

  @ApiProperty({ example: 'Fecha de análisis:', required: false })
  @IsString()
  @IsOptional()
  FechaAnalisisLabel?: string;

  @ApiProperty({ example: '14/10/2025', required: false })
  @IsString()
  @IsOptional()
  FechaAnalisisValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  FechaAnalisisIncluirEnReporte?: boolean;

  @ApiProperty({ example: 'Producto:', required: false })
  @IsString()
  @IsOptional()
  ProductoLabel?: string;

  @ApiProperty({ example: '0R023-4 - SPLIT BLANCHED 2025,CROP', required: false })
  @IsString()
  @IsOptional()
  ProductoValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  ProductoIncluirEnReporte?: boolean;

  @ApiProperty({ example: 'Envases:', required: false })
  @IsString()
  @IsOptional()
  CantidadEnvaseLabel?: string;

  @ApiProperty({ example: ' 10 Big Bag 1250 kg', required: false })
  @IsString()
  @IsOptional()
  CantidadEnvaseValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  CantidadEnvaseIncluirEnReporte?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  IncluirLoteEnReporte?: boolean;

  @ApiProperty({ example: 'Consignatario:', required: false })
  @IsString()
  @IsOptional()
  CompradorLabel?: string;

  @ApiProperty({ example: 'COMPRADOR S.A', required: false })
  @IsString()
  @IsOptional()
  CompradorValue?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  IncluirCompradorEnReporte?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  EnvaseLabel?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  EnvaseValue?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  IncluirEnvaseEnReporte?: boolean;
}

/**
 * DTO para representar el detalle de los lotes de un Reporte de Resultados
 */
export class DsReporteResultadosLotesDetalleDto {
  @ApiProperty({ example: 0 })
  @IsNumber()
  ReporteResultadoId: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  LoteId: number;

  @ApiProperty({ example: 'Exportación_FQ_Acidez_Acreditados', required: false })
  @IsString()
  @IsOptional()
  Descripcion?: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  Adicional?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  DescripcionIncluirEnReporte?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  AdicionalIncluirEnReporte?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  PlantillaIncluirEnReporte?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  AflaG1?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  AflaG2?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  AflaB1?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  AflaB2?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  AflaTotal?: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  NumberRows: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  EstaEnTotalizador: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  ReporteResultadoLoteDetalleId: number;

  @ApiProperty({ example: 7762 })
  @IsNumber()
  ReporteResultadoLotePlantillaId: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  EnsayoId?: number;

  @ApiProperty({ example: 'AN85', required: false })
  @IsString()
  @IsOptional()
  CodigoEnsayo?: string;

  @ApiProperty({ example: 'ACIDEZ (% Ac. Oleico)', required: false })
  @IsString()
  @IsOptional()
  Ensayo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  Test?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  OrdenEnsayo?: string;

  @ApiProperty({ example: '0', required: false })
  @IsString()
  @IsOptional()
  ResultadoTexto?: string;

  @ApiProperty({ example: '0', required: false })
  @IsString()
  @IsOptional()
  Resultado?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  LDM?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  Unidad?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  Referencia?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ReferenciaMinimo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ReferenciaMaximo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  Metodo?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  IncluirEnReporte?: boolean;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  Formula?: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  Fraccion?: string;
}

/**
 * DTO para representar el detalle de aflatoxinas de los lotes
 */
export class DsReporteResultadosLotesDetalleAFLADto {
  @ApiProperty({ example: 0 })
  @IsNumber()
  ReporteResultadoId: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  LoteId: number;

  @ApiProperty({ example: 'Test homo', required: false })
  @IsString()
  @IsOptional()
  Descripcion?: string;

  @ApiProperty({ example: 'Adicional Homo', required: false })
  @IsString()
  @IsOptional()
  Adicional?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  DescripcionIncluirEnReporte?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  AdicionalIncluirEnReporte?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  PlantillaIncluirEnReporte?: boolean;

  @ApiProperty({ example: 'ND', required: false })
  @IsString()
  @IsOptional()
  AflaG1?: string;

  @ApiProperty({ example: 'ND', required: false })
  @IsString()
  @IsOptional()
  AflaG2?: string;

  @ApiProperty({ example: 'ND', required: false })
  @IsString()
  @IsOptional()
  AflaB1?: string;

  @ApiProperty({ example: 'ND', required: false })
  @IsString()
  @IsOptional()
  AflaB2?: string;

  @ApiProperty({ example: 'ND', required: false })
  @IsString()
  @IsOptional()
  AflaTotal?: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  NumberRows: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  EstaEnTotalizador: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  ReporteResultadoLoteDetalleId: number;

  @ApiProperty({ example: 7761 })
  @IsNumber()
  ReporteResultadoLotePlantillaId: number;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  EnsayoId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  CodigoEnsayo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Ensayo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  Test?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  OrdenEnsayo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ResultadoTexto?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  Resultado?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  LDM?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  Unidad?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  Referencia?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ReferenciaMinimo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ReferenciaMaximo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  Metodo?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  IncluirEnReporte?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  Formula?: string;

  @ApiProperty({ example: 'A', required: false })
  @IsString()
  @IsOptional()
  Fraccion?: string;
}

/**
 * DTO principal para el Reporte de Resultados (datos del reporte)
 */
export class ReporteDto {
  @ApiProperty({ example: 5730 })
  @IsNumber()
  reporteResultadoId: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  repetirNotas: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  repetirCabecera: boolean;

  @ApiProperty({ example: 290 })
  @IsNumber()
  numero: number;

  @ApiProperty({ example: 2025 })
  @IsNumber()
  numeroAnio: number;

  @ApiProperty({ example: '2025-10-21T15:35:05.943' })
  @IsString()
  fechaEmision: string;

  @ApiProperty({ type: [DsReporteResultadosDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DsReporteResultadosDto)
  dsReporteResultados: DsReporteResultadosDto[];

  @ApiProperty({ type: [DsReporteResultadosLotesDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DsReporteResultadosLotesDto)
  dsReporteResultadosLotes: DsReporteResultadosLotesDto[];

  @ApiProperty({ type: [DsReporteResultadosLotesDetalleDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DsReporteResultadosLotesDetalleDto)
  dsReporteResultadosLotesDetalle: DsReporteResultadosLotesDetalleDto[];

  @ApiProperty({ type: [DsReporteResultadosLotesDetalleAFLADto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DsReporteResultadosLotesDetalleAFLADto)
  dsReporteResultadosLotesDetalleAFLA: DsReporteResultadosLotesDetalleAFLADto[];

  @ApiProperty({ type: [Object], description: 'Array de notas del reporte' })
  @IsArray()
  dsReporteResultadosNotas: any[];
}

/**
 * DTO envolvente para la petición de generación de PDF de reporte
 */
export class GenerateReporteRequestDto {
  @ApiProperty({ example: 'reporte' })
  @IsString()
  tipoDocumento: 'reporte';

  @ApiProperty({ type: ReporteDto })
  @ValidateNested()
  @Type(() => ReporteDto)
  data: ReporteDto;
}
