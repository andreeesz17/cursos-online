import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCursoDto {
    @IsString()
    codigo: string;
  
    @IsString()
    titulo: string;
  
    @IsString()
    subtitulo: string;
  
    @IsString()
    descripcion: string;
  
    @IsString()
    nivel: string;
  
    @IsString()
    duracion_horas: string;
  
    @IsNumber()
    costo: number;
  
    @IsString()
    modalidad: string;
  
    @IsDate()
    fecha_inicio: Date;
  
    @IsBoolean()
    estado: boolean;
}
