import { Controller, Get, Query } from '@nestjs/common';
import { DatabaseService } from 'src/storage/database.service';
import { VectorDBService } from 'src/storage/vectordb.service';
@Controller()
export class ExampleController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly vectorDBService: VectorDBService
  ) {}

  @Get('/search')
  async search(@Query('query') query: string) {
    // Example: Use the database service to get a vector from your SQL DB
    const vector = await this.databaseService.query('SELECT vector FROM table WHERE id = $1', [query]);
    
    // Example: Use the vector DB service to perform a search with that vector
    const searchResults = await this.vectorDBService.searchVectors(vector[0].vector);
    return searchResults;
  }
}
