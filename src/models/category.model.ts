import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Recipe } from './recipe.model';

@Table
export class Category extends Model<Category> {
  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  name: string;

  @Column({ allowNull: true, type: DataType.STRING })
  description: string;

  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  slug: string;

  @Column({ defaultValue: true, type: DataType.BOOLEAN })
  isActive: boolean;

  @HasMany(() => Recipe)
  recipes: Recipe[];
}
