import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      user: this.configService.get<string>('POSTGRES_USER'),
      host: this.configService.get<string>('POSTGRES_HOST'),
      database: this.configService.get<string>('POSTGRES_DB'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      // user: 'root',
      // host: 'localhost',
      // database: 'biogpt',
      // password: '1234',
      port: 5432,
    });
  }

  async query(text: string, params?: any[]) {
    const res = await this.pool.query(text, params);
    return res.rows;
  }
}
