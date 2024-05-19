
import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { UtilService } from '../util/util.service'

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private utilService: UtilService,
  ) {

    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username=:username', { username })
      .getOne();

    console.log(typeof(user.createTime));

    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误！');
    }

    user.createTime = this.utilService.conversionToLocalDate(user.createTime);
    user.updateTime = this.utilService.conversionToLocalDate(user.updateTime);

    return user;
  }
}