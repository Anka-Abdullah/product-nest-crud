import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('log-service')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column()
  statuscode: string;

  @Column()
  contentLength: string;

  @Column()
  userAgent: string;

  @Column()
  ip: string;

  @CreateDateColumn()
  created_at: Date;
}
