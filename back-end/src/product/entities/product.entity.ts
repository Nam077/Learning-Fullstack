import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        comment: 'Product name',
    })
    name: string;

    @Column({
        comment: 'Category id',
    })
    categoryId: number;

    //Relationships for Category and Product entities
    @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
    category: Category;
}
