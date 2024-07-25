import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCreateDTO } from '../infrastructure/dto/product-create.dto';
import { ProductUpdateDTO } from '../infrastructure/dto/product-update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(product: ProductCreateDTO) {
    const createdEntityName = this.productsRepository.create(product);
    try {
      return await this.productsRepository.save(createdEntityName);
    } 
    catch (error) {
      throw new HttpException('Error creating product', HttpStatus.BAD_REQUEST);
    }
  }

  async findPaginated(page: number, perPage: number) {
    const queryBuilder = this.productsRepository.createQueryBuilder();
    const paginated = queryBuilder
      .skip(perPage * page)
      .take(perPage)
      .getMany();
    const count = await this.productsRepository.count();
    return { paginated, count };
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }

  async update(product: ProductUpdateDTO) {
    try {
      return await this.productsRepository.update(product.id, product);
    } 
    catch (error) {
      throw new HttpException('Error updating product', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
