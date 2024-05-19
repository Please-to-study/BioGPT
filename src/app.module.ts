import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './storage/database.service';
import { VectorDBService } from './storage/vectordb.service';
import { ExampleController } from './example/example.controller';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilModule } from './util/util.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { DataAnalysisModule } from './data-analysis/data-analysis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available in your app
    }),
    TypeOrmModule.forRoot({
      "type":"postgres",
      "host": "localhost",
      "port": 5432,
      "username": "root",
      "password": "1234",
      "database": "biogpt",
      "synchronize":true,
      autoLoadEntities: true,

      // extra: {timezone: 'Asia/Shanghai'} // 设置时区为中国
    }),
    UploadFileModule,
    UserModule,
    AuthModule,
    UtilModule,
    OpenAiModule,
    DataAnalysisModule,
  ],
  controllers: [AppController, ExampleController],
  providers: [AppService, DatabaseService, VectorDBService],
})
export class AppModule {}
