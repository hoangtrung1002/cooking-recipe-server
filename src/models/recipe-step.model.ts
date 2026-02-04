import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';

@Table
export class RecipeStep extends Model<RecipeStep> {
  @Column({ allowNull: false, unique: true, type: DataType.INTEGER })
  stepNumber: number;

  @Column({ allowNull: false, type: DataType.STRING })
  instruction: string;

  @ForeignKey(() => Recipe)
  @Column({ allowNull: false, type: DataType.INTEGER })
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;
}
