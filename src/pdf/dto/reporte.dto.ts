import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class ReporteDto {
  @ApiProperty({ example: 'REPORTE DE RESULTADOS' })
  @IsString()
  titulo: string;

  @ApiProperty({ example: 'Resumen de resultados' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: [{ nombre: 'Ensayo X', valor: '123' }] })
  @IsArray()
  items: Array<{ nombre: string; valor: string }>;
}