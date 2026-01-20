import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoOrmEntity } from '../../infrastructure/database/entities/veiculo.orm-entity';
import { VeiculoRepository } from '../../infrastructure/database/repositories/veiculo.repository';
import { VEICULO_REPOSITORY } from '../../domain/repositories/veiculo.repository.interface';
import { CreateVeiculoUseCase } from '../../application/use-cases/create-veiculo.use-case';
import { ListVeiculosUseCase } from '../../application/use-cases/list-veiculos.use-case';
import { GetVeiculoUseCase } from '../../application/use-cases/get-veiculo.use-case';
import { VeiculoController } from '../controllers/veiculo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoOrmEntity])],
  controllers: [VeiculoController],
  providers: [
    {
      provide: VEICULO_REPOSITORY,
      useClass: VeiculoRepository,
    },
    CreateVeiculoUseCase,
    ListVeiculosUseCase,
    GetVeiculoUseCase,
  ],
  exports: [VEICULO_REPOSITORY],
})
export class VeiculoModule {}
