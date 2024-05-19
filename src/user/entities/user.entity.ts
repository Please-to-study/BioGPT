import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity('biogpt_user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  // @Column({ length: 100 })
  // nickname: string;  //昵称

  @Exclude()
  @Column()
  password: string;  // 密码

  // @Column()
  // email: string;

  // @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  // role: string;   // 用户角色

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date | string;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date | string;

  @BeforeInsert()
  async encryptPwd() {
    this.password = await hashSync(this.password);
  }
}
