import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

/* ========= DSProtocolo ========= */
export class DsProtocoloDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'NumeroCompleto' })
  numeroCompleto?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'CodigoTipoLaboratorio' })
  codigoTipoLaboratorio?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  @Expose({ name: 'Duplicado' })
  duplicado?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  @Expose({ name: 'ProtocoloId' })
  protocoloId?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  @Expose({ name: 'NumeroAnio' })
  numeroAnio?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  @Expose({ name: 'IdiomaId' })
  idiomaId?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  @Expose({ name: 'Numero' })
  numero?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  @Expose({ name: 'ExportadorId' })
  exportadorId?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'ExportadorLabel' })
  exportadorLabel?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'ExportadorValue' })
  exportadorValue?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  @Expose({ name: 'ExportadorIncluirEnReporte' })
  exportadorIncluirEnReporte?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'DomicilioLabel' })
  domicilioLabel?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'DomicilioValue' })
  domicilioValue?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  @Expose({ name: 'DomicilioIncluirEnReporte' })
  domicilioIncluirEnReporte?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'AtencionLabel' })
  atencionLabel?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'AtencionValue' })
  atencionValue?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  @Expose({ name: 'AtencionIncluirEnReporte' })
  atencionIncluirEnReporte?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'DeLabel' })
  deLabel?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'DeValue' })
  deValue?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  @Expose({ name: 'DeIncluirEnReporte' })
  deIncluirEnReporte?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  @Expose({ name: 'RepetirCabecera' })
  repetirCabecera?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  @Expose({ name: 'RepetirNotas' })
  repetirNotas?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  @Expose({ name: 'RepetirNotasPreDetalle' })
  repetirNotasPreDetalle?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  @Expose({ name: 'EstadoId' })
  estadoId?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'UsuarioCreacion' })
  usuarioCreacion?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'FechaCreacion' })
  fechaCreacion?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'UsuarioModificacion' })
  usuarioModificacion?: string | null;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  @Expose({ name: 'FechaModificacion' })
  fechaModificacion?: string | null;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  @Expose({ name: 'TipoLaboratorioId' })
  tipoLaboratorioId?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  @Expose({ name: 'NumeroSenasa' })
  numeroSenasa?: number;

  // del JSON vienen también varias propiedades null (ProtocolosLotes, etc.),
  // no hacen falta para validar/render, por eso las omitimos.
}

/* ========= DSProtocoloLotes ========= */
export class DsProtocoloLoteDto {
  @ApiPropertyOptional() @IsOptional() @IsInt() @Expose({ name: 'ProtocoloLoteId' }) protocoloLoteId?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Expose({ name: 'ProtocoloId' }) protocoloId?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Expose({ name: 'LoteId' }) loteId?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'FechaMuestreoLabel' }) fechaMuestreoLabel?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'FechaMuestreoValue' }) fechaMuestreoValue?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'FechaMuestreoIncluirEnReporte' }) fechaMuestreoIncluirEnReporte?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Muestralabel' }) muestralabel?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'MuestraValue' }) muestraValue?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'MuestraIncluirEnReporte' }) muestraIncluirEnReporte?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'LoteLabel' }) loteLabel?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'LoteValue' }) loteValue?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'LoteIncluirEnReporte' }) loteIncluirEnReporte?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'LugarDeProcesadoLabel' }) lugarDeProcesadoLabel?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'LugarDeProcesadoValue' }) lugarDeProcesadoValue?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'LugarDeProcesadoIncluirEnReporte' }) lugarDeProcesadoIncluirEnReporte?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'FechaAnalisisLabel' }) fechaAnalisisLabel?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'FechaAnalisisValue' }) fechaAnalisisValue?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'FechaAnalisisIncluirEnReporte' }) fechaAnalisisIncluirEnReporte?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'ProductoLabel' }) productoLabel?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'ProductoValue' }) productoValue?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'ProductoIncluirEnReporte' }) productoIncluirEnReporte?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'CantidadEnvaseLabel' }) cantidadEnvaseLabel?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'CantidadEnvaseValue' }) cantidadEnvaseValue?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'CantidadEnvaseIncluirEnReporte' }) cantidadEnvaseIncluirEnReporte?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'IncluirLoteEnReporte' }) incluirLoteEnReporte?: boolean;
}

/* ========= DSProtocoloLotesDetalle (no-AFLA) ========= */
export class DsLoteDetalleDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'CodigoEnsayo' }) codigoEnsayo?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Ensayo' }) ensayo?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'ResultadoTexto' }) resultadoTexto?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Formula' }) formula?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'EstaEnTotalizador' }) estaEnTotalizador?: number;
}

