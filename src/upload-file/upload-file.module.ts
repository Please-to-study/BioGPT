import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataAnalysis } from '../data-analysis/entities/data_analysis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataAnalysis])],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
