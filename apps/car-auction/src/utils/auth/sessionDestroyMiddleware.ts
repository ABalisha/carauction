import { Request, Response, NextFunction } from 'express'
import { statusCodes } from '../../data/statuscode'
export const sessionDestroy = (req: Request, res: Response, next: NextFunction) => {
    res.cookie('Auth', ' ')
    res.cookie('AuthG', ' ')
    res.cookie('Auth', { expires: new Date(Date.now()) })
    res.cookie('AuthG', { expires: new Date(Date.now()) })
    res.clearCookie('Auth')
    res.clearCookie('AuthG')

    next();
}