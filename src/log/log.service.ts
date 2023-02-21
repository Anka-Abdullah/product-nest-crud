import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class LogService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async saveLog(query: string) {
    await this.dataSource.query(query);
  }
}
