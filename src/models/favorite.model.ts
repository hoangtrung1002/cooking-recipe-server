import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';
import { User } from './user.model';

@Table({
  indexes: [
    {
      unique: true,
      fields: ['userId', 'recipeId'],
    },
  ],
})
export class Favorite extends Model<Favorite> {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Recipe)
  @Column({ allowNull: false, type: DataType.INTEGER })
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;
}
