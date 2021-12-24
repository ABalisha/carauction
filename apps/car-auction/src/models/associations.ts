import { sequelize } from '../Database/sequelize'
import { user } from './user'
import { Image } from './file'

const associations = () => {
    user.hasMany(Image)
    sequelize.sync({ force: true })
}
export default associations()