import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsString, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class EnsayoItemDto {
  @ApiProperty({ example: 'G2' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'ND' })
  @IsString()
  valor: string;
}

function pick(obj: any, ...keys: string[]) {
  for (const k of keys) if (obj?.[k] != null) return obj[k];
  return undefined;
}

export class ProtocoloDto {
  @ApiProperty({ example: 'PROTOCOLO' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Titulo', 'titulo'))
  titulo: string;

  @ApiProperty({ example: '8/2025' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Protocolo Nro', 'ProtocoloNro', 'protocoloNro'))
  protocoloNro: string;

  @ApiProperty({ example: 'UNX SOPORTE EXPORTADOR' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Sr./es de:', 'Sr./es de', 'srDe', 'sresDe'))
  srDe: string;

  @ApiProperty({ example: 'Córdoba, Argentina' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Domicilio', 'domicilio'))
  domicilio: string;

  @ApiProperty({ example: 'UNX Soporte Contacto' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Atencion', 'Atención', 'atencion'))
  atencion: string;

  @ApiProperty({ example: 'Joaquin Gomez' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'De', 'de'))
  de: string;

  @ApiProperty({ example: '2025-08-20' })
  @IsDateString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'fecha de emision', 'fechaDeEmision', 'fechaEmision'))
  fechaEmision: string;

  @ApiProperty({ example: '20 Big Bag 1250 kg' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Envases', 'envases'))
  envases: string;

  @ApiProperty({ example: 'RUNNER 40/50 COUNT 2025, CROP' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Producto', 'producto'))
  producto: string;

  @ApiProperty({ example: 'UNX Soporte Planta' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Planta Procesadora', 'plantaProcesadora'))
  plantaProcesadora: string;

  @ApiProperty({ example: '1908/2025' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Muestra', 'muestra'))
  muestra: string;

  @ApiProperty({ example: '2025-08-19' })
  @IsDateString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'Fecha de muestreo', 'fechaDeMuestreo', 'fechaMuestreo'))
  fechaMuestreo: string;

  @ApiProperty({ example: 'EXPORTACIÓN - AFLATOXINAS (PACR01-HPLC-FLD)' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'titulo plantilla', 'Titulo Plantilla', 'tituloPlantilla'))
  tituloPlantilla: string;

  @ApiProperty({ example: 'ACREDITADO AFLATOXINA X1' })
  @IsString()
  @Transform(({ obj, value }) => value ?? pick(obj, 'descripcion plantilla', 'Descripción Plantilla', 'descripcionPlantilla'))
  descripcionPlantilla: string;

  @ApiProperty({ type: [EnsayoItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EnsayoItemDto)
  @Transform(({ obj, value }) => value ?? pick(obj, 'plantilla', 'Plantilla'))
  plantilla: EnsayoItemDto[];
}