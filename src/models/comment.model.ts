import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Recipe } from './recipe.model';
import { User } from './user.model';

@Table({ timestamps: true })
export class Comment extends Model<Comment> {
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

  @Column({ allowNull: true, type: DataType.TEXT })
  content: string;
}
