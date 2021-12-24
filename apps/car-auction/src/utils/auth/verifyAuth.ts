import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authCookie = req.cookies['Auth'] || req.cookies['AuthG']
        console.log(authCookie)
        if (authCookie) {
            const userPayload = jwt.verify(authCookie, process.env.jwtKey)
            next();
        }
        else{
            res.redirect('/login')
        }
    }
    catch (e) {
        console.log(e)
    }
}