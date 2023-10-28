/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductDto } from './dtos/addProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { adminGuard } from 'src/auth/adminAuthGuard';
import { SearchProductDto } from './dtos/searchQuery.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('product')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post('addProduct')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      preservePath: true,
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  addProduct(@Body() addProductDTO: AddProductDto, @UploadedFile() image) {
    return this.productService.addProduct(addProductDTO, image);
  }
  @Patch('updateProduct/:productId')
  @UseGuards(JwtAuthGuard)
  updateProduct(
    @Body() updateProductDTO: UpdateProductDto,
    @Param('productId') productId: string,
  ) {
    return this.productService.updateProduct(updateProductDTO, productId);
  }
  @Delete('deleteProduct/:productId')
  @UseGuards(JwtAuthGuard)
  @UseGuards(adminGuard)
  deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
  @Get('getProduct/:productId')
  @UseGuards(JwtAuthGuard)
  getProduct(@Param('productId') productId: string) {
    return this.productService.getProduct(productId);
  }
  @Get('allProducts')
  @UseGuards(JwtAuthGuard)
  allProducts(@Query('page') page: string, @Query('size') size: string) {
    return this.productService.allProducts(page, size);
  }
  @Get('searchProduct')
  @UseGuards(JwtAuthGuard)
  searchProduct(@Query() searchProductDto: SearchProductDto) {
    return this.productService.searchProduct(searchProductDto);
  }
}
