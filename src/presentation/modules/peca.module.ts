import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PecaOrmEntity } from '../../infrastructure/database/entities/peca.orm-entity';
import { PecaRepository } from '../../infrastructure/database/repositories/peca.repository';
import { PECA_REPOSITORY } from '../../domain/repositories/peca.repository.interface';
import { CreatePecaUseCase } from '../../application/use-cases/create-peca.use-case';
import { ListPecasUseCase } from '../../application/use-cases/list-pecas.use-case';
import { UpdateEstoquePecaUseCase } from '../../application/use-cases/update-estoque-peca.use-case';
import { PecaController } from '../controllers/peca.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PecaOrmEntity])],
  controllers: [PecaController],
  providers: [
    {
      provide: PECA_REPOSITORY,
      useClass: PecaRepository,
    },
    CreatePecaUseCase,
    ListPecasUseCase,
    UpdateEstoquePecaUseCase,
  ],
})
export class PecaModule {}
