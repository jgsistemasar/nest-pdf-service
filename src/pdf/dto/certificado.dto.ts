import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CertificadoDto {
  @ApiProperty({ example: 'CERTIFICADO' })
  @IsString()
  titulo: string;

  @ApiProperty({ example: 'Certificado de calidad' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: [{ nombre: 'Campo', valor: 'Dato' }] })
  @IsArray()
  campos: Array<{ nombre: string; valor: string }>;
}