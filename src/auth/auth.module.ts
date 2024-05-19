import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LocalStorage } from './local.strategy';
import { UtilModule } from '../util/util.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, UtilModule],
  providers: [AuthService, LocalStorage],
})
export class AuthModule {}
