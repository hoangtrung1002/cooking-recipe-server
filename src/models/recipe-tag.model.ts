import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';
import { Tag } from './tag.model';

@Table({
  indexes: [
    {
      unique: true,
      fields: ['recipeId', 'tagId'],
    },
  ],
})
export class RecipeTag extends Model<RecipeTag> {
  @ForeignKey(() => Recipe)
  @Column({ allowNull: false, type: DataType.INTEGER })
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;

  @ForeignKey(() => Tag)
  @Column({ allowNull: false, type: DataType.INTEGER })
  tagId: number;

  @BelongsTo(() => Tag)
  tag: Tag;
}
