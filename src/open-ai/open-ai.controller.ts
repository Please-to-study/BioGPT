import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import { CreateOpenAiDto } from './dto/create-open-ai.dto';
import { UpdateOpenAiDto } from './dto/update-open-ai.dto';

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('dataAnalysis')
  async getResponse(@Body('prompt') prompt: string) {
    const response = await this.openAiService.getResponse(prompt);
    // console.log("response  ",response)
    return response;
  }

  @Post('test')
  async test(@Body('prompt') prompt: string) {
    const response = await this.openAiService.getResponse(prompt);
    return response;
  }

  @Post('hello')
  create(@Body() createOpenAiDto: CreateOpenAiDto) {
    return 'hello';
  }

  @Get()
  findAll() {
    return this.openAiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.openAiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpenAiDto: UpdateOpenAiDto) {
    return this.openAiService.update(+id, updateOpenAiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.openAiService.remove(+id);
  }
}
