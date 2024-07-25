import { Controller, Get, Body, Patch, Param, UseGuards, Post, Delete, Request } from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { ProductService } from '../../services/product.service';
import { ProductCreateDTO } from '../dto/product-create.dto';
import { ProductUpdateDTO } from '../dto/product-update.dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Post('')
    async create(@Body() product: ProductCreateDTO) {
        console.log(product)
        return await this.productService.create(product)
    }

    @Post('paginated')
    async paginatedUser(@Body() product: any) {
        return await this.productService.findPaginated(product.currentPage, product.itemsPerPage);
    }

    @Get('find-all')
    findAllMapper() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Patch('')
    update(@Body() product: ProductUpdateDTO) {
        return this.productService.update(product);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.productService.remove(id);
    }

}
