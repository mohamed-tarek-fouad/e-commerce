/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { AddProductDto } from './dtos/addProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { SearchProductDto } from './dtos/searchQuery.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async addProduct(addProductDTO: AddProductDto, image) {
    const product = await this.prisma.product.create({
      data: {
        ...addProductDTO,
        image: `uploads/${image?.filename}`,
        price: parseFloat(addProductDTO.price),
        quantity: parseInt(addProductDTO.quantity),
      },
    });
    return { message: 'product added successfully', product };
  }
  async checkProductExist(id: string) {
    const checkProductExist = await this.prisma.product.findUnique({
      where: { id },
    });
    return checkProductExist;
  }
  async updateProduct(updateProductDTO: UpdateProductDto, productId: string) {
    const checkProductExist = await this.checkProductExist(productId);
    if (!checkProductExist) {
      throw new HttpException('product does not exist', HttpStatus.BAD_REQUEST);
    }
    const product = await this.prisma.product.update({
      where: { id: productId },
      data: {
        ...updateProductDTO,
        price: parseFloat(updateProductDTO.price),
        quantity: parseInt(updateProductDTO.quantity),
      },
    });
    return { message: 'product updated successfully', product };
  }
  async deleteProduct(productId: string) {
    const checkProductExist = await this.checkProductExist(productId);
    if (!checkProductExist) {
      throw new HttpException('product does not exist', HttpStatus.BAD_REQUEST);
    }
    await this.prisma.product.delete({ where: { id: productId } });
    return { message: 'product deleted successfully' };
  }
  async getProduct(productId: string) {
    const checkProductExist = await this.checkProductExist(productId);
    if (!checkProductExist) {
      throw new HttpException('product does not exist', HttpStatus.BAD_REQUEST);
    }
    return {
      message: 'product found successfully',
      product: checkProductExist,
    };
  }
  async allProducts(page: string, size: string) {
    const pageNumber = page ? parseInt(page) : 1;
    const pageSize = size ? parseInt(size) : 10;
    const skip = (pageNumber - 1) * pageSize;
    const count = await this.prisma.product.count().catch((err) => {
      throw new HttpException(
        'error in count number of products',
        HttpStatus.BAD_REQUEST,
      );
    });
    const products = await this.prisma.product.findMany({
      skip,
      take: pageSize,
    });
    if (products.length === 0) {
      throw new HttpException('there is no products', HttpStatus.BAD_REQUEST);
    }
    return { message: 'products found successfully', products, count };
  }
  async searchProduct(searchProductDto: SearchProductDto) {
    const products = await this.prisma.product.findMany({
      where: searchProductDto,
    });
    if (products.length === 0) {
      throw new HttpException('there is no products', HttpStatus.BAD_REQUEST);
    }
    return { message: 'products found successfully', products };
  }
}
