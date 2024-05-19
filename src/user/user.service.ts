import { User } from './entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UtilService } from '../util/util.service'
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private utilService: UtilService,
  ) {}
  async register(createUser: CreateUserDto) {
    const { username } = createUser;
    // console.log('createUser:   ', createUser);
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if(existUser){
      throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST)
    }

    const newUser = this.userRepository.create(createUser)
    const userInfo = await this.userRepository.save(newUser);
    userInfo.createTime = this.utilService.conversionToLocalDate(userInfo.createTime);
    userInfo.updateTime = this.utilService.conversionToLocalDate(userInfo.updateTime);
    // console.log('userInfo:   ', userInfo);
    return userInfo;
  }

  // async login(userLoginDto: UserLoginDto) {
  //   const { username } = createUser;
  //
  //   const existUser = await this.userRepository.findOne({
  //     where: { username },
  //   });
  //   if(existUser){
  //     throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST)
  //   }
  //
  //   const newUser = this.userRepository.create(createUser)
  //   return await this.userRepository.save(newUser);
  // }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
