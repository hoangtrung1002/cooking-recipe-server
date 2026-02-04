import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Favorite } from './favorite.model';

export enum UserRoles {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

@Table
export class User extends Model<User> {
  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @Column({ allowNull: true, type: DataType.STRING })
  avatarId: string;

  @Column({ allowNull: true, type: DataType.STRING })
  avatarUrl: string;

  @Column({
    allowNull: false,
    defaultValue: UserRoles.USER,
    type: DataType.ENUM(...Object.values(UserRoles)),
  })
  role: string;

  @HasMany(() => Favorite)
  favorites: Favorite[];
}
