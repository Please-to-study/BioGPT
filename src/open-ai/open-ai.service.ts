import { Injectable } from '@nestjs/common';
import { OpenAI } from "openai";
import { CreateOpenAiDto } from './dto/create-open-ai.dto';
import { UpdateOpenAiDto } from './dto/update-open-ai.dto';
import axios from 'axios';

// openai 服务器key
// const KEY = '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';
// 代理服务器key
const KEY = 'fk225711-H4PD3osgL5gypa3duuVMBN3Xym4ekLUA';

// 代理服务器url
const OPENAI_URL = 'https://oa.api2d.net/v1/chat/completions';

@Injectable()
export class OpenAiService {

  private openaiClient: any;

  constructor() {
    // 初始化 OpenAI 客户端
    this.openaiClient = new OpenAI({
      apiKey: KEY,
    });
  }

  // 官方SDK方式
  // async getResponse(prompt: string): Promise<string> {
  //
  //   try {
  //     // 向 GPT 发送请求以生成响应
  //     const response = await this.openaiClient.completions.create({
  //       model: 'gpt-3.5-turbo',
  //       message: [
  //         {
  //           "role": "user",
  //           "content": prompt
  //         }
  //       ],
  //     });
  //
  //     return response.data.choices[0];
  //
  //   } catch (error) {
  //     console.error('Error generating response from GPT:', error);
  //     return 'Error generating response from GPT';
  //   }
  // }

  // axios 代理方式
  async getResponse(prompt: string) {

    try {
      // 向 GPT 发送请求以生成响应
      const data = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "safe_mode": false
      });

      const config = {
        method: 'post',
        url: OPENAI_URL,
        headers: {
          'Authorization': 'Bearer ' + KEY,
          // 'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
          'Content-Type': 'application/json'
        },
        data : data
      };

      const res = await axios(config);

      return res.data.choices[0];

    } catch (error) {
      console.error('Error generating response from GPT:', error);
      return 'Error generating response from GPT';
    }
  }

  create(createOpenAiDto: CreateOpenAiDto) {
    return 'This action adds a new openAi';
  }

  findAll() {
    return `This action returns all openAi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} openAi`;
  }

  update(id: number, updateOpenAiDto: UpdateOpenAiDto) {
    return `This action updates a #${id} openAi`;
  }

  remove(id: number) {
    return `This action removes a #${id} openAi`;
  }
}
