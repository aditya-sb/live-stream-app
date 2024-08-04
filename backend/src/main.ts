import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './logger.service';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    // Create a new NestJS application instance with a custom logger
    const app = await NestFactory.create(AppModule, {
        logger: new Logger(),
    });

    // Enable CORS with specific configurations
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // Start listening on port 3001
    await app.listen(3001);
}

// Call the bootstrap function to start the application
bootstrap();
