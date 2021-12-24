import { sequelize } from '../Database/sequelize'
import pkg from 'sequelize'
import { user } from './user'
const { DataTypes, Model } = pkg
export type ImageType = {

}
export class Image extends Model implements ImageType {
    id: number
    name: string
    base64Encoding: string
    imageExt: string
}

Image.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    base64Encoding: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageExt: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { sequelize, modelName: 'Image' })
