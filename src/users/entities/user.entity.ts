import { EntityID } from '@common/types';
import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';

export interface UserAttributes {
  id: EntityID;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

@Table({
  tableName: 'users',
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  public id!: EntityID;

  @Column(DataTypes.STRING(100))
  public name?: string;

  @Column(DataTypes.STRING(100))
  public surname?: string;

  @Unique
  @Column(DataTypes.STRING(256))
  public email?: string;

  @Unique
  @Column(DataTypes.STRING(50))
  public phone?: string;

  @Column(DataTypes.STRING(100))
  public password!: string;

  @CreatedAt
  public createdAt?: Date;

  @UpdatedAt
  public updatedAt?: Date;
}
