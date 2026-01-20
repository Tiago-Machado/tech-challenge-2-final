import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { StatusOS } from '../../../domain/enums/status-os.enum';

@Entity('ordens_servico')
export class OrdemServicoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cliente_id' })
  clienteId: string;

  @Column({ name: 'veiculo_id' })
  veiculoId: string;

  @Column({
    type: 'enum',
    enum: StatusOS,
    default: StatusOS.RECEBIDA,
  })
  status: StatusOS;

  @Column('jsonb')
  servicos: any[];

  @Column('jsonb')
  pecas: any[];

  @Column({ nullable: true, type: 'text' })
  observacoes?: string;

  @Column({ name: 'orcamento_aprovado', default: false })
  orcamentoAprovado: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
