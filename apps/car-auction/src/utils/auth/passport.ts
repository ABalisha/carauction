// import { user } from '../../models/user'
// import * as  passport from 'passport'
// import { Strategy } from 'passport-google-oauth2'
// import { createToken } from '../../services/authServiceCreate'
// import { LoginController } from '../../controller/loginController'
// export { LoginController } from '../../controller/loginController'
// type profileType = {
//     id: number,
//     displayName: string,
//     email: string
// }
// passport.use(new Strategy({
//     clientID: process.env.googleId as string,
//     clientSecret: process.env.clientSecret as string,
//     callbackURL: "http://localhost:8080/google/callback",
// },
//     async (accessToken: string, refreshToken: string, profile: profileType, done) => {
//         try {
//             const ID = profile.id
//             // IF a user with this google id exists in DB
//             const userS = await user.findOne(
//                 {
//                     where:
//                         { GoogleID: ID }

//                 })
//             // IF it does not exist
//             if (userS == null || !userS) {
//                 const userInformation = await user.create({
//                     GoogleID: profile.id,
//                     user: profile.email.split('@')[0],
//                     password: null,
//                     email: profile.email
//                 })
//                 //
//                return done(null,userInformation)
//                 // const token = createToken(userInformation.user, null)
//             }
//             return done(null,userS)
//             // return done(null, userS);
//             // if the GoogleID exists // 
//         }
//         catch (e) {
//             console.log(e)
//         }
//     }))

// passport.serializeUser((user, done) => {
//     done(null, user)
// })

// passport.deserializeUser((user, done) => {
//     done(null, user)
// })