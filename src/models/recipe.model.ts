import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Category } from './category.model';
import { Nutrition } from './nutrition.model';
import { RecipeIngredient } from './recipe-ingredient.model';
import { RecipeStep } from './recipe-step.model';
import { Tag } from './tag.model';
import { RecipeTag } from './recipe-tag.model';
import { Ingredient } from './ingredient.model';
import { Comment } from './comment.model';

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

@Table({
  timestamps: true,
})
export class Recipe extends Model<Recipe> {
  @Column({ allowNull: false, type: DataType.STRING })
  title: string;

  @Column({ allowNull: true, type: DataType.STRING })
  description: string;

  @Column({ allowNull: true, type: DataType.STRING })
  cookingTime: string;

  @Column({
    allowNull: false,
    defaultValue: Difficulty.MEDIUM,
    type: DataType.ENUM(...Object.values(Difficulty)),
  })
  difficulty: string;

  @Column({ allowNull: true, type: DataType.STRING })
  imageUrl: string;

  @Column({ allowNull: false, defaultValue: false, type: DataType.BOOLEAN })
  isPublic: boolean;

  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Category)
  @Column({ allowNull: false, type: DataType.INTEGER })
  categoryId: number;

  @BelongsTo(() => Category)
  category: User;

  @HasOne(() => Nutrition)
  nutrition: Nutrition;

  @BelongsToMany(() => Ingredient, () => RecipeIngredient)
  ingredients: Ingredient[];

  @HasMany(() => RecipeStep)
  steps: RecipeStep[];

  @BelongsToMany(() => Tag, () => RecipeTag)
  tags: Tag[];

  @HasMany(() => Comment)
  comments: Comment[];
}
