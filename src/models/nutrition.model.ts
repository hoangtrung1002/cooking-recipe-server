import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';

@Table({ indexes: [{ unique: true, fields: ['recipeId'] }] })
export class Nutrition extends Model<Nutrition> {
  @Column({ allowNull: true, type: DataType.INTEGER })
  caloriesPerServing: number;

  @Column({ allowNull: true, type: DataType.FLOAT })
  proteinPerServing: number;

  @Column({ allowNull: true, type: DataType.FLOAT })
  fatPerServing: number;

  @Column({ allowNull: true, type: DataType.FLOAT })
  carbPerServing: number;

  @ForeignKey(() => Recipe)
  @Column({ allowNull: false, type: DataType.INTEGER })
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;
}
