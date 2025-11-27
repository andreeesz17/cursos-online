import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  create(createCursoDto: CreateCursoDto) {
    const curso = this.cursoRepository.create(createCursoDto);
    return this.cursoRepository.save(curso);
  }

  findAll() {
    return this.cursoRepository.find();
  }

  findOne(id: string) {
    return this.cursoRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCursoDto: UpdateCursoDto) {
    const curso = await this.cursoRepository.findOne({ where: { id } });
    if (!curso) return null;
    Object.assign(curso, updateCursoDto);
    return this.cursoRepository.save(curso);
  }

  async remove(id: string) {
    const curso = await this.cursoRepository.findOne({ where: { id } });
    if (!curso) return null;
    return this.cursoRepository.remove(curso);
  }

  async horasSemanales(dataBody: any) {
     const horasPorDia = dataBody.horasPorDia;
    let totalHoras = 0;
    for (const hora of horasPorDia) {
        totalHoras += hora;
    }
    const promedio = totalHoras / 7;
    let mensaje = "";

    if (promedio < 1) {
        mensaje = "Estás estudiando muy poco.";
    } else if (promedio < 3) {
        mensaje = "Buen ritmo de estudio.";
    } else {
        mensaje = "Excelente dedicación.";
    }

    return {
        totalHoras: totalHoras,
        promedio: promedio,
        mensaje: mensaje
    };
  }
  
  async aprobacion(dataBody: any) {
    const notas = dataBody.notas;
    const notaMinima = dataBody.notaMinima;
    let suma = 0;
    for (const nota of notas) {
        suma += nota;
    }

    const promedio = suma / notas.length;

    let estado = "";
    let mensaje = "";

    if (promedio >= notaMinima) {
        estado = "Aprobado";
        mensaje = "Cumples con el promedio mínimo.";
    } else {
        estado = "Reprobado";
        mensaje = "No alcanzas el promedio mínimo.";
    }

    return {
        promedio: promedio,
        estado: estado,
        mensaje: mensaje
    };
  }
}
