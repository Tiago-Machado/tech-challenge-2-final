import { Injectable, Inject } from '@nestjs/common';
import { ORDEM_SERVICO_REPOSITORY, IOrdemServicoRepository } from '../../domain/repositories/ordem-servico.repository.interface';
import { OrdemServico } from '../../domain/entities/ordem-servico.entity';
import { StatusOS } from '../../domain/enums/status-os.enum';

@Injectable()
export class UpdateStatusOsUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY)
    private readonly osRepository: IOrdemServicoRepository,
  ) {}

  async execute(id: string, novoStatus: StatusOS): Promise<OrdemServico> {
    const os = await this.osRepository.findById(id);
    if (!os) {
      throw new Error('Ordem de serviço não encontrada');
    }

    os.atualizarStatus(novoStatus);
    
    return await this.osRepository.update(id, os);
  }
}
