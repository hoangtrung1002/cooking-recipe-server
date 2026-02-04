import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Recipe } from './recipe.model';

@Table
export class Category extends Model<Category> {
  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  name: string;

  @HasMany(() => Recipe)
  recipes: Recipe[];
}
