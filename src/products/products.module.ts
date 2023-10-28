import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
