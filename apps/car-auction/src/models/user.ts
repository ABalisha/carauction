import { DataTypes, Model, Optional, BelongsToManyCountAssociationsMixin, BelongsToManyAddAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToCreateAssociationMixin, BelongsToManyCreateAssociationMixin, HasManyCountAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationsMixin, HasManyGetAssociationsMixin, HasMany, HasManyCreateAssociationMixin } from 'sequelize';
import { sequelize } from '../Database/sequelize';
import { Image } from './file'
export interface userType1 {
  id: number;
  GoogleID: string;
  user: string;
  password: string;
  email: string;
}
type UserCreationAttributes = Optional<userType1, 'id'>
export class user extends Model<userType1, UserCreationAttributes> implements userType1 {
  id!: number;
  GoogleID!: string;
  user: string;
  password: string;
  email: string;
  getImages!:HasManyGetAssociationsMixin<Image> ;
  addImage!: HasManyAddAssociationMixin<Image, number>;
  countImages!:HasManyCountAssociationsMixin;
  createImage!: HasManyCreateAssociationMixin<Image>;
}
user.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    GoogleID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'User' }
);
