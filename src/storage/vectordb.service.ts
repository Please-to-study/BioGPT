import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VectorDBService {
  private baseURL: string = 'http://vectordb-api-endpoint';

  async searchVectors(vector: number[], topK: number = 10) {
    try {
      const response = await axios.post(`${this.baseURL}/search`, {
        vector,
        topK,
      });
      return response.data;
    } catch (error) {
      console.error('VectorDB search error:', error);
      throw error;
    }
  }
}
