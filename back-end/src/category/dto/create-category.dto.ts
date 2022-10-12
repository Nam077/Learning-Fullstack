import { ApiProperty } from '@nestjs/swagger';

function randomName() {
    const names = [
        'Fruits',
        'Vegetables',
        'Meat',
        'Fish',
        'Dairy',
        'Bakery',
        'Drinks',
        'Snacks',
        'Sweets',
        'Canned',
        'Frozen',
        'Other',
    ];
    return names[Math.floor(Math.random() * names.length)];
}

export class CreateCategoryDto {
    @ApiProperty({ example: randomName(), description: 'Category name' })
    name: string;

    @ApiProperty({
        example: [1, 2, 3],
        description: 'Category images',
    })
    images: number[];
}
