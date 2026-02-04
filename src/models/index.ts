import { User } from './user.model';
import { Category } from './category.model';
import { Recipe } from './recipe.model';
import { Ingredient } from './ingredient.model';
import { RecipeIngredient } from './recipe-ingredient.model';
import { Nutrition } from './nutrition.model';
import { Tag } from './tag.model';
import { RecipeTag } from './recipe-tag.model';
import { RecipeStep } from './recipe-step.model';
import { Comment } from './comment.model';
import { Favorite } from './favorite.model';

const models = [
  User,
  Category,
  Recipe,
  Ingredient,
  RecipeIngredient,
  Nutrition,
  Tag,
  RecipeTag,
  RecipeStep,
  Comment,
  Favorite,
];

export {
  User,
  Category,
  Recipe,
  Ingredient,
  RecipeIngredient,
  Nutrition,
  Tag,
  RecipeTag,
  RecipeStep,
  Comment,
  Favorite,
};

export default models;
