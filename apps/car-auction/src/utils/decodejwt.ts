import * as jwt from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'


export const decodeJWT = (token) => {
    try{
    return jwt.verify(token,process.env.jwtKey)
    }
    catch(e){
        return 'NOT LOGGED IN'
    }
}

export const decodeJWTMiddleware = (req:Request,res:Response,next:NextFunction) => {
    try{
    req.user = jwt.verify(req.cookies['Auth'],process.env.jwtKey)
    next()
    }
    catch(e){
        return 'NOT LOGGED IN'
    }
}