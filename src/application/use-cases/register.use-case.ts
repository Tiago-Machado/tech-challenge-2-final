import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioOrmEntity } from '../../infrastructure/database/entities/usuario.orm-entity';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterUseCase {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepository: Repository<UsuarioOrmEntity>,
  ) {}

  async execute(nome: string, email: string, senha: string): Promise<UsuarioOrmEntity> {
    const exists = await this.usuarioRepository.findOne({ where: { email } });
    
    if (exists) {
      throw new ConflictException('Email já cadastrado');
    }

    // HASH da senha com bcrypt (10 rounds)
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = this.usuarioRepository.create({
      id: uuid(),
      nome,
      email,
      senha: senhaHash, // Salva o hash, não a senha original!
      role: 'ATENDENTE',
    });

    return await this.usuarioRepository.save(usuario);
  }
}
