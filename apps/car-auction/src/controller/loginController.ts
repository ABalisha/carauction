import { NextFunction, Request, Response } from 'express'
import { statusCodes } from '../data/statuscode'
import { createToken } from '../services/authServiceCreate'
export const LoginController = (req: Request, res: Response, next: NextFunction) => {
    console.log('i was at login controller middleware')
    try {
        if (req.body.password) {
            const token = createToken(req.body.Username, req.body.Password)
            res.cookie('Auth', token)
            next();
        }
        else {
            // do nothing 
            res.send('Password Not Specified').end()
        }
    }
    catch (e) {
        res.status(statusCodes.Forbidden.status).json({ message: statusCodes.Forbidden.message })
    }
}