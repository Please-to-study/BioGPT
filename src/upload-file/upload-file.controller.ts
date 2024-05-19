import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multerConfig';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadFile(@Body('lineNumber') lineNumber: number,
             @Body('username') username: string,
             @Body('prompt') prompt: string,
             @UploadedFile() file: Express.Multer.File) {
    const path = file.destination + file.filename;
    // console.log('UploadedFile path', path);
    return this.uploadFileService.uploadFile(file, path, lineNumber, username, prompt);
  }

  // @Post()
  // create(@Body() createUploadFileDto: CreateUploadFileDto) {
  //   return this.uploadFileService.create(createUploadFileDto);
  // }

  @Get()
  findAll() {
    return this.uploadFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadFileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadFileDto: UpdateUploadFileDto) {
    return this.uploadFileService.update(+id, updateUploadFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadFileService.remove(+id);
  }
}
