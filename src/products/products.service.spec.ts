import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/db/prisma.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('allProducts', () => {
    it('should return products', async () => {
      const products = [
        {
          id: '653d0d874a070984cd2cdb6e',
          name: 'salt',
          description: 'asd',
          price: 21,
          quantity: 21,
          category: 'asd',
          image: '5db5342fd9e0ee93baff87cbebddebad.jpg',
        },
        {
          id: '653d0ea74c88560610034f9c',
          name: 'salt',
          description: 'asd',
          price: 21,
          quantity: 21,
          category: 'asd',
          image: 'uploads/88797161310e3467baca82c8f8a74106c2.jpg',
        },
        {
          id: '653d138763fc96d34ba3ea26',
          name: 'masd',
          description: 'asd',
          price: 21,
          quantity: 21,
          category: 'asd',
          image: 'uploads/caef15ecd875b5383e5b1c298f1c1b82.jpg',
        },
      ];
      const mockProducts = {
        message: 'products found successfully',
        products,
        count: products.length,
      };

      jest.spyOn(service, 'allProducts').mockResolvedValue(mockProducts);

      const result = await controller.allProducts('1', '10');

      expect(result.message).toBe('products found successfully');
      expect(result.count).toBe(products.length);
    });
  });
  describe('addProduct', () => {
    it('should add product', async () => {
      const product: any = {
        id: '653d0d874a070984cd2cdb6e',
        name: 'salt',
        description: 'asd',
        price: 21,
        quantity: 21,
        category: 'asd',
        image: null,
      };
      const mockProducts = {
        message: 'products added successfully',
        product,
      };

      jest.spyOn(service, 'addProduct').mockResolvedValue(mockProducts);

      const result = await controller.addProduct(product, undefined);

      expect(result.message).toBe('products added successfully');
      expect(result.product.id).toBe('653d0d874a070984cd2cdb6e');
    });
  });
  describe('updateProduct', () => {
    it('should update product', async () => {
      const product: any = {
        id: '653d0d874a070984cd2cdb6e',
        name: 'salt',
        description: 'asd',
        price: 21,
        quantity: 21,
        category: 'asd',
        image: null,
      };
      const mockProducts = {
        message: 'products updated successfully',
        product,
      };

      jest.spyOn(service, 'updateProduct').mockResolvedValue(mockProducts);

      const result = await controller.updateProduct(
        product,
        '653d0d874a070984cd2cdb6e',
      );

      expect(result.message).toBe('products updated successfully');
      expect(result.product.id).toBe('653d0d874a070984cd2cdb6e');
    });
  });
  describe('deleteProduct', () => {
    it('should delete product', async () => {
      const product: any = {
        id: '653d0d874a070984cd2cdb6e',
        name: 'salt',
        description: 'asd',
        price: 21,
        quantity: 21,
        category: 'asd',
        image: null,
      };
      const mockProducts = {
        message: 'products deleted successfully',
      };

      jest.spyOn(service, 'deleteProduct').mockResolvedValue(mockProducts);

      const result = await controller.deleteProduct('653d0d874a070984cd2cdb6e');

      expect(result.message).toBe('products deleted successfully');
    });
  });
  describe('searchProduct', () => {
    it('should search product', async () => {
      const products: any = {
        id: '653d0d874a070984cd2cdb6e',
        name: 'salt',
        description: 'asd',
        price: 21,
        quantity: 21,
        category: 'asd',
        image: null,
      };
      const mockProducts = {
        message: 'products found successfully',
        products,
      };

      jest.spyOn(service, 'searchProduct').mockResolvedValue(mockProducts);

      const result = await controller.searchProduct(products);

      expect(result.message).toBe('products found successfully');
    });
  });
  describe('getProduct', () => {
    it('should get product', async () => {
      const product: any = {
        id: '653d0d874a070984cd2cdb6e',
        name: 'salt',
        description: 'asd',
        price: 21,
        quantity: 21,
        category: 'asd',
        image: null,
      };
      const mockProducts = {
        message: 'products found successfully',
        product,
      };

      jest.spyOn(service, 'getProduct').mockResolvedValue(mockProducts);

      const result = await controller.getProduct('653d0d874a070984cd2cdb6e');

      expect(result.message).toBe('products found successfully');
      expect(result.product.id).toBe(product.id);
    });
  });
});
