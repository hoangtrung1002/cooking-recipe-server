import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { RecipeTag } from './recipe-tag.model';
import { Recipe } from './recipe.model';

@Table
export class Tag extends Model<Tag> {
  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  name: string;

  @BelongsToMany(() => Recipe, () => RecipeTag)
  recipes: Recipe[];
}
