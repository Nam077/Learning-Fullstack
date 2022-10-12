import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        if (await this.checkUniqueName(createProductDto.name)) {
            console.log(createProductDto);
            return await this.productsRepository.save(createProductDto);
        }
        throw new HttpException('Product name already exists', HttpStatus.BAD_REQUEST);
    }

    async findAll(): Promise<Product[]> {
        const products: Product[] = await this.productsRepository.find({
            relations: {
                category: {
                    images: true,
                },
            },
        });
        return products;
    }

    async findOne(id: number): Promise<Product> {
        return await this.productsRepository.findOneBy({ id: id });
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        if (product) {
            if ((await this.checkUniqueName(updateProductDto.name)) && product.name !== updateProductDto.name) {
                this.productsRepository.merge(product, updateProductDto);
                return await this.productsRepository.save(product);
            } else {
                throw new HttpException('Product name already exists', HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: number): Promise<Product> {
        const product = await this.findOne(id);
        if (product) {
            return await this.productsRepository.remove(product);
        } else {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
    }

    async checkUniqueName(name: string): Promise<boolean> {
        const product = await this.productsRepository.findOneBy({ name: name });
        if (product) {
            return false;
        }
        return true;
    }
}
