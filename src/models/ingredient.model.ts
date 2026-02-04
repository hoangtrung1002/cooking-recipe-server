import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { RecipeIngredient } from './recipe-ingredient.model';
import { Recipe } from './recipe.model';

@Table
export class Ingredient extends Model<Ingredient> {
  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  name: string;

  @BelongsToMany(() => Recipe, () => RecipeIngredient)
  recipes: Recipe[];
}
