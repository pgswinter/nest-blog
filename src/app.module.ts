import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DatabaseService
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})

export class AppModule {}
