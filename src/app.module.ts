import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DatabaseService
  })],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
