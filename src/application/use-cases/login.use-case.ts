import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioOrmEntity } from '../../infrastructure/database/entities/usuario.orm-entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginUseCase {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepository: Repository<UsuarioOrmEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, senha: string): Promise<{ access_token: string }> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Compara a senha com o hash armazenado
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { 
      email: usuario.email, 
      sub: usuario.id,
      role: usuario.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
