import * as cookieParser from 'cookie-parser'
import * as express from 'express';
import { statusCodes } from './data/statuscode';
import userRoutes from './routes/userRoutes';
import * as dotenv from 'dotenv'
import * as passport from 'passport'
import './utils/auth/passport'
import { LoginController } from './controller/loginController';
import { verifyAuth } from './utils/auth/verifyAuth';
import { fileController } from './controller/uploadController'
// import * as fileUpload from 'express-fileupload'
import * as morgan from 'morgan'
import { sessionDestroy } from './utils/auth/sessionDestroyMiddleware';
import  {register}  from './controller/userController'
import { user } from './models/user'
import './models/associations'
import { saveLocalBase64 } from './services/base64service'
import { getGoogleAuthURL, callBackUrl } from './controller/googleAuthController'
import * as jwt from 'jsonwebtoken';
import { decodeJWT,decodeJWTMiddleware } from './utils/decodejwt';
const app = express();
dotenv.config()
// Middleware Application Setup 
app.use('/public', express.static(`${__dirname}/assets`)); // Turn this folder into static
app.use(express.urlencoded({ extended: true })) // Receive Request from forms
app.use(cookieParser())
app.use(passport.initialize());
app.use(express.json())
app.use('/user', userRoutes);
app.post('/upload', fileController)
app.use(morgan('combined'))
/// MULTER CONFIGURATION
/// Requests 
app.get('/auth/google/url', (req, res) => {
  res.send(getGoogleAuthURL())
})
app.get('/google/callback', callBackUrl, (req, res) => {
  res.send('successfully authenticated with google')
})
app.get('/authPath', verifyAuth, (req, res) => {
  res.send(`You have been Successfully Authenticated as  `)
})
app.get('/destroySession', sessionDestroy, (req, res) => {
  res.send('session has been successfully destroyed.')
  console.log('session has been successfully destroyed.')
})
app.get('/currentUser',decodeJWTMiddleware, (req, res) => {
  res.send(req.user)
})
app.post('/registerUser', register);
app.get('/getUserImages', async (req, res) => {
  const token: any = decodeJWT(req.cookies['Auth'])
  const currentUser = await user.findOne({
    where: {
      user: token.username
    }
  })
  res.send(await currentUser.getImages())
})

app.post('/imageSend', async (req, res) => {
  const instance1 = new saveLocalBase64(req.body.base64)
  const cookies = req.cookies['Auth']
  instance1.saveFile(cookies);
})
export const SERVER = () => {
  const server = app.listen(process.env.port, () => {
    console.log(`Listening at http://localhost:${process.env.port}/api`);
  });
  server.on('error', console.error);
}

