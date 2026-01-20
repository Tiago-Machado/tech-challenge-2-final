import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateServicoDto } from '../dtos/create-servico.dto';
import { CreateServicoUseCase } from '../../application/use-cases/create-servico.use-case';
import { ListServicosUseCase } from '../../application/use-cases/list-servicos.use-case';

@ApiTags('Serviços')
@Controller('servicos')
export class ServicoController {
  constructor(
    private readonly createServicoUseCase: CreateServicoUseCase,
    private readonly listServicosUseCase: ListServicosUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo serviço' })
  @ApiResponse({ status: 201, description: 'Serviço criado' })
  async create(@Body() createDto: CreateServicoDto) {
    const servico = await this.createServicoUseCase.execute(createDto);
    return {
      id: servico.id,
      descricao: servico.descricao,
      valor: servico.valor.formatted,
      tempoEstimadoMinutos: servico.tempoEstimadoMinutos,
      ativo: servico.ativo,
      criadoEm: servico.criadoEm,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar serviços ativos' })
  async findAll() {
    const servicos = await this.listServicosUseCase.execute();
    return servicos.map((s) => ({
      id: s.id,
      descricao: s.descricao,
      valor: s.valor.formatted,
      tempoEstimadoMinutos: s.tempoEstimadoMinutos,
    }));
  }
}
