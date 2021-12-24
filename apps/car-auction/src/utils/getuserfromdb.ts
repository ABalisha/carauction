import { user } from '../models/user'
export const getUserFromToken = async (token) => {
    return await user.findOne({
        where: {
            user: token.username
        }
    })
}
