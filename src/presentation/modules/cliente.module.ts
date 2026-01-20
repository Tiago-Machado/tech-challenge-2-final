import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteOrmEntity } from '../../infrastructure/database/entities/cliente.orm-entity';
import { ClienteRepository } from '../../infrastructure/database/repositories/cliente.repository';
import { CLIENTE_REPOSITORY } from '../../domain/repositories/cliente.repository.interface';
import { CreateClienteUseCase } from '../../application/use-cases/create-cliente.use-case';
import { ListClientesUseCase } from '../../application/use-cases/list-clientes.use-case';
import { GetClienteUseCase } from '../../application/use-cases/get-cliente.use-case';
import { ClienteController } from '../controllers/cliente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteOrmEntity])],
  controllers: [ClienteController],
  providers: [
    {
      provide: CLIENTE_REPOSITORY,
      useClass: ClienteRepository,
    },
    CreateClienteUseCase,
    ListClientesUseCase,
    GetClienteUseCase,
  ],
  exports: [CLIENTE_REPOSITORY],
})
export class ClienteModule {}
