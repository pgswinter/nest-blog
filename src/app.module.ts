import { TagEntity } from './entities/tag.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database/database.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    TypeOrmModule.forFeature([TagEntity]),
    AuthModule,
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
