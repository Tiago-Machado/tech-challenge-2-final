import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateVeiculoDto } from '../dtos/create-veiculo.dto';
import { CreateVeiculoUseCase } from '../../application/use-cases/create-veiculo.use-case';
import { ListVeiculosUseCase } from '../../application/use-cases/list-veiculos.use-case';
import { GetVeiculoUseCase } from '../../application/use-cases/get-veiculo.use-case';

@ApiTags('Veículos')
@Controller('veiculos')
export class VeiculoController {
  constructor(
    private readonly createVeiculoUseCase: CreateVeiculoUseCase,
    private readonly listVeiculosUseCase: ListVeiculosUseCase,
    private readonly getVeiculoUseCase: GetVeiculoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo veículo' })
  @ApiResponse({ status: 201, description: 'Veículo criado' })
  @ApiResponse({ status: 409, description: 'Placa já cadastrada' })
  async create(@Body() createDto: CreateVeiculoDto) {
    const veiculo = await this.createVeiculoUseCase.execute(createDto);
    return {
      id: veiculo.id,
      placa: veiculo.placa.formatada,
      clienteId: veiculo.clienteId,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      cor: veiculo.cor,
      criadoEm: veiculo.criadoEm,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os veículos' })
  async findAll() {
    const veiculos = await this.listVeiculosUseCase.execute();
    return veiculos.map((v) => ({
      id: v.id,
      placa: v.placa.formatada,
      marca: v.marca,
      modelo: v.modelo,
      ano: v.ano,
      cor: v.cor,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar veículo por ID' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  async findOne(@Param('id') id: string) {
    const veiculo = await this.getVeiculoUseCase.execute(id);
    return {
      id: veiculo.id,
      placa: veiculo.placa.formatada,
      clienteId: veiculo.clienteId,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      cor: veiculo.cor,
      criadoEm: veiculo.criadoEm,
    };
  }
}
