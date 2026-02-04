import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Ingredient } from './ingredient.model';
import { Recipe } from './recipe.model';

export enum IngredientUnit {
  G = 'g',
  KG = 'kg',
  ML = 'ml',
  L = 'l',
  TSP = 'tsp',
  TBSP = 'tbsp',
  CUP = 'cup',
  PCS = 'pcs',
}

@Table({
  indexes: [
    {
      unique: true,
      fields: ['recipeId', 'ingredientId'],
    },
  ],
})
export class RecipeIngredient extends Model<RecipeIngredient> {
  @Column({ allowNull: true, type: DataType.STRING })
  quantity: string;

  @Column({
    allowNull: true,
    type: DataType.ENUM(...Object.values(IngredientUnit)),
  })
  unit: string;

  @ForeignKey(() => Recipe)
  @Column({ allowNull: false, type: DataType.INTEGER })
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;

  @ForeignKey(() => Ingredient)
  @Column({ allowNull: false, type: DataType.INTEGER })
  ingredientId: number;

  @BelongsTo(() => Ingredient)
  ingredient: Ingredient;
}