/* ========= DSProtocoloLotesDetalleAFLA ========= */
export class DsLoteDetalleAFLADto {
  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'ProtocoloResultadoId' }) protocoloResultadoId?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'LoteId' }) loteId?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Descripcion' }) descripcion?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Adicional' }) adicional?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'DescripcionIncluirEnReporte' }) descripcionIncluirEnReporte?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'AdicionalIncluirEnReporte' }) adicionalIncluirEnReporte?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'PlantillaIncluirEnReporte' }) plantillaIncluirEnReporte?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'AflaG1' }) aflaG1?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'AflaG2' }) aflaG2?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'AflaB1' }) aflaB1?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'AflaB2' }) aflaB2?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'AflaTotal' }) aflaTotal?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'NumberRow' }) numberRow?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'ProtocoloLoteDetalleId' }) protocoloLoteDetalleId?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'ProtocoloLotePlantillaId' }) protocoloLotePlantillaId?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'EnsayoId' }) ensayoId?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'CodigoEnsayo' }) codigoEnsayo?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Ensayo' }) ensayo?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'OrdenEnsayo' }) ordenEnsayo?: number | null;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Resultado' }) resultado?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'ResultadoTexto' }) resultadoTexto?: string | null;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'LDM' }) ldm?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Unidad' }) unidad?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Referencia' }) referencia?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Test' }) test?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'ReferenciaMinimo' }) referenciaMinimo?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'ReferenciaMaximo' }) referenciaMaximo?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Metodo' }) metodo?: string | null;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'IncluirEnReporte' }) incluirEnReporte?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Formula' }) formula?: string | null;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'Fraccion' }) fraccion?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'EstaEnTotalizador' }) estaEnTotalizador?: number;
}

/* ========= DSProtocoloNotas / PreDetalle ========= */
export class DsProtocoloNotaDto {
  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'ProtocoloNotaId' }) protocoloNotaId?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'ProtocoloId' }) protocoloId?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'NotaId' }) notaId?: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() @Expose({ name: 'IncluirEnReporte' }) incluirEnReporte?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'Lugar' }) lugar?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt()    @Expose({ name: 'Orden' }) orden?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'TextoES' }) textoES?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Expose({ name: 'TextoEN' }) textoEN?: string;
}

/* ========= Protocolo (root data) ========= */
export class ProtocoloDto {
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




  @ApiProperty() @IsString() tituloPlantilla: string;
  @ApiProperty() @IsString() descripcionPlantilla: string;

  @ApiProperty({ type: Array }) @IsArray() plantilla: any[];

  @ApiPropertyOptional() @IsOptional() @IsBoolean() mostrarCheck?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString()  codigoTipoLaboratorio?: string;

  @ApiPropertyOptional({ type: [DsProtocoloDto] })
  @IsOptional() @IsArray()
  @Type(() => DsProtocoloDto)
  dsProtocolo?: DsProtocoloDto[];

  @ApiPropertyOptional({ type: [DsProtocoloLoteDto] })
  @IsOptional() @IsArray()
  @Type(() => DsProtocoloLoteDto)
  dsProtocoloLotes?: DsProtocoloLoteDto[];

  @ApiPropertyOptional({ type: [DsLoteDetalleDto] })
  @IsOptional() @IsArray()
  @Type(() => DsLoteDetalleDto)
  dsProtocoloLotesDetalle?: DsLoteDetalleDto[];

  @ApiPropertyOptional({ type: [DsLoteDetalleAFLADto] })
  @IsOptional() @IsArray()
  @Type(() => DsLoteDetalleAFLADto)
  dsProtocoloLotesDetalleAFLA?: DsLoteDetalleAFLADto[];

  @ApiPropertyOptional({ type: [DsProtocoloNotaDto] })
  @IsOptional() @IsArray()
  @Type(() => DsProtocoloNotaDto)
  dsProtocoloNotas?: DsProtocoloNotaDto[];

  @ApiPropertyOptional({ type: [DsProtocoloNotaDto] })
  @IsOptional() @IsArray()
  @Type(() => DsProtocoloNotaDto)
  dsProtocoloNotasPreDetalle?: DsProtocoloNotaDto[];
}

/* ========= Envolvente ========= */
export class GeneratePdfRequestDto {
  @ApiProperty({ example: 'protocolo' })
  @IsString()
  tipoDocumento: 'protocolo';

  @ApiProperty({ example: false })
  @IsBoolean()
  firmado: false;

  @ApiProperty({ example: false })
  @IsBoolean()
  duplicado: false;

  @ApiProperty({ type: ProtocoloDto })
  @ValidateNested()
  @Type(() => ProtocoloDto)
  data: ProtocoloDto;
}
