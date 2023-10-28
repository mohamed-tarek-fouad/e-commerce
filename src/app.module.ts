import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwtAuthGuard';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [AppController],

  providers: [JwtAuthGuard, AppService],
})
export class AppModule {}
