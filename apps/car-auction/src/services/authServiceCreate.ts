import * as jwt from 'jsonwebtoken'
import { checkAuth } from '../utils/auth/checkauth'
export const createToken = (username: string, password: string) => {
    if (checkAuth(username, password)) {
        return jwt.sign({ username: username, authenticated: true }, process.env.jwtKey as string, { expiresIn: 60 * 60 * 60  })
    }
    else {
        return "Not Verified";
    }
}
