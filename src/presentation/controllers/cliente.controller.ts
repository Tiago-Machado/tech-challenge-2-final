import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateClienteDto } from '../dtos/create-cliente.dto';
import { UpdateClienteDto } from '../dtos/update-cliente.dto';
import { CreateClienteUseCase } from '../../application/use-cases/create-cliente.use-case';
import { ListClientesUseCase } from '../../application/use-cases/list-clientes.use-case';
import { GetClienteUseCase } from '../../application/use-cases/get-cliente.use-case';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly listClientesUseCase: ListClientesUseCase,
    private readonly getClienteUseCase: GetClienteUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'CPF/CNPJ já cadastrado' })
  async create(@Body() createDto: CreateClienteDto) {
    const cliente = await this.createClienteUseCase.execute(createDto);
    return {
      id: cliente.id,
      cpfCnpj: cliente.cpfCnpj.formatado,
      nome: cliente.nome,
      email: cliente.email.value,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
      criadoEm: cliente.criadoEm,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes' })
  async findAll() {
    const clientes = await this.listClientesUseCase.execute();
    return clientes.map((c) => ({
      id: c.id,
      cpfCnpj: c.cpfCnpj.formatado,
      nome: c.nome,
      email: c.email.value,
      telefone: c.telefone,
      criadoEm: c.criadoEm,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async findOne(@Param('id') id: string) {
    const cliente = await this.getClienteUseCase.execute(id);
    return {
      id: cliente.id,
      cpfCnpj: cliente.cpfCnpj.formatado,
      nome: cliente.nome,
      email: cliente.email.value,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
      criadoEm: cliente.criadoEm,
      atualizadoEm: cliente.atualizadoEm,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar cliente' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateClienteDto) {
    return {
      message: 'Cliente atualizado (TODO: implementar)',
      data: { id, ...updateDto },
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar cliente' })
  @ApiResponse({ status: 204, description: 'Cliente deletado' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async remove(@Param('id') id: string) {
    // TODO: Implementar DeleteClienteUseCase
  }
}
