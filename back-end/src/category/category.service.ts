import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { ImageService } from '../image/image.service';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        @Inject(forwardRef(() => ImageService))
        private imageService: ImageService,
    ) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        if (await this.checkUniqueName(createCategoryDto.name)) {
            const category = new Category();
            category.name = createCategoryDto.name;
            if (createCategoryDto.images) {
                const images = await this.imageService.getDataExist(createCategoryDto.images);
                category.images = images;
            }
            return await this.categoriesRepository.save(category);
        } else {
            throw new HttpException('Category name already exists', HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<Category[]> {
        return await this.categoriesRepository.find({
            relations: {
                images: true,
                products: true,
            },
            order: {
                id: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<Category> {
        return await this.categoriesRepository.findOneBy({ id: id });
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.findOne(id);
        if (category) {
            console.log(await this.checkUniqueName(updateCategoryDto.name), category.name !== updateCategoryDto.name);
            if (!(await this.checkUniqueName(updateCategoryDto.name)) && category.name !== updateCategoryDto.name) {
                throw new HttpException('Category name already exists', HttpStatus.BAD_REQUEST);
            } else {
                category.name = updateCategoryDto.name;
                if (updateCategoryDto.images) {
                    const images = await this.imageService.getDataExist(updateCategoryDto.images);
                    category.images = images;
                }
                return await this.categoriesRepository.save(category);
            }
        } else {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: number): Promise<Category> {
        const category = await this.findOne(id);
        if (category) {
            return await this.categoriesRepository.remove(category);
        } else {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
    }

    async checkUniqueName(name: string): Promise<boolean> {
        const category = await this.categoriesRepository.findOneBy({ name: name });
        if (category) {
            return false;
        }
        return true;
    }
}
