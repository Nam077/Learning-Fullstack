import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Product name', description: 'Product name' })
    name: string;

    @ApiProperty({ example: 'Category id', description: 'Category id' })
    categoryId: number;
}
