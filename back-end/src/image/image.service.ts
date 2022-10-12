import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private imagesRepository: Repository<Image>,
    ) {}

    create(createImageDto: CreateImageDto) {
        return 'This action adds a new image';
    }

    findAll() {
        return `This action returns all image`;
    }

    findOne(id: number) {
        return `This action returns a #${id} image`;
    }

    update(id: number, updateImageDto: UpdateImageDto) {
        return `This action updates a #${id} image`;
    }

    remove(id: number) {
        return `This action removes a #${id} image`;
    }

    //kiểm tra xem có tồn tại ảnh không
    async getDataExist(ids: number[]): Promise<Image[]> {
        return await this.imagesRepository.findByIds(ids);
    }
}
