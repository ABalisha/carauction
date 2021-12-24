import { user } from "../../models/user"
import bcrypt from 'bcrypt'
export const checkAuth = async (username: string, password: string): Promise<boolean> => {
    try {
        if (password) {
            const user1 = await user.findOne({
                where: {
                    user: username
                }
            })
            if (user1) {
                const check = bcrypt.compare(password, user1.password)
                if (check) {
                    return true
                }
                return false
            }
            return false;
        }
        else {
            console.log("Login By Google")
            return true;
        }
    }
    catch (e) {
        return e
    }
}
