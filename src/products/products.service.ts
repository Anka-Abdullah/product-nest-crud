import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getAllProducts() {
    const products = await this.productRepository.find();
    return products;
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      return product;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = this.productRepository.create(product);

    await this.productRepository.save(newProduct);

    return newProduct;
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    await this.productRepository.update(id, product);

    const UpdateProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (UpdateProduct) {
      return UpdateProduct;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async deleteProduct(id: number) {
    const deleteProduct = await this.productRepository.delete(id);
    if (!deleteProduct.affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
