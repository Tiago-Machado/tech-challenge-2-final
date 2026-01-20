import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IPecaRepository, PECA_REPOSITORY } from '../../domain/repositories/peca.repository.interface';
import { Peca } from '../../domain/entities/peca.entity';

@Injectable()
export class UpdateEstoquePecaUseCase {
  constructor(
    @Inject(PECA_REPOSITORY)
    private readonly pecaRepository: IPecaRepository,
  ) {}

  async execute(id: string, quantidade: number): Promise<Peca> {
    const peca = await this.pecaRepository.findById(id);
    if (!peca) {
      throw new NotFoundException('Peça não encontrada');
    }

    // Atualizar estoque (pode ser adicionar ou definir)
    peca.quantidadeEstoque = quantidade;
    
    return await this.pecaRepository.update(id, peca);
  }
}
