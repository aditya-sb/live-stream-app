import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoGateway } from './video/video.gateway';
import { Logger } from './logger.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'data/db.sqlite',
            entities: [User],
            synchronize: true,
        }),
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService, VideoGateway, Logger],
})
export class AppModule {}
