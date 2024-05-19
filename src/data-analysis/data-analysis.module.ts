import { Module } from '@nestjs/common';
import { DataAnalysisService } from './data-analysis.service';
import { DataAnalysisController } from './data-analysis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataAnalysis } from './entities/data_analysis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataAnalysis])],
  controllers: [DataAnalysisController],
  providers: [DataAnalysisService],
  exports: [DataAnalysisService]
})
export class DataAnalysisModule {}
