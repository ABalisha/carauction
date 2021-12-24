import * as querystring from "querystring";
import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import { createToken } from "../services/authServiceCreate";
import { checkGoogle } from '../utils/auth/google/checkGoogleID'
import { registerUser } from '../services/userService'
import { getTokens } from '../utils/auth/google/getGoogleToken'
const server_root_url = 'http://localhost:8080'
const googlie_client_secret = process.env.clientSecret as string
const google_client_ID = process.env.googleId as string
const redirectURI = 'google/callback'
export const getGoogleAuthURL = () => {
  const rootURL = 'https://accounts.google.com/o/oauth2/auth';
  const options = {
    redirect_uri: `${server_root_url}/${redirectURI}`,
    client_id: google_client_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email",
    ].join(" ")
  }
  return `${rootURL}?${querystring.stringify(options)}`
}
export const callBackUrl = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies['Auth']) {
    const code = req.query.code as string
    const { id_token, access_token } = await getTokens({
      code,
      clientId: google_client_ID,
      clientSecret: googlie_client_secret,
      redirect_Uri: `${server_root_url}/${redirectURI}`
    })
    console.log("Get Request")
    console.log(access_token)
    console.log(id_token)
    const googleUser = await axios.
      get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: { Authorization: `Bearer ${id_token}` }
        })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user`); throw new Error(error.message);
      })
    console.log(googleUser)
    const extractUserFromEmail = googleUser.email.split('@')[0]
    if (await checkGoogle(googleUser.id)) {
      const token = createToken(extractUserFromEmail, null)
      res.cookie('Auth', token)
      console.log("passed the check user exists")
      next();
    }
    else {
      registerUser(extractUserFromEmail, null, googleUser.email, googleUser.id)
      const token = createToken(extractUserFromEmail, null)
      res.cookie('Auth', token)
      next();
    }
  }
  else {
    res.redirect('/authenticated')
  }
}