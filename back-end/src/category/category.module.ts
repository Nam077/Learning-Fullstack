import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Image])],
    controllers: [CategoryController],
    providers: [CategoryService, ImageService],
})
export class CategoryModule {}
