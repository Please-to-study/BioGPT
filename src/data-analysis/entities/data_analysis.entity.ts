import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('biogpt_data_analysis')
export class DataAnalysis {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column()
  prompt: string;  // 提示词

  @Column()
  filename: string;  // 文件名

  @Column("text", { array: true })
  data_analysis: string[];

  @Column()
  result: string;

}
