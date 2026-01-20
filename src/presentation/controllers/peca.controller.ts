import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePecaDto } from '../dtos/create-peca.dto';
import { UpdateEstoquePecaDto } from '../dtos/update-estoque-peca.dto';
import { CreatePecaUseCase } from '../../application/use-cases/create-peca.use-case';
import { ListPecasUseCase } from '../../application/use-cases/list-pecas.use-case';
import { UpdateEstoquePecaUseCase } from '../../application/use-cases/update-estoque-peca.use-case';

@ApiTags('Peças')
@Controller('pecas')
export class PecaController {
  constructor(
    private readonly createPecaUseCase: CreatePecaUseCase,
    private readonly listPecasUseCase: ListPecasUseCase,
    private readonly updateEstoquePecaUseCase: UpdateEstoquePecaUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova peça' })
  @ApiResponse({ status: 201, description: 'Peça criada' })
  @ApiResponse({ status: 409, description: 'Código já cadastrado' })
  async create(@Body() createDto: CreatePecaDto) {
    const peca = await this.createPecaUseCase.execute(createDto);
    return {
      id: peca.id,
      codigo: peca.codigo,
      descricao: peca.descricao,
      valor: peca.valor.formatted,
      quantidadeEstoque: peca.quantidadeEstoque,
      estoqueMinimo: peca.estoqueMinimo,
      estoqueAbaixoMinimo: peca.estoqueAbaixoMinimo,
      criadoEm: peca.criadoEm,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar peças ativas' })
  async findAll() {
    const pecas = await this.listPecasUseCase.execute();
    return pecas.map((p) => ({
      id: p.id,
      codigo: p.codigo,
      descricao: p.descricao,
      valor: p.valor.formatted,
      quantidadeEstoque: p.quantidadeEstoque,
      estoqueAbaixoMinimo: p.estoqueAbaixoMinimo,
    }));
  }

  @Patch(':id/estoque')
  @ApiOperation({ summary: 'Atualizar estoque da peça' })
  @ApiResponse({ status: 404, description: 'Peça não encontrada' })
  async updateEstoque(
    @Param('id') id: string,
    @Body() updateEstoqueDto: UpdateEstoquePecaDto,
  ) {
    const peca = await this.updateEstoquePecaUseCase.execute(
      id,
      updateEstoqueDto.quantidade,
    );
    return {
      id: peca.id,
      codigo: peca.codigo,
      quantidadeEstoque: peca.quantidadeEstoque,
      estoqueAbaixoMinimo: peca.estoqueAbaixoMinimo,
      atualizadoEm: peca.atualizadoEm,
    };
  }
}
