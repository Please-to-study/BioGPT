import { Injectable } from '@nestjs/common';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';
import LineByLine = require("n-readlines")
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataAnalysis } from '../data-analysis/entities/data_analysis.entity';
import { CreateDataAnalysisDto } from '../data-analysis/dto/create-data-analysis.dto';


@Injectable()
export class UploadFileService {

  constructor(
    @InjectRepository(DataAnalysis)
    private dataAnalysisRepository: Repository<DataAnalysis>,
  ) {}

  async uploadFile(file: Express.Multer.File, path : string, lineNumber : number, username : string, prompt : string) {
    if (!file) {
      return {
        code: 400,
        message: 'upload error！'
      };
    }

    const broadbandLines = new LineByLine(path);
    let content: string[] = [];
    for (let start = 1; start <= lineNumber; start++) {
      const line = broadbandLines.next();
      content.push(line.toString('ascii'));
    }

    let createDataAnalysis = new CreateDataAnalysisDto;
    createDataAnalysis.username = username;
    createDataAnalysis.prompt = prompt;
    createDataAnalysis.filename = file.filename;
    createDataAnalysis.data_analysis = content;
    createDataAnalysis.result = '';

    const newDataAnalysis = this.dataAnalysisRepository.create(createDataAnalysis)
    const dataAnalysisInfo = await this.dataAnalysisRepository.save(newDataAnalysis);
    // console.log('lineNumber', lineNumber);
    // console.log('content', content);
    // console.log('filename is ', file);

    return dataAnalysisInfo;
  }

  findAll() {
    return `This action returns all uploadFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadFile`;
  }

  update(id: number, updateUploadFileDto: UpdateUploadFileDto) {
    return `This action updates a #${id} uploadFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadFile`;
  }
}
