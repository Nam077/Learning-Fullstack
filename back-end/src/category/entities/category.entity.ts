import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Image } from '../../image/entities/image.entity';
@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    @JoinColumn({ name: 'categoryId' })
    products: Product[];
    @ManyToMany(() => Image, (image) => image.categories)
    @JoinTable({
        name: 'category_images',
        joinColumn: {
            name: 'categoryId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'imageId',
            referencedColumnName: 'id',
        },
    })
    images: Image[];
}
